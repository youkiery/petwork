import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-adminplace',
  templateUrl: './adminplace.page.html',
  styleUrls: ['./adminplace.page.scss'],
})
export class AdminplacePage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/admin')
    else if (!this.rest.place.init) this.init()
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'placeinit', {}).then(resp => {
      this.rest.defreeze()
      this.rest.place.init = true
      this.rest.place.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(placeid: number) {
    let alert = await this.alert.create({
      message: 'Xóa phòng khám?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.removeSubmit(placeid)
          }
        }
      ]
    })
    alert.present()
  }

  public async removeSubmit(placeid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'placeremove', {
      placeid: placeid,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.place.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }


  public async insert() {
    let alert = await this.alert.create({
      message: 'Nhập tên phòng khám',
      inputs: [{
        name: 'place',
        type: 'text',
        value: ''
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.insertSubmit(e.place)
          }
        }
      ]
    })
    alert.present()
  }


  public async insertSubmit(name: string) {
    if (!name.length) {
      this.rest.notify('Xin hãy nhập tên phòng khám')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'placeinsert', {
      userid: this.rest.id,
      name: name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.place.list = resp.placelist
      this.rest.admin.list = resp.adminlist
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }


  public async update(placeid: number, name: string) {
    let alert = await this.alert.create({
      message: 'Nhập tên phòng khám mới',
      inputs: [{
        name: 'place',
        type: 'text',
        value: name
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updateSubmit(placeid, e.place)
          }
        }
      ]
    })
    alert.present()
  }

  public async updateSubmit(placeid: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'placeupdate', {
      userid: this.rest.id,
      placeid: placeid,
      name: name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.place.list = resp.placelist
      this.rest.admin.list = resp.adminlist
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async placeselect(placeid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'placeselect', {
      userid: this.rest.id,
      placeid: placeid,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.list = resp.adminlist
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
