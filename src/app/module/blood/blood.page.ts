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
      this.rest.router.navigateByUrl('/modal/insert')
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
      this.rest.router.navigateByUrl('/detail')
    }
  }

  public async ionViewWillEnter() {
    this.rest.action = 'blood'
    this.rest.ready().then(() => {
      if (!this.rest.blood.init) {
        this.rest.blood.page = 1
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {}).then(response => {
      this.rest.blood.list = response.list
      this.rest.blood.total = response.total
      this.rest.blood.current = response.number
      this.rest.blood.current = response.current
      this.rest.blood.start = response.start
      this.rest.blood.end = response.end

      this.rest.blood.init = true
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {
      start: this.rest.blood.start,
      end: this.rest.blood.end,
    }).then(response => {
      this.rest.blood.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}