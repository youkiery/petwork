import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-accselect',
  templateUrl: './accselect.page.html',
  styleUrls: ['./accselect.page.scss'],
})
export class AccselectPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('accounting')   
  }

}
