import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongnhanvien',
  templateUrl: './luongnhanvien.page.html',
  styleUrls: ['./luongnhanvien.page.scss'],
})
export class LuongnhanvienPage {
  public loplenluong = ['stl-card', 'stl-card yellow']
  public chedo = 'desktop'
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
    else if (!this.rest.luong.khoitaonhanvien) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'nhanvien', {}).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.khoitaonhanvien = true
      this.rest.luong.nhanvien = phanhoi.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public capnhat(i: number) {
    let nhanvien = this.rest.luong.nhanvien[i]
    this.rest.temp = {
      id: nhanvien.userid,
      luongcoban: nhanvien.luongcoban,
      hopdong: this.time.datetoisodate(nhanvien.hopdong),
      camket: this.time.datetoisodate(nhanvien.camket),
      cophan: nhanvien.cophan,
      tile: nhanvien.tile,
      phucap: nhanvien.phucap,
      phucap2: nhanvien.phucap2,
    }
    this.rest.navCtrl.navigateForward('/luong/themnhanvien')
  }

  public async xoa(userid: number) {
    let alert = await this.alert.create({
      message: 'Xóa nhân viên khỏi danh sách lương?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoa(userid)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoa(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('luong', 'xoanhanvien', {
      userid: userid,
    }).then(phanhoi => {
      this.rest.luong.nhanvien = phanhoi.danhsach
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  // public denhopdong(i: number) {
  //   let nhanvien = this.rest.luong.nhanvien[i]
  //   this.rest.temp = {
  //     userid: nhanvien.userid,
  //     hopdong: this.time.timetoisodate(this.time.datetotime(nhanvien.hopdong) + 365 * 24 * 60 * 60 * 1000)
  //   }
  //   this.rest.navCtrl.navigateForward('/luong/chonngay')
  // }

  // public dencamket(i: number) {
  //   let nhanvien = this.rest.luong.nhanvien[i]
  //   this.rest.temp = {
  //     userid: nhanvien.userid,
  //     camket: this.time.timetoisodate(this.time.datetotime(nhanvien.camket) + 365 * 24 * 60 * 60 * 1000)
  //   }
  //   this.rest.navCtrl.navigateForward('/luong/chonngay')
  // }

  // public lenluong(i: number) {
  //   let nhanvien = this.rest.luong.nhanvien[i]
  //   this.rest.temp = {
  //     userid: nhanvien.userid,
  //     lenluong: this.time.timetoisodate(this.time.datetotime(nhanvien.lenluong) + 365 * 24 * 60 * 60 * 1000)
  //   }
  //   this.rest.navCtrl.navigateForward('/luong/chonngay')
  // }

  public themnhanvien() {
    this.rest.temp = {
      id: 0,
      luongcoban: 0,
      hopdong: this.time.datetoisodate(this.rest.home.today),
      camket: this.time.datetoisodate(this.rest.home.today),
      cophan: 0,
      tile: 0,
      phucap: 0,
      phucap2: 0,
    }
    this.rest.navCtrl.navigateForward('/luong/timnhanvien')
  }
}
