import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xquang',
  templateUrl: './xquang.page.html',
  styleUrls: ['./xquang.page.scss'],
})
export class XquangPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'xquang'
      if (!this.rest.xquang.init) {
        this.rest.xquang.start = this.rest.home.month.start
        this.rest.xquang.end = this.rest.home.month.end
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xquang', 'init', {
      start: this.rest.xquang.start,
      end: this.rest.xquang.end
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xquang.init = true
      this.rest.xquang.list = resp.list
      this.rest.xquang.need = resp.need
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(e:any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xquang', 'init', {
      start: this.rest.xquang.start,
      end: this.rest.xquang.end
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.rest.xquang.init = true
      this.rest.xquang.list = resp.list
      this.rest.xquang.need = resp.need
    }, () => {
      this.rest.defreeze()
      e.target.complete()
    })
  }

  public exam(i: number) {
    var customer = this.rest.xquang.need[i]
    this.rest.temp = {
      xrayid: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      image: [],
      note: '',
      start: this.rest.xquang.start,
      end: this.rest.xquang.end,
    }
    this.rest.navCtrl.navigateForward('/xquang/insert')
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      address: '',
      image: [],
      note: '',
      start: this.rest.xquang.start,
      end: this.rest.xquang.end,
    }
    this.rest.navCtrl.navigateForward('/xquang/insert')
  }

  public update(i: number) {
    var item = this.rest.xquang.list[i]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      image: item.image,
      note: item.note,
      start: this.rest.xquang.start,
      end: this.rest.xquang.end,
    }
    this.rest.navCtrl.navigateForward('/xquang/insert')
  }
  
  public async remove(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa kết quả X Quang này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xquang', 'remove', {
      id: id,
      start: this.rest.xquang.start,
      end: this.rest.xquang.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.xquang.list = resp.list
      this.rest.xquang.need = resp.need
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeneed(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa yêu cầu xét nghiệm',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeneedSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeneedSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xquang', 'removeneed', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xquang.need = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
