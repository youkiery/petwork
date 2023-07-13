import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongthemnhanvien',
  templateUrl: './luongthemnhanvien.page.html',
  styleUrls: ['./luongthemnhanvien.page.scss'],
})
export class LuongthemnhanvienPage {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }

  ionViewWillLeave() {
    this.rest.temp.id = 0
  }
  
  public nhaptien(loai: string) {
    let tam = Number(this.rest.temp[loai].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[loai] = this.rest.comma(tam)
  }

  public async them() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'themnhanvien', this.rest.temp).then((phanhoi) => {
      this.rest.defreeze()
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
      this.rest.luong.nhanvien = phanhoi.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa() {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa nhân viên khỏi danh sách',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoa()
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('luong', 'xoanhanvien', {
      id: this.rest.temp.id,
    }).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.nhanvien = phanhoi.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
