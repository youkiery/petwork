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
    if (this.rest.config.module.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
     
      this.rest.temp = {
        number: 1,
        start: this.rest.data.blood.total,
        end: this.rest.data.blood.total - 1,
        target: ''
      }
      this.rest.router.navigateByUrl('/modal/insert')
    }
  }

  public import() {
    if (this.rest.config.module.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp.action = 'in'
      this.rest.navCtrl.navigateForward('/inout')
    }
  }

  public statistic() {
    if (this.rest.config.module.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.router.navigateByUrl('/detail')
    }
  }

  public async ionViewWillEnter() {
    this.rest.action = 'blood'
    this.rest.ready().then(() => {
      if (!this.rest.data.blood.init) {
        this.rest.data.blood.page = 1
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {}).then(response => {
      this.rest.data.blood.list = response.list
      this.rest.data.blood.total = response.total
      this.rest.data.blood.current = response.number
      this.rest.data.blood.current = response.current
      this.rest.data.blood.start = response.start
      this.rest.data.blood.end = response.end

      this.rest.data.blood.init = 1
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('blood', 'init', {
      start: this.rest.data.blood.start,
      end: this.rest.data.blood.end,
    }).then(response => {
      this.rest.data.blood.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}