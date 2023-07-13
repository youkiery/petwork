import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage {
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'hotel'
      if (!this.rest.hotel.init) {
        this.rest.hotel.filter.start = this.time.timetoisodate(this.time.datetotime(this.rest.home.today) - 60 * 60 * 24 * 5 * 1000)
        this.rest.hotel.filter.end = this.time.datetoisodate(this.rest.home.today)
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'init', {
      filter: this.rest.hotel.filter
    }).then(resp => {
      this.rest.defreeze()
      this.rest.hotel.init = true
      this.rest.hotel.cat = resp.cat
      this.rest.hotel.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(e:any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'init', {
      filter: this.rest.hotel.filter
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.rest.hotel.init = true
      this.rest.hotel.list = resp.list
    }, () => {
      this.rest.defreeze()
      e.target.complete()
    })
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      address: '',
      catid: this.rest.hotel.cat[0].id,
      health: '',
      filter: this.rest.hotel.filter,
      image: [],
      cometime: this.time.datetoisodate(this.rest.home.today),
      calltime: this.time.datetoisodate(this.rest.home.today),
    }
    this.rest.navCtrl.navigateForward('/hotel/insert')
  }

  public update(i: number) {
    var item = this.rest.hotel.list[this.rest.hotel.s][i]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      catid: item.catid,
      health: item.health,
      cometime: this.time.datetoisodate(item.cometime),
      calltime: this.time.datetoisodate(item.calltime),
      image: item.image,
      filter: this.rest.hotel.filter,
    }
    this.rest.navCtrl.navigateForward('/hotel/insert')
  }
  
  public async remove(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa lưu trú khách sạn?',
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
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'remove', {
      id: id,
      filter: this.rest.hotel.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async hopital(id: number) {
    let alert = await this.alert.create({
      message: 'Khách đưa lưu trở lại?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.hopitalSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async hopitalSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'hopital', {
      id: id,
      filter: this.rest.hotel.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.list = resp.list
      this.rest.hotel.s = '0'
    }, () => {
      this.rest.defreeze()
    })
  }

  public return(i: number) {
    var item = this.rest.hotel.list[this.rest.hotel.s][i]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      health: item.health,
      returntime: this.time.datetoisodate(this.rest.home.today),
      returnuserid: this.rest.home.userid,
      image: item.returnimage,
      filter: this.rest.hotel.filter,
    }
    this.rest.navCtrl.navigateForward('/hotel/return')
  }
}
