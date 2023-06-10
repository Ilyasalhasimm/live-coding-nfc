import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nfcNumber: string = '';
  //location
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    private router : Router,
    private toastController: ToastController
  ) {}

  history() {
    this.router.navigateByUrl('history');

  }

  async ionViewDidEnter() {
    try {
      await this.getCurrentLocation();
      const nfcNumber = await this.getNfcNumber();
      this.nfcNumber = nfcNumber;
      const toast = await this.toastController.create({
        message: nfcNumber,
        duration: 2000,
      });
      toast.present();
    } catch (error:any) {
      const toast = await this.toastController.create({
        message: error.toString(),
        duration: 2000,
      });
      toast.present();
    }
  }

  onNfcEvent(event: any) {
    console.log('NFC Event:', event);
  }

  getNfcNumber(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Check if NFC is supported
      if ('nfc' in window) {
        const nfcInstance = (window as any).nfc;

        // Add an event listener to handle reading NFC data
        document.addEventListener('deviceready', () => {
          nfcInstance.addNdefListener(
            (nfcEvent: any) => {
              const ndefMessage = nfcEvent.tag.ndefMessage;
              if (ndefMessage && ndefMessage.length > 0) {
                // Assuming the NFC tag contains only one record
                const record = ndefMessage[0];
                const nfcNumber = this.bytesToString(record.payload);
                resolve(nfcNumber);
              } else {
                reject('No NFC data found');
              }
            },
            () => {
              reject('Error adding NFC listener');
            }
          );
        });
      } else {
        reject('NFC not supported on this device');
      }
    });
  }


  bytesToString(bytes: Uint8Array): string {
    let result = '';
    bytes.forEach((byte) => {
      result += String.fromCharCode(byte);
    });
    return result;
  }
  sendEmail() {
    const { Device } = Plugins;

    (Device as any)['getInfo']().then((info: any) => {
      if (info.platform === 'web') {
        // Handle web platform
        window.location.href =
          'mailto:recipient@example.com?subject=Email Subject&body=Hello, this is the email body.';
      } else {
        // Handle other platforms
        const emailUrl =
          'mailto:recipient@example.com?subject=Email Subject&body=Hello, this is the email body.';
        window.open(emailUrl, '_system');
      }
    });
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    } catch (error) {}
  }

}
