import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-ridestatis',
  templateUrl: './ridestatis.page.html',
  styleUrls: ['./ridestatis.page.scss'],
})
export class RidestatisPage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('ride')
    else this.filter()
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('ride', 'statistic', {
      start: this.rest.ride.start,
      end: this.rest.ride.end,
    }).then((resp) => {
      this.rest.temp = resp.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
