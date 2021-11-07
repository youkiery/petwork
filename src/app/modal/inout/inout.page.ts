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
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.root()      
    })
  }

  public async out() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    
    this.rest.checkpost('blood', 'out', {
      number: this.number2
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp.start = resp.number
      this.rest.temp.end = resp.number - 1
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async in() {
    await this.rest.freeze('Đang thêm phiếu nhập...')
    this.rest.checkpost('blood', 'in', {
      number: this.number,
      total: this.total,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.blood.current = resp.current
      this.rest.blood.total = Number(resp.total)
      this.rest.temp.start = resp.total
      this.rest.temp.end = resp.total - resp.total
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
