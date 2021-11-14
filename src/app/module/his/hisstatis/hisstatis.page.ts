import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisstatis',
  templateUrl: './hisstatis.page.html',
  styleUrls: ['./hisstatis.page.scss'],
})
export class HisstatisPage implements OnInit {
  public insult = {
    0: 'stl-card yellow',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public data = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
    else this.statistic()
  }

  public async statistic() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'statistic', {
      from: this.rest.his.start,
      end: this.rest.his.end,
    }).then((resp) => {
      this.data = resp.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
