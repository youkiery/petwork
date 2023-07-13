import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-rideinsert',
  templateUrl: './rideinsert.page.html',
  styleUrls: ['./rideinsert.page.scss'],
})
export class RideinsertPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/ride')
  }

  public calcMoney() {
    let temp =  Number((this.rest.temp.clocke - this.rest.temp.clockf) * 10000).toString()
    this.rest.temp.money = this.rest.comma(temp)
  }

  public recalcMoney() {
    let temp = Number(this.rest.temp.money.replace(/,/g, '')).toString()
    if (!temp.length) temp = '0'
    this.rest.temp.money = this.rest.comma(temp)
  }

  public async insertCole() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('ride', 'cole', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
      this.rest.ride.segment = '0'
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertPay() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('ride', 'pay', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
      this.rest.ride.segment = '1'
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
