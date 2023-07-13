import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-setting',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  password: boolean = true
  oldpas: string = ''
  newpas: string = ''
  verpas: string = ''
  constructor(
    public alert: AlertController,
    public rest: RestService,
    public router: Router
  ) { }

  ionViewWillEnter() {
    this.rest.action = 'user'  
  }

  public async changePassword() {
    if (!this.oldpas.length) this.rest.notify('Mật khẩu cũ trống')
    else if (!this.newpas.length) this.rest.notify('Mật khẩu mới trống')
    else if (!this.verpas.length) this.rest.notify('Mật khẩu xác nhận trống')
    else if (this.newpas !== this.verpas) this.rest.notify('Mật khẩu xác nhận không trùng nhau')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('user', 'password', {
        old: this.oldpas,
        new: this.newpas
      }).then(data => {
        this.rest.defreeze()
        this.oldpas = ''
        this.newpas = ''
        this.verpas = ''
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async editName() {
    const alert = await this.alert.create({
      header: 'Chỉnh sửa tên hiển thị',
      inputs: [{
        name: 'name',
        value: this.rest.home.fullname,
        placeholder: 'Tên hiển thị'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (e) => {
            this.editNameSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async editNameSubmit(name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('user', 'changename', {
      name: name
    }).then(data => {
      this.rest.defreeze()
      this.rest.home.fullname = name
    }, () => {
      this.rest.defreeze()
    })
  }
}
