import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisdisease',
  templateUrl: './hisdisease.page.html',
  styleUrls: ['./hisdisease.page.scss'],
})
export class HisdiseasePage {
  public list: any[]
  public key: ''
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  async ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else this.list = JSON.parse(JSON.stringify(this.rest.his.disease))
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận xóa loại bệnh?',
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
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'removedisease', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.disease = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.his.disease))
    }, () => {
      this.rest.defreeze()
    })
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'savedisease', {
      list: this.list,
      key: this.key
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.disease = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.his.disease))
      this.key = ''
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insert() {
    if (!this.key.length) {
      this.rest.notify('Nhập loại bệnh')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'insertdisease', {
      key: this.key
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.disease = resp.list
      this.list = JSON.parse(JSON.stringify(this.rest.his.disease))
      this.key = ''
    }, () => {
      this.rest.defreeze()
    })
  }
}
