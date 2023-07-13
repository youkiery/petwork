import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattucophan',
  templateUrl: './vattucophan.page.html',
  styleUrls: ['./vattucophan.page.scss'],
})
export class VattucophanPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
    else if (!this.rest.vattu.khoitaocophan) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitaocophan', {

    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.khoitaocophan = true
      this.rest.vattu.cophan = resp.cophan
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitaocophan', {

    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.vattu.khoitaocophan = true
      this.rest.vattu.cophan = resp.cophan
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public themgiaodich() {
    this.rest.temp = {
      capnhat: false,
      giaodich: [
        {
          id: 0,
          tile: 0,
          giatri: 0,
          ghichu: '',
        }
      ],
      idnhanvien: (this.rest.vattu.danhsachnhanvien.length ? this.rest.vattu.danhsachnhanvien[0].userid : '0'),
    }
    
    this.rest.navCtrl.navigateForward('/vattu/themcophan')
  }

  public capnhat(thutu: number) {
    var giaodich = this.rest.vattu.cophan.danhsach[thutu]
    this.rest.temp = {
      capnhat: true,
      idnhanvien: giaodich.idnhanvien,
      giaodich: giaodich.giaodich,
    }
    this.rest.navCtrl.navigateForward('/vattu/themcophan')
  }

  public async xoa(idgiaodich: number) {
    let alert = await this.alert.create({
      message: 'Xóa giao dịch này?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xacnhanxoa(idgiaodich)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoa(idgiaodich: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'xoacophan', {
      idgiaodich: idgiaodich
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.cophan = resp.cophan
    }, () => {
      this.rest.defreeze()
    })
  }
}
