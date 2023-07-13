import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spachitietthongke',
  templateUrl: './spachitietthongke.page.html',
  styleUrls: ['./spachitietthongke.page.scss'],
})
export class SpachitietthongkePage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa')   
  }

}
