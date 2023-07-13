import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admininsert',
  templateUrl: './admininsert.page.html',
  styleUrls: ['./admininsert.page.scss'],
})
export class AdmininsertPage {
  public logo = 'assets/image/logo.png'
  constructor(
    public rest: RestService,
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/admin')
  }
  
  public async signup() {
    if (this.rest.temp.password != this.rest.temp.vpassword) this.rest.notify('Mật khẩu không trùng nhau')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('admin', 'signup', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.admin.list = resp.list
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async update() {
    if (this.rest.temp.password != this.rest.temp.vpassword) this.rest.notify('Mật khẩu không trùng nhau')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('admin', 'updateuser', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.admin.list = resp.list
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }
}
