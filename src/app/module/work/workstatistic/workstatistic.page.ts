import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workstatistic',
  templateUrl: './workstatistic.page.html',
  styleUrls: ['./workstatistic.page.scss'],
})
export class WorkstatisticPage {
  public batdau = ''
  public ketthuc = ''
  public danhsachnhanvien = []
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
    else {
      this.batdau = this.rest.home.month.start
      this.ketthuc = this.rest.home.month.end
    }
  }

  public async locdulieu() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'thongke', { 
      batdau: this.batdau,
      ketthuc: this.ketthuc
    }).then(resp => {
      this.rest.defreeze()
      this.danhsachnhanvien = resp.nhanvien
    }, () => {
      this.rest.defreeze()
    })
  }

}
