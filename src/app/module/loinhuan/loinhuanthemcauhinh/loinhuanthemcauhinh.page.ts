import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-loinhuanthemcauhinh',
  templateUrl: './loinhuanthemcauhinh.page.html',
  styleUrls: ['./loinhuanthemcauhinh.page.scss'],
})
export class LoinhuanthemcauhinhPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/loinhuan')
  }

  public nhaptien(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }

  public nhapthuong(bien: string, thutu: number) {
    let tam = Number(this.rest.temp.tilethuong[1][thutu][bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp.tilethuong[1][thutu][bien] = this.rest.comma(tam)
  }
  
  public nhaptile(bien: string) {
    let tam = this.rest.temp[bien]
    if (!tam.length) tam = '0'
    if (Number(tam) > 100) tam = '100'
    if (Number(tam) < 0 || Number.isNaN(Number(tam))) tam = '0'
    this.rest.temp[bien] = tam
  }
  
  public async xoatile(thutu: number) {
    this.rest.temp.tilethuong[1] = this.rest.temp.tilethuong[1].filter((item, index) => {
      return index !== thutu
    })
  }

  public themtile() {
    this.rest.temp.tilethuong[1].push({
      id: 0, khoang: '0', tien: '0'
    }) 
  }

  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'capnhatnhanvien', {
      userid: this.rest.temp.userid,
      luongcoban: this.rest.temp.luongcoban,
      phucap: this.rest.temp.phucap,
      lenluong: this.rest.temp.lenluong,
      tiletietkiem: this.rest.temp.tiletietkiem,
      kyhopdong: this.rest.temp.kyhopdong,
      tamnghi: Number(this.rest.temp.tamnghi),
      heluong: Number(this.rest.temp.heluong),
      tilethuong: this.rest.temp.tilethuong,
      tenkiot: this.rest.temp.tenkiot,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
