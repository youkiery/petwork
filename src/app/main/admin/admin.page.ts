import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  public switch = ['on', 'off']
  public list = [
    {name: 'Lịch spa', module: 'spa'},
    {name: 'Quản lý nhắc gọi', module: 'vaccine'},
    {name: 'Đăng ký lịch', module: 'schedule'},
    {name: 'Quản lý hàng hóa', module: 'item'},
    {name: 'Kaizen', module: 'kaizen'},
    {name: 'Tra cứu thuốc', module: 'drug'},
    {name: 'Giá sỉ', module: 'price'},
    {name: 'Quản lý xe', module: 'ride'},
    {name: 'Quản lý sinh hóa', module: 'profile'},
    {name: 'Quản lý sinh lý', module: 'physical'},
    {name: 'Quản lý bệnh nhân', module: 'his'},
    {name: 'Quản lý đơn hàng', module: 'cart'},
    {name: 'Quản lý nhà xe', module: 'transport'},
    // {name: 'Quản lý công việc', module: 'work'},
  ]
  public level = ['l0', 'l1', 'l2']
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewWillEnter() {
    this.init()
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

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'auto', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async toggle(userid: number, per: string = 'doctor') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'toggle', {
      userid: userid,
      per: per
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async change(userid: number, per: string = 'doctor') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'change', {
      userid: userid,
      per: per
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
  
  // public async toggleManager(userid: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('admin', 'manager', {
  //     userid: userid,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.config = resp.config
  //     this.rest.admin.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async toggleAdmin(userid: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('admin', 'admin', {
  //     userid: userid,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.config = resp.config
  //     this.rest.admin.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
  
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
    await this.rest.freeze('Đang tải dữ liệu...')
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
