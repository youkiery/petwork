import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-adminadd',
  templateUrl: './adminadd.page.html',
  styleUrls: ['./adminadd.page.scss'],
})
export class AdminaddPage {
  public init = false
  public key = ''
  public list = []
  constructor(
    public rest: RestService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/admin')
    else if (!this.init) {
      this.init = true
      this.filter()
    }
  }

  public insert() {
    this.rest.navCtrl.navigateForward('/admin/insert')
  }

  public async add(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'insert', {
      userid: userid,
      key: this.key
    }).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
      this.rest.admin.list = resp.admin
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'filter', {
      key: this.key
    }).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
