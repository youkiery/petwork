import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hotelconfig',
  templateUrl: './hotelconfig.page.html',
  styleUrls: ['./hotelconfig.page.scss'],
})
export class HotelconfigPage {
  public list: any[]
  public name = ''
  public price = '0'
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  async ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hotel')
    else this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
  }

  public change(i: number) {
    let temp = Number(this.list[i].price.replace(/,/g, ''))
    if (!temp) temp = 0
    this.list[i].price = this.rest.comma(temp.toString())
  }

  public changer() {
    let temp = Number(this.price.replace(/,/g, ''))
    if (!temp) temp = 0
    this.price = this.rest.comma(temp.toString())
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận xóa danh mục?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('hotel', 'removecat', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.cat = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
    }, () => {
      this.rest.defreeze()
    })
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'savecatlist', {
      list: this.list
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.cat = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insert() {
    if (!this.name.length) {
      this.rest.notify('Nhập cân nặng')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'insertcat', {
      name: this.name,
      price: this.price,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.cat = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
      this.name = ''
      this.price = '0'
    }, () => {
      this.rest.defreeze()
    })
  }
}
