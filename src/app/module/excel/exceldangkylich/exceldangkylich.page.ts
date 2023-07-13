import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-exceldangkylich',
  templateUrl: './exceldangkylich.page.html',
  styleUrls: ['./exceldangkylich.page.scss'],
})
export class ExceldangkylichPage {
  public dulieu = []
  public thu = ['', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  public trangthai = ['Không khóa lịch', 'Khóa lịch theo giờ']
  public khoathoigian = 0
  public thoigianmo = ''
  public thoigiandong = ''
  public huydangky = 0
  public dangkythem = 0
  constructor(
    public rest: RestService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('admin', 'cauhinhlich', { }).then((phanhoi) => {
      this.dulieu = phanhoi.dulieu
      this.khoathoigian = Number(phanhoi.khoathoigian)
      this.thoigianmo = phanhoi.thoigianmo
      this.thoigiandong = phanhoi.thoigiandong
      this.huydangky = phanhoi.huydangky
      this.dangkythem = phanhoi.dangkythem
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public thaydoikhoathoigian() {
    this.khoathoigian = Number(!this.khoathoigian)
  }

  public async thaydoichotlich(loaichot = 0) {
    await this.rest.freeze()
    this.rest.checkpost('admin', 'thaydoichotlich', {
      loaichot: loaichot
     }).then((phanhoi) => {
      this.rest.home.chotlich = phanhoi.chotlich
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luu() {
    await this.rest.freeze()
    this.rest.checkpost('admin', 'luucauhinhlich', {
      dulieu: this.dulieu
    }).then((phanhoi) => {
      this.rest.schedule.init = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luuthoigian() {
    await this.rest.freeze()
    this.rest.checkpost('admin', 'luucauhinhthoigian', {
      thoigianmo: this.thoigianmo, 
      thoigiandong: this.thoigiandong, 
      khoathoigian: this.khoathoigian
    }).then((phanhoi) => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luudangky() {
    await this.rest.freeze()
    this.rest.checkpost('admin', 'luudangky', {
      dangkythem: this.dangkythem, 
      huydangky: this.huydangky, 
    }).then((phanhoi) => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

}
