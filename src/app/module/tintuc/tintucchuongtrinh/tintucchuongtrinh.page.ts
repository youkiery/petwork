import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tintucchuongtrinh',
  templateUrl: './tintucchuongtrinh.page.html',
  styleUrls: ['./tintucchuongtrinh.page.scss'],
})
export class TintucchuongtrinhPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tintuc')
  }
}
