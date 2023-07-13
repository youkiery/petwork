import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.page.html',
  styleUrls: ['./price.page.scss'],
})
export class PricePage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'price'
      if (!this.rest.price.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('price', 'init', {}).then((resp) => {
      this.rest.defreeze()
      this.rest.price.init = true
      this.rest.price.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('price', 'init', {
      keyword: this.rest.price.keyword
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.price.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    if (this.rest.config.price < 2) this.rest.notify('Tài khoản không có quyền truy cập') 
    else {
      this.rest.temp = {
        name: '',
        unit: '',
        detail: [{
          name: '',
          price: ''
        }]
      }
      this.rest.navCtrl.navigateForward('/price/insert')
    }
  }

  public update(i: number) {
    this.rest.temp = {
      id: this.rest.price.list[i].id,
      name: this.rest.price.list[i].name,
      unit: this.rest.price.list[i].unit,
      detail: this.rest.price.list[i].detail
    }
    this.rest.navCtrl.navigateForward('/price/insert')
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      header: 'Xóa bảng giá',
      subHeader: 'Sau khi xác nhận bảng giá sẽ biến mất',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(this.rest.price.list[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('price', 'remove', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.price.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

}
