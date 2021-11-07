import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profdetail',
  templateUrl: './profdetail.page.html',
  styleUrls: ['./profdetail.page.scss'],
})
export class ProfdetailPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('profile')
    })
  }

}
