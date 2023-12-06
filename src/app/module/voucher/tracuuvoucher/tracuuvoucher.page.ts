import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracuuvoucher',
  templateUrl: './tracuuvoucher.page.html',
  styleUrls: ['./tracuuvoucher.page.scss'],
})
export class TracuuvoucherPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/voucher')
  }

}
