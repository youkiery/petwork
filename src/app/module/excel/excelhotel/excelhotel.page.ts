import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelhotel',
  templateUrl: './excelhotel.page.html',
  styleUrls: ['./excelhotel.page.scss'],
})
export class ExcelhotelPage {
  public list: any[]
  constructor(
    public rest: RestService,
  ) { }


  async ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else if (!this.rest.hotel.catinit) await this.init()
    else this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'catlist', {}).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.cat = resp.list
      this.rest.hotel.catinit = true
      this.list = JSON.parse(JSON.stringify(this.rest.hotel.cat))
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(i: number) {
    let temp = Number(this.list[i].price.replace(/,/g, ''))
    if (!temp) temp = 0
    this.list[i].price = this.rest.comma(temp.toString())
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('hotel', 'savecatlist', {
      list: this.list
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hotel.cat = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.list.push({
      name: '',
      price: 0
    })
  }
}
