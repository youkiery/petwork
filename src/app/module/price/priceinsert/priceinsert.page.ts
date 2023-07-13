import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-priceinsert',
  templateUrl: './priceinsert.page.html',
  styleUrls: ['./priceinsert.page.scss'],
})
export class PriceinsertPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/price')
  }

  public change(index: number) {
    let temp = this.rest.temp.detail[index].price.replace(/,/g, '')
    this.rest.temp.detail[index].price = this.rest.comma(temp)
  }

  public async insert() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('price', 'insert', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.price.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('price', 'update', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.price.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public remove(i: number) {
    this.rest.temp.detail = this.rest.temp.detail.filter((item: any, index: number) => {
      return index !== i
    })
    if (!this.rest.temp.detail.length) this.add()
  }

  public add() {
    this.rest.temp.detail.push({
      name: '',
      price: ''
    })
  }
}
