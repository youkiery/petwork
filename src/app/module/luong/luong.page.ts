import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luong',
  templateUrl: './luong.page.html',
  styleUrls: ['./luong.page.scss'],
})
export class LuongPage {
  public trangthai = ['Chưa xác nhận', 'Đã xác nhận']
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (this.rest.admindefault.indexOf(this.rest.home.userid) < 0) this.rest.root()
      else {
        this.rest.action = 'luong'
        if (!this.rest.luong.khoitao) {
          this.rest.luong.sosanh.thoigian = this.time.datetoisodate(this.rest.home.today)
          this.khoitao()
        }
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'luong', {}).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.khoitao = true
      this.rest.luong.chuy = phanhoi.chuy
      this.rest.luong.danhsach = phanhoi.danhsach
      this.rest.luong.mucchi = phanhoi.mucchi
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chitiet(thoigian: number) {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'chitiet', {
      thoigian: this.time.timetoisodate(thoigian * 1000)
    }).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.chitiet = phanhoi.chitiet
      this.rest.navCtrl.navigateForward('/luong/chitiet')
    }, () => {
      this.rest.defreeze()
    })
  }

  public mucchi() {
    this.rest.navCtrl.navigateForward('/luong/mucchi')
  }

  public async themluongthang() {
    this.rest.id = 0
    let thuchi = []
    this.rest.luong.mucchi.forEach((muchchi: any) => {
      thuchi.push(muchchi)
    })
    this.rest.luong.dulieu = {
      id: 0,
      nhanvien: [],
      thuchi: thuchi,
      ngaynghi: [],
      tongdoanhthu: 0,
      tongloinhuan: 0,
      tongchi: 0,
      tongnhanvien: 0,
      tongcodong: 0,
      thoigian: this.time.datetoisodate(this.rest.home.today)
    }
    this.rest.navCtrl.navigateForward('/luong/thang')
  }

  public async themtay() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'nhanvienthemtay', {}).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.temp = phanhoi.danhsach
      this.rest.navCtrl.navigateForward('/luong/nhaptay')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('luong', 'dulieuluong', {
      id: id,
    }).then(phanhoi => {
      this.rest.defreeze()
      this.rest.luong.dulieu = phanhoi.dulieu
      this.rest.navCtrl.navigateForward('/luong/thang')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa(i: number) {
    const alert = await this.alert.create({
      header: 'Xóa dữ liệu chốt lương',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.xacnhanxoa(this.rest.luong.danhsach[i].id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('luong', 'xoaluong', {
      id: id,
    }).then(phanhoi => {
      this.rest.defreeze()
      this.rest.luong.danhsach = phanhoi.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public sosanh() {
    this.rest.navCtrl.navigateForward('/luong/sosanh')
  }
}
