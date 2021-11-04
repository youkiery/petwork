import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.root()
      else this.init()
    })
  }

  public async init() {
    if (!this.rest.admin.init) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('admin', 'auto', {
        action: 'admin-user',
      }).then(resp => {
        this.rest.defreeze()
        this.rest.admin.init = true
        this.rest.admin.list = resp.list
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async toggleDoctor(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'doctor', {
      userid: userid,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async toggleManager(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'manager', {
      userid: userid,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async toggleAdmin(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'admin', {
      userid: userid,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public isNumber(number: number) {
    return Number(number)
  }

  public async remove(userid: number) {
    let alert = await this.alert.create({
      message: 'Xóa nhân viên?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.removeSubmit(userid)
          }
        }
      ]
    })
    alert.present()
  }

  public async removeSubmit(userid: number) {
    await this.rest.freeze('Đang xóa...')
    this.rest.checkpost('admin', 'remove', {
      userid: userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.list = resp.list
      this.rest.notify('Đã xóa nhân viên')
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.rest.action = 'admin'
    this.rest.temp = {
      key: '',
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/insert')
  }

  public async detail(index: number) {
    this.rest.temp = {
      index: index,
      name: this.rest.admin.list[index].name,
      fullname: this.rest.admin.list[index].fullname,
    }
    this.rest.action = 'admin'
    this.rest.navCtrl.navigateForward('modal/detail')
  }
}
