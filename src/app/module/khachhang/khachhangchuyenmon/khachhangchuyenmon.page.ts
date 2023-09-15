import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-khachhangchuyenmon',
  templateUrl: './khachhangchuyenmon.page.html',
  styleUrls: ['./khachhangchuyenmon.page.scss'],
})
export class KhachhangchuyenmonPage implements OnInit {
  public chuyenmon = "nhanvien"
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else if (!this.rest.khachhang.khoitaochuyenmon) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaochuyenmon', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.khoitaochuyenmon = true
      this.rest.khachhang.nhanvien = resp.danhsach
      this.rest.khachhang.dichvu = resp.dichvu
      this.rest.khachhang.chuyenmon = resp.chuyenmon
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaochuyenmon', {
    }).then(resp => {
      this.rest.khachhang.nhanvien = resp.danhsach
      this.rest.khachhang.dichvu = resp.dichvu
      this.rest.khachhang.chuyenmon = resp.chuyenmon
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public async themchuyenmonnhanvien(idnhanvien: number, idchuyenmon: number, loai: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'themchuyenmonnhanvien', {
      idnhanvien: idnhanvien,
      idchuyenmon: idchuyenmon,
      loai: loai
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.nhanvien = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themchuyenmondichvu(iddichvu: number, idchuyenmon: number, loai: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'themchuyenmondichvu', {
      iddichvu: iddichvu,
      idchuyenmon: idchuyenmon,
      loai: loai
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.dichvu = resp.dichvu
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themchuyenmon(i: number = -1) {
    let giatri = ''
    let id = 0
    if (i >= 0) {
      let chuyenmon = this.rest.khachhang.chuyenmon[i]
      giatri = chuyenmon.chuyenmon
      id = chuyenmon.id
    }
    let alert = await this.alert.create({
      message: 'Nhập tên chuyên môn',
      inputs: [{
        name: "chuyenmon",
        value: giatri,
      }],
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanthemchuyenmon(e.chuyenmon, id)
        }
      }]
    });

    await alert.present();
  }

  public async xacnhanthemchuyenmon(chuyenmon: string, idchuyenmon: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'themchuyenmon', {
      chuyenmon: chuyenmon,
      idchuyenmon: idchuyenmon
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.khachhang.chuyenmon = resp.chuyenmon
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoachuyenmon(id: number) {
    let alert = await this.alert.create({
      message: 'xác nhận xoá chuyên môn',
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoachuyenmon(id)
        }
      }]
    });

    await alert.present();
  }

  public async xacnhanxoachuyenmon(idchuyenmon: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'xoachuyenmon', {
      idchuyenmon: idchuyenmon
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.khachhang.chuyenmon = resp.chuyenmon
    }, () => {
      this.rest.defreeze()
    })
  }

}
