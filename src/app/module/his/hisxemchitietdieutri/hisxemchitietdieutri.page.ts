import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisxemchitietdieutri',
  templateUrl: './hisxemchitietdieutri.page.html',
  styleUrls: ['./hisxemchitietdieutri.page.scss'],
})
export class HisxemchitietdieutriPage {

  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  constructor(
    public rest: RestService
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
  }
}
