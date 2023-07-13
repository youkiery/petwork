import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-sieuam',
  templateUrl: './sieuam.page.html',
  styleUrls: ['./sieuam.page.scss'],
})
export class SieuamPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'sieuam'
      if (!this.rest.sieuam.init) {
        this.rest.sieuam.start = this.rest.home.month.start
        this.rest.sieuam.end = this.rest.home.month.end
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('sieuam', 'init', {
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end
    }).then(resp => {
      this.rest.defreeze()
      this.rest.sieuam.init = true
      this.rest.sieuam.list = resp.list
      this.rest.sieuam.need = resp.need
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(e) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('sieuam', 'init', {
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.rest.sieuam.init = true
      this.rest.sieuam.list = resp.list
      this.rest.sieuam.need = resp.need
    }, () => {
      this.rest.defreeze()
      e.target.complete()
    })
  }

  public exam(i: number) {
    var customer = this.rest.sieuam.need[i]
    this.rest.temp = {
      xrayid: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      image: [],
      note: '',
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end,
    }
    this.rest.navCtrl.navigateForward('/sieuam/insert')
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      address: '',
      image: [],
      note: '',
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end,
    }
    this.rest.navCtrl.navigateForward('/sieuam/insert')
  }

  public update(i: number) {
    var item = this.rest.sieuam.list[i]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      image: item.image,
      note: item.note,
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end,
    }
    this.rest.navCtrl.navigateForward('/sieuam/insert')
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
    this.rest.checkpost('sieuam', 'remove', {
      id: id,
      start: this.rest.sieuam.start,
      end: this.rest.sieuam.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.sieuam.list = resp.list
      this.rest.sieuam.need = resp.need
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
    this.rest.checkpost('sieuam', 'removeneed', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.sieuam.need = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
