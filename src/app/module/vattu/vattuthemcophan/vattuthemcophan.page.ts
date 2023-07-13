import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattuthemcophan',
  templateUrl: './vattuthemcophan.page.html',
  styleUrls: ['./vattuthemcophan.page.scss'],
})
export class VattuthemcophanPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
  }

  public tinhgiatri() {
    let tile = 0
    this.rest.temp.giaodich.forEach(giaodich => {
      tile += Number(giaodich.tile)
    })
    return this.rest.comma(Math.floor(Number(this.rest.vattu.tongtien) * tile / 100).toString())
  }

  public nhaptien(bien: string, thutu: number) {
    let tam = Number(this.rest.temp.giaodich[thutu][bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp.giaodich[thutu][bien] = this.rest.comma(tam)
  }

  public nhaptile(bien: string, thutu: number) {
    let tam = this.rest.temp.giaodich[thutu][bien]
    if (!tam.length) tam = '0'
    if (Number(tam) > 100) tam = '100'
    if (Number(tam) < 0 || Number.isNaN(Number(tam))) tam = '0'
    this.rest.temp.giaodich[thutu][bien] = tam
  }

  public themgiaodich() {
    this.rest.temp.giaodich.push({
      id: 0,
      tile: '0',
      giatri: '0',
      ghichu: '',
    })
  }

  public xoagiaodich(thutu: number) {
    this.rest.temp.giaodich = this.rest.temp.giaodich.filter((giaodich: any, thutuchay: number) => {
      return thutu !== thutuchay
    })
    if (!this.rest.temp.giaodich.length) this.themgiaodich()
  }

  public async them() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'themcophan', {
      dulieu: this.rest.temp,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.cophan = resp.cophan
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
