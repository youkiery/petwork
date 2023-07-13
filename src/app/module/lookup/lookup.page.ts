import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.page.html',
  styleUrls: ['./lookup.page.scss'],
})
export class LookupPage {
  public id = 0
  constructor(
    public modalCtrl: ModalController,
    public rest: RestService,
    public alertCtrl: AlertController
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'lookup'
      this.init()
    })
  }
  
  public async init() {
    if (!this.rest.drug.init) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('drug', 'auto', { }).then(resp => {
        this.rest.defreeze()
        this.rest.drug.init = true
        this.rest.drug.list = resp.list
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('drug', 'auto', {
      name: this.rest.drug.filter.name,
      effect: this.rest.drug.filter.effect
    }).then(resp => {
      this.rest.defreeze()
      this.rest.drug.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(index: number) {
    this.rest.drug.detail = this.rest.drug.list[index]
    this.rest.action = 'drug'
    this.rest.navCtrl.navigateForward('/modal/detail')
  }
  
  async insert() {
    if (this.rest.config.drug < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.action = 'drug'
      this.rest.temp = {
        name: '',
        limits: '',
        effect: '',
        sideeffect: '',
        mechanic: '',
        image: [],
      }
      this.rest.navCtrl.navigateForward('/modal/upload')
    }
  }

  public async remove(id: number) {
    if (this.rest.config.drug < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alertCtrl.create({
        header: 'Xóa thuốc',
        message: 'Sau khi xác nhận, thuốc sẽ bị xóa',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'danger',
            handler: () => {
              this.removeSubmit()
              this.rest.temp = id
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async removeSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('drug', 'remove', {
      id: this.rest.temp,
      name: this.rest.drug.filter.name,
      effect: this.rest.drug.filter.effect
    }).then(resp => {
      this.rest.defreeze()
      this.rest.notify('Đã xóa thuốc')
      this.rest.drug.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}