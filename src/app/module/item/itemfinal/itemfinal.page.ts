import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemfinal',
  templateUrl: './itemfinal.page.html',
  styleUrls: ['./itemfinal.page.scss'],
})
export class ItemfinalPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  }

  public done() {
    this.rest.item.toggle = false
    this.rest.item.list.forEach((item, index) => {
      this.rest.item.list[index].checked = false
    })
    this.rest.navCtrl.navigateBack('/item')
  }
}
