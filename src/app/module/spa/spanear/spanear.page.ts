import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spanear',
  templateUrl: './spanear.page.html',
  styleUrls: ['./spanear.page.scss'],
})
export class SpanearPage {
  public list = []
  public status = {
    0: 'stl-card yellow',
    1: 'stl-card blue'
  }
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa')   
    // else this.init()
  }
  
  public async doingay() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'doingay', {
      id: this.rest.temp.id,
      thoigian: this.rest.temp.thoigian,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.datlichhomnay = resp.datlichhomnay
      this.rest.spa.list = resp.list
      this.search()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public search() {
    let rev = [
      ['0', '1', '2', '3'],
      ['0', '1', '2'],
      ['3']
    ]
    this.rest.spa.filter = this.rest.spa.list.filter((item, index) => {
      let key = this.rest.alias(this.rest.spa.keyword)
      return (item.phone.indexOf(key) >= 0 || this.rest.alias(item.name).indexOf(key) >= 0) && (rev[this.rest.spa.search.status].indexOf(item.status) >= 0)
    })
  }

  // public async change(i: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('spa', 'nearchange', {
  //     id: this.list[i].id,
  //     status: this.list[i].status
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.list = resp.list
  //     this.rest.spa.count = resp.count
  //   }, () => { 
  //     this.rest.defreeze()
  //   })
  // }

  // public async init() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('spa', 'near', {
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.list = resp.list
  //   }, () => { 
  //     this.rest.defreeze()
  //   })
  // }
}
