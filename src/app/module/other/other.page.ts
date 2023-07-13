import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'other'
      if (!this.rest.other.init) {
        this.rest.other.start = this.rest.home.month.start
        this.rest.other.end = this.rest.home.month.end
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'init', {
      start: this.rest.other.start,
      end: this.rest.other.end
    }).then(resp => {
      this.rest.defreeze()
      this.rest.other.init = true
      this.rest.other.type = resp.type
      this.rest.other.list = resp.list
      this.rest.other.need = resp.need
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(e: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'init', {
      start: this.rest.other.start,
      end: this.rest.other.end
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.rest.other.init = true
      this.rest.other.type = resp.type
      this.rest.other.list = resp.list
      this.rest.other.need = resp.need
    }, () => {
      this.rest.defreeze()
      e.target.complete()
    })
  }

  public exam(i: number) {
    var customer = this.rest.other.need[i]
    this.rest.temp = {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      typeid: customer.typeid,
      image: [],
      note: '',
      start: this.rest.other.start,
      end: this.rest.other.end,
    }
    this.rest.navCtrl.navigateForward('/other/insert')
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      address: '',
      image: [],
      note: '',
      typeid: this.rest.other.type[0].id,
      start: this.rest.other.start,
      end: this.rest.other.end,
    }
    this.rest.navCtrl.navigateForward('/other/insert')
  }

  public update(i: number) {
    var item = this.rest.other.list[i]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      image: item.image,
      typeid: item.typeid,
      note: item.note,
      start: this.rest.other.start,
      end: this.rest.other.end,
    }
    this.rest.navCtrl.navigateForward('/other/insert')
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
    this.rest.checkpost('other', 'remove', {
      id: id,
      start: this.rest.other.start,
      end: this.rest.other.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.other.list = resp.list
      this.rest.other.need = resp.need
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
    this.rest.checkpost('other', 'removeneed', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.other.need = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
