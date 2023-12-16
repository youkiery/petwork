import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  public tukhoa = ""
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'voucher'
      if (!this.rest.voucher.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.voucher.khoitao = true
      this.rest.voucher.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.voucher.khoitao = true
      this.rest.voucher.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public themvoucher() {
    this.rest.temp = {
      id: 0,
      ten: "",
      hansudung: "1",
      image: "",
    }
    this.rest.navCtrl.navigateForward("/voucher/them")
  }

  public capnhatvoucher(thutu: number) {
    let voucher = this.rest.voucher.danhsach[thutu]
    this.rest.temp = {
      id: voucher.id,
      ten: voucher.ten,
      hansudung: voucher.hansudung,
      image: voucher.hinhanh,
    }
    this.rest.navCtrl.navigateForward("/voucher/them")
  }

  public async xoa(idvattu: number) {
    let alert = await this.alert.create({
      message: 'Xóa voucher này?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xacnhanxoa(idvattu)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoa(idvoucher: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'xoavoucher', {
      idvoucher: idvoucher,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.voucher.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tracuuvoucher() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'tracuu', {
      tukhoa: this.tukhoa
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = {
        tukhoa: this.tukhoa,
        danhsach: resp.danhsach
      }
      this.rest.navCtrl.navigateForward("/voucher/tracuu")
    }, () => {
      this.rest.defreeze()
    })
  }

  public cauhinh() {
    this.rest.navCtrl.navigateForward("/voucher/cauhinh")
  }
}
