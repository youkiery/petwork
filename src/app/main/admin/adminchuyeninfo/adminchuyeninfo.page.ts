import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-adminchuyeninfo',
  templateUrl: './adminchuyeninfo.page.html',
  styleUrls: ['./adminchuyeninfo.page.scss'],
})
export class AdminchuyeninfoPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/admin')
  }

  public async xoanhanvien() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xoanhanvien', {
      nhanvienxoa: this.rest.temp.nhanvienxoa,
      nhanvienchuyen: this.rest.temp.nhanvienchuyen,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.list = resp.list
      this.rest.notify('Đã xóa nhân viên')
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }


}
