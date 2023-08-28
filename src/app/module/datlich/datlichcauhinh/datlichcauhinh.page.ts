import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-datlichcauhinh',
  templateUrl: './datlichcauhinh.page.html',
  styleUrls: ['./datlichcauhinh.page.scss'],
})
export class DatlichcauhinhPage implements OnInit {
  public cauhinh = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/datlich')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('datlich', 'khoitaocauhinh', {
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('datlich', 'luucauhinh', {
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
