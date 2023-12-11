import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracuuvoucher',
  templateUrl: './tracuuvoucher.page.html',
  styleUrls: ['./tracuuvoucher.page.scss'],
})
export class TracuuvoucherPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.rest.temp = []
    // this.tracuuvoucher()
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/voucher')
  }

  public async hoanthanh(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận sử dụng voucher này?',
      buttons: [{
        text: 'Bỏ',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        cssClass: 'secondary',
        handler: (e) => {
          this.xacnhanhoanthanh(id)
        }
      }]
    })
    alert.present()
  }

  public async xacnhanhoanthanh(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'hoanthanh', {
      id: id,
      tukhoa: this.rest.temp.tukhoa
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
