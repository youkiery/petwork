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

  public async ionViewDidEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    if (!this.rest.filter.admin.init) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('admin', 'auto', {
        action: 'admin-user',
      }).then(resp => {
        this.rest.filter.admin.init = true
        this.rest.data.admin.list = resp.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
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
      id: userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.data.admin.list = resp.list
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
    this.rest.router.navigateByUrl('modal/insert')
  }

  public async detail(index: number) {
    this.rest.temp.index = index
    this.rest.action = 'admin'
    this.rest.router.navigateByUrl('modal/detail')
  }
}
