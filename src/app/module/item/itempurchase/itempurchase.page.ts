import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itempurchase',
  templateUrl: './itempurchase.page.html',
  styleUrls: ['./itempurchase.page.scss'],
})
export class ItempurchasePage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('item')
    else this.initiaze()
  }

  public async initiaze() {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item', 'purchase', { }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async purchased() {
    await this.rest.freeze('Đang thay đổi trạng thái')
    let list = []
    this.rest.item.purchase.forEach(item => {
      if (item.checked) list.push(item.id)
    })
    if (!list.length) this.rest.notify('Chọn ít nhất 1 loại hàng')
    else this.rest.checkpost('item', 'purchased', {
      list: list
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

}
