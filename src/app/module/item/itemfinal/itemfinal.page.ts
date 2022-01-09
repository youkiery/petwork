import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemfinal',
  templateUrl: './itemfinal.page.html',
  styleUrls: ['./itemfinal.page.scss'],
})
export class ItemfinalPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('item')
  }

  public done() {
    this.rest.item.toggle = false
    this.rest.navCtrl.navigateRoot('item')
  }
}
