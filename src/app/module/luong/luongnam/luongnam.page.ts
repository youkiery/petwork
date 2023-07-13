import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luongnam',
  templateUrl: './luongnam.page.html',
  styleUrls: ['./luongnam.page.scss'],
})
export class LuongnamPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }
}
