import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisxemdieutri',
  templateUrl: './hisxemdieutri.page.html',
  styleUrls: ['./hisxemdieutri.page.scss'],
})
export class HisxemdieutriPage {
  public insult = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public insult_text = {
    0: 'Đang điều trị',
    1: 'Đã ra viện',
    2: 'Đã chết'
  }
  public pay_class = ['pos red', 'pos yellow', 'pos']
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
  }

  public xemchitiet(i: any) {
    this.rest.detail = this.rest.temp[i]
    this.rest.navCtrl.navigateForward('/his/xemchitietdieutri')
  }
}
