import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  datas:any[] = []

  constructor() { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('data') as string)
    this.datas = data
    console.log(this.datas)
  }

}