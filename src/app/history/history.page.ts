import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  formData: { name: string, nik: string, alamat: string, message: string, latitude: number, longitude: number }[] = [];

  constructor(
    private router: Router
  ) { }
  
  openMap(latitude: number, longitude: number) {
    // Open the device's GPS map application with the specified latitude and longitude
    window.open(`geo:${latitude},${longitude}`, '_system');
  }

  ionViewDidEnter() {
    this.loadFormData();
  }

  loadFormData() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.formData = JSON.parse(storedData);
    }
  }

  ngOnInit() {
    const pesanTerakhir = localStorage.getItem('pesanTerakhir');
    if (pesanTerakhir) {
      this.formData.push({ name: '', nik: '', alamat: '', message: pesanTerakhir, latitude: NaN,
      longitude: NaN});
    }
  }

  
}
