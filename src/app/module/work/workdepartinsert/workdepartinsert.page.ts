import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workdepartinsert',
  templateUrl: './workdepartinsert.page.html',
  styleUrls: ['./workdepartinsert.page.scss'],
})
export class WorkdepartinsertPage {

  constructor(
    public rest: RestService
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
  }

  public async insert() {
    await this.rest.freeze('Đang tải dữ liệu...')
    let temp = this.rest.temp
    if (this.rest.detail.work) temp = this.rest.detail
    this.rest.checkpost('congviec', 'themnhanvien', temp).then(resp => {
    this.rest.defreeze()
      this.rest.congviec.danhmuc = resp.danhmuc
      if (this.rest.congviec.child.length) this.rest.congviec.child = this.rest.congviec.danhmuc[this.rest.congviec.childid].child
      if (this.rest.detail.work) this.rest.temp.departid = resp.id
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
