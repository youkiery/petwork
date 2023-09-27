import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xetnghiemchitiet',
  templateUrl: './xetnghiemchitiet.page.html',
  styleUrls: ['./xetnghiemchitiet.page.scss'],
})
export class XetnghiemchitietPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/xetnghiem')
  }
}
