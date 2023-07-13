import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'ride'
      if (!this.rest.ride.init) this.init()
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Sau khi xác nhận, phiếu sẽ mất khỏi danh sách',
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
    this.rest.checkpost('ride', 'remove', {
      id: id,
      segment: this.rest.ride.segment,
      start: this.rest.ride.start,
      end: this.rest.ride.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertPay() {
    this.rest.action = 'pay'
    this.rest.temp = {
      money: '0',
      note: '',
      start: this.rest.ride.start,
      end: this.rest.ride.end,
    }
    this.rest.navCtrl.navigateForward('/ride/insert')
  }

  public insertRide() {
    this.rest.action = 'cole'
    this.rest.temp = {
      clockf: this.rest.ride.clock,
      clocke: this.rest.ride.clock + 1,
      money: '10,000',
      destination: '',
      note: '',
      start: this.rest.ride.start,
      end: this.rest.ride.end,
    }
    this.rest.navCtrl.navigateForward('/ride/insert')
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách..')
    this.rest.checkpost('ride', 'init', {
      start: this.rest.ride.start,
      end: this.rest.ride.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách..')
    this.rest.checkpost('ride', 'init', {
      start: this.rest.home.month.start,
      end: this.rest.home.month.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.ride.init = true
      this.rest.ride.list = resp.list
      this.rest.ride.clock = Number(resp.clock)
      this.rest.ride.start = this.rest.home.month.start
      this.rest.ride.end = this.rest.home.month.end
    }, () => {
      this.rest.defreeze()
    })
  }

  public statistic() {
    this.rest.temp = {
      cole: 0,
      pay: 0,
      count: 0,
      list: []
    }
    this.rest.navCtrl.navigateForward('/ride/statis')
  }
}
