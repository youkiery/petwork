import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profinsert',
  templateUrl: './profinsert.page.html',
  styleUrls: ['./profinsert.page.scss'],
})
export class ProfinsertPage implements OnInit {
  public header = {
    'sampletype': 'Nhập tên Loại mẫu',
    'species': 'Nhập tên Loại thú cưng'
  }
  public serial = 0
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('profile')
  }

  public async updateTarget() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'updateinfo', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.profile.target = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertTarget() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.profile.target = resp.list
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async insert() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.profile.page = 1
      this.rest.profile.serial = resp.serial
      let temp = [resp.data]
      temp = temp.concat(this.rest.profile.list)
      this.rest.profile.list = temp
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async updateprofile() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'updateprofile', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.profile.list = resp.list
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async insertSelect(type: string = 'sampletype') {
    let alert = await this.alert.create({
      header: this.header[type],
      inputs: [
        {
          name: 'type',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: (e) => {
            this.insertSelectSubmit(type, e.type)
          }
        }
      ]
    })
    await alert.present()
  }

  public async insertSelectSubmit(type: string, typevalue: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'insertselect', {
      typename: type,
      typevalue: typevalue,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile[type] = resp.list
      this.rest.temp[type] = this.rest.profile[type][this.rest.profile[type].length - 1].id
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('/modal/suggest')
  }
}
