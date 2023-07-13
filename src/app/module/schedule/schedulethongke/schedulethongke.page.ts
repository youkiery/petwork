import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-schedulethongke',
  templateUrl: './schedulethongke.page.html',
  styleUrls: ['./schedulethongke.page.scss'],
})
export class SchedulethongkePage {
  public danhsach = []
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/schedule')
    else this.thongke()
  }

  public async thongke() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'thongkedangky', {
      start: this.rest.schedule.start,
      end: this.rest.schedule.end,
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
