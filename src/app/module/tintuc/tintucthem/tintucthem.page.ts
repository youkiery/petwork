import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tintucthem',
  templateUrl: './tintucthem.page.html',
  styleUrls: ['./tintucthem.page.scss'],
})
export class TintucthemPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tintuc')
  }
}
