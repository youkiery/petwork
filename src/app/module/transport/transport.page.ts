import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'transport'
      if (!this.rest.transport.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('transport', 'init', {}).then(resp => {
      this.rest.defreeze()
      this.rest.transport.init = true
      this.rest.transport.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('transport', 'init', {
      keyword: this.rest.transport.keyword
    }).then(resp => {
      this.rest.defreeze()
      this.rest.transport.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      address: '',
      detail: [{name: ''}],
      keyword: this.rest.transport.keyword
    }
    this.rest.navCtrl.navigateForward('/transport/insert')
  }

  public update(i: number) {
    this.rest.temp = {
      id: this.rest.transport.list[i].id,
      name: this.rest.transport.list[i].name,
      phone: this.rest.transport.list[i].phone,
      address: this.rest.transport.list[i].address,
      detail: this.rest.transport.list[i].detail,
      keyword: this.rest.transport.keyword
    }
    this.rest.navCtrl.navigateForward('/transport/insert')
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
            this.removeSubmit(this.rest.transport.list[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('transport', 'remove', {
      id: id,
      keyword: this.rest.transport.keyword
    }).then(resp => {
      this.rest.defreeze()
      this.rest.transport.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
