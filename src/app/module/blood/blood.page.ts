import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.page.html',
  styleUrls: ['./blood.page.scss'],
})
export class BloodPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public insert() {
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
     
      this.rest.temp = {
        number: 1,
        start: this.rest.blood.total,
        end: this.rest.blood.total - 1,
        target: ''
      }
      this.rest.navCtrl.navigateForward('/modal/insert')
    }
  }

  public import() {
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp.action = 'in'
      this.rest.navCtrl.navigateForward('/inout')
    }
  }

  public statistic() {
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.navCtrl.navigateForward('/modal/detail')
    }
  }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'blood'
      this.rest.ready().then(() => {
        if (!this.rest.blood.init) {
          this.rest.blood.page = 1
          this.init()
        }
      })
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {}).then(resp => {
      this.rest.defreeze()
      this.rest.blood.list = resp.list
      this.rest.blood.total = resp.total
      this.rest.blood.current = resp.number
      this.rest.blood.current = resp.current
      this.rest.blood.start = resp.start
      this.rest.blood.end = resp.end
      this.rest.blood.init = true
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {
      start: this.rest.blood.start,
      end: this.rest.blood.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.blood.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}