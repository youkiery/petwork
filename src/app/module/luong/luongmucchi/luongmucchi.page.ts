import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luongmucchi',
  templateUrl: './luongmucchi.page.html',
  styleUrls: ['./luongmucchi.page.scss'],
})
export class LuongmucchiPage {

  constructor(
    public rest: RestService
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'mucchi', { }).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.mucchi = phanhoi.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luumucchi() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'luumucchi', {
      danhsach: this.rest.luong.mucchi
    }).then((phanhoi) => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public themthuchi() {
    this.rest.luong.mucchi.push({
      id: 0,
      loaichi: '',
      tienchi: 0
    })
  }

  public xoathuchi(i: number) {
    this.rest.luong.mucchi = this.rest.luong.mucchi.filter((thuchi, thutu) => {
      return i != thutu
    })
  }

  public nhaptien(i: number) {
    let tam = Number(this.rest.luong.mucchi[i].tienchi.toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.luong.mucchi[i].tienchi = this.rest.comma(tam)
  }
}
