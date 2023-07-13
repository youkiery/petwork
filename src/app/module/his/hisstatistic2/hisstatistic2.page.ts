import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisstatistic2',
  templateUrl: './hisstatistic2.page.html',
  styleUrls: ['./hisstatistic2.page.scss'],
})
export class Hisstatistic2Page {
  public data = []
  public insult = {
    0: 'stl-card yellow',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public init = false
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else if (!this.init) this.statistic()
  }

  public async xem(danhsach: number[]) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'xemdieutri', {
      danhsach: danhsach
    }).then((resp) => {
      this.rest.temp = resp.danhsach
      this.rest.navCtrl.navigateForward('/his/xemdieutri')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async statistic() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'statistic2', {
      start: this.rest.his.filter.start,
      end: this.rest.his.filter.end,
    }).then((resp) => {
      this.init = true
      this.data = resp.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
