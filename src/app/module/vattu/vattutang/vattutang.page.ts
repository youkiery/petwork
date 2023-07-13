import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattutang',
  templateUrl: './vattutang.page.html',
  styleUrls: ['./vattutang.page.scss'],
})
export class VattutangPage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
  }

  public async xoa(thutu: number) {
    var tang = this.rest.vattu.danhsachtang[thutu]
    if (tang.vattu > 0) this.rest.notify('Tầng chứa vật tư, không thể xóa!')
    else {
      let alert = await this.alert.create({
        message: 'Xóa ' + tang.ten + '?',
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.xacnhanxoa(tang.id)
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async xacnhanxoa(idtang: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'xoatang', {
      idtang: idtang,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.danhsachtang = resp.danhsachtang
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat(thutu: number) {
    var tang = this.rest.vattu.danhsachtang[thutu]
    let alert = await this.alert.create({
      message: 'Nhập tên tầng mới',
      inputs: [{
        name: 'ten',
        type: 'text',
        value: tang.ten
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhancapnhattang(e.ten, tang.id)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhancapnhattang(ten: string, idtang: number) {
    if (!ten.length) {
      this.rest.notify('Tên tầng trống!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'capnhattang', {
      idtang: idtang,
      ten: ten
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.danhsachtang = resp.danhsachtang
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themtang() {
    let alert = await this.alert.create({
      message: 'Nhập tên tầng mới',
      inputs: [{
        name: 'ten',
        type: 'text',
        value: ''
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemtang(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemtang(ten: string) {
    if (!ten.length) {
      this.rest.notify('Tên tầng trống!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'themtang', {
      ten: ten
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.danhsachtang = resp.danhsachtang
    }, () => {
      this.rest.defreeze()
    })
  }
}
