import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemcanhbao',
  templateUrl: './itemcanhbao.page.html',
  styleUrls: ['./itemcanhbao.page.scss'],
})
export class ItemcanhbaoPage implements OnInit {
  public danhsach = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hanghoa')
    else this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('item', 'khoitaocanhbao', {
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('item', 'khoitaocanhbao', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
