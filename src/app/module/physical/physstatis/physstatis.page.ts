import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-physstatis',
  templateUrl: './physstatis.page.html',
  styleUrls: ['./physstatis.page.scss'],
})
export class PhysstatisPage implements OnInit {
  public data = {
    total: 0, price: 0, last: '', cycle: ''
  }
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('physical')
      else this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.checkpost('physical', 'statistic', {
      start: this.rest.home.month.start,
      end: this.rest.home.month.end,
    }).then(resp => {
      this.rest.defreeze()
      this.data = resp.data
    }, () => {
      this.rest.defreeze()
    })
  }
}
