import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-inout',
  templateUrl: './inout.page.html',
  styleUrls: ['./inout.page.scss'],
})
export class InoutPage implements OnInit {
  public number = {
    1: 0, 2: 0, 3: 0
  }
  public total = 0
  public number2: number = 0
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
  }

  public async out() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    
    this.rest.checkpost('blood', 'out', {
      number: this.number2
    }).then(response => {
      this.rest.temp.start = response.number
      this.rest.temp.end = response.number - 1
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async in() {
    await this.rest.freeze('Đang thêm phiếu nhập...')
    this.rest.checkpost('blood', 'in', {
      number: this.number,
      total: this.total,
    }).then(response => {
      this.rest.blood.current = response.current
      this.rest.blood.total = Number(response.total)
      this.rest.temp.start = response.total
      this.rest.temp.end = response.total - response.total
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }
}
