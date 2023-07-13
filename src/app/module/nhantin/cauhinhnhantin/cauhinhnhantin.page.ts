import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-cauhinhnhantin',
  templateUrl: './cauhinhnhantin.page.html',
  styleUrls: ['./cauhinhnhantin.page.scss'],
})
export class CauhinhnhantinPage implements OnInit {
  public danhsachloaitru = []
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhantin')   
    if (!this.rest.nhantin.khoitaoloaitru) this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaoloaitru', {}).then(resp => {
      this.rest.defreeze()
      this.rest.nhantin.khoitaoloaitru = true
      this.rest.nhantin.danhsachloaitru = resp.danhsach
      this.rest.nhantin.cauhinhnhantin = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaoloaitru', {}).then(resp => {
      this.rest.nhantin.danhsachloaitru = resp.danhsach
      this.rest.nhantin.cauhinhnhantin = resp.cauhinh
      event.target.complete();
      this.rest.defreeze()
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public themmau() {
    this.rest.temp = {
      id: 0,
      loai: [],
      mautin: '',
      lich: 0
    }
    this.rest.navCtrl.navigateForward('/nhantin/themcauhinh')
  }

  public capnhat(thutu: number) {
    var mautin = this.rest.nhantin.cauhinhnhantin.mautin[thutu]
    this.rest.temp = {
      id: mautin.id,
      loai: mautin.loai,
      mautin: mautin.mautin,
      lich: mautin.lich,
      loainhac: mautin.loainhac,
      sukien: mautin.sukien,
    }
    this.rest.navCtrl.navigateForward('/nhantin/themcauhinh')
  }

  public async xacnhanxoa(id: number) {
    const alert = await this.alert.create({
      header: 'Xóa mẫu tin hiện tại',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.xoamautin(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async xoamautin(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xoamautin', {
      id: id
    }).then(resp => {
      this.rest.nhantin.cauhinhnhantin.mautin = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'luucauhinhnhantin', {
      min: this.rest.nhantin.cauhinhnhantin.min,
      max: this.rest.nhantin.cauhinhnhantin.max,
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanboloaitru(id: number) {
    const alert = await this.alert.create({
      header: 'Đưa thông tin khách hàng vào danh sách nhắc',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.boloaitru(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async boloaitru(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'boloaitru', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.nhantin.khoitaoloaitru = true
      this.rest.nhantin.danhsachloaitru = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
