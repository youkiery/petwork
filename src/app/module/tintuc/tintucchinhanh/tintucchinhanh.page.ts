import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tintucchinhanh',
  templateUrl: './tintucchinhanh.page.html',
  styleUrls: ['./tintucchinhanh.page.scss'],
})
export class TintucchinhanhPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit(
  ) {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tintuc')
  }
}
