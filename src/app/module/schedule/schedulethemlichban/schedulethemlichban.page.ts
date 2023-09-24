import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-schedulethemlichban',
  templateUrl: './schedulethemlichban.page.html',
  styleUrls: ['./schedulethemlichban.page.scss'],
})
export class SchedulethemlichbanPage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/schedule/lichban')
  }

  public async them() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('lichban', 'them', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.lichban.danhsach = resp.danhsach
      this.rest.back()
    }, (e) => {
      this.rest.defreeze()
    })
  }
}
