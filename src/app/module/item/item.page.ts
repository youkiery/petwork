import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
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
    this.rest.checkpost('item', 'init', {
      keyword: this.rest.data.item.keyword
    }).then(resp => {
      this.rest.data.item.init = 1
      this.rest.data.item.purchase = resp.purchase
      this.rest.data.item.transfer = resp.transfer
      this.rest.data.item.expired = resp.expired
      this.rest.data.item.list = resp.list
      this.rest.data.item.all = resp.all
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item', 'filter', {
      keyword: this.rest.data.item.keyword
    }).then(resp => {
      this.rest.data.item.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public purchase() {
    this.rest.temp = {
      action: 'purchase',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public transfer() {
    this.rest.temp = {
      action: 'transfer',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public expired() {
    this.rest.temp = {
      action: 'expired',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public insertItem() {
    this.rest.temp = {
      action: 'item',
      id: 0,
      name: '',
      code: '',
      border: 10,
      image: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public updateItem(index: number) {
    this.rest.temp = {
      action: 'item',
      id: this.rest.data.item.list[index].id,
      name: this.rest.data.item.list[index].name,
      code: this.rest.data.item.list[index].code,
      border: this.rest.data.item.list[index].border,
      image: this.rest.data.item.list[index].image
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }

  public async removeItem(id: number) {
    const alert = await this.alert.create({
      message: 'Hàng hóa sẽ biến mất vĩnh viễn, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeItemSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeItemSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item', 'remove', {
      id: id,
      keyword: this.rest.data.item.keyword
    }).then((resp) => {
      this.rest.data.item.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertExpire() {
    this.rest.temp = {
      action: 'expire',
      name: '',
      expire: this.rest.config.today,
      Number: 1
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public position() {
    this.rest.temp = {
      action: 'position',
      keyword: '',
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
}
