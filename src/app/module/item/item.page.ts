import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public async ionViewWillEnter() {
    this.rest.action = 'item'
    this.rest.ready().then(() => {
      if (!this.rest.data.item.init) {
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item', 'init', {}).then(resp => {
      this.rest.data.item.init = 1
      this.rest.data.item.purchase = resp.purchase
      this.rest.data.item.transfer = resp.transfer
      this.rest.data.item.expired = resp.expired
      this.rest.data.item.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public purchase() {
    this.rest.temp = {
      action: 'purchase'
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public transfer() {}
  public expired() {}
  public insertItem() {}
  public insertExpire() {}
  public position() {}
}
