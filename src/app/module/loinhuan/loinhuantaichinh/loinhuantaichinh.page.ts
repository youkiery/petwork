import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-loinhuantaichinh',
  templateUrl: './loinhuantaichinh.page.html',
  styleUrls: ['./loinhuantaichinh.page.scss'],
})
export class LoinhuantaichinhPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/loinhuan')
  }

}
