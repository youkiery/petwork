import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luongchitiet',
  templateUrl: './luongchitiet.page.html',
  styleUrls: ['./luongchitiet.page.scss'],
})
export class LuongchitietPage {

  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }
}
