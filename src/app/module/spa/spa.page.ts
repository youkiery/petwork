import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.page.html',
  styleUrls: ['./spa.page.scss'],
})
export class SpaPage implements OnInit {
  interval = null
  checked = false
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    // loading spa list on start
    await this.rest.freeze('Lấy danh sách spa')
    return new Promise((resolve) => {
      this.filter().then(() => {
        this.rest.defreeze()
        resolve(true)
      })      
    }).then(() => {
      // auto refresh every 5 second
      // if not got any data, no other post send
      this.interval = setInterval(() => {
        if (!this.checked) {
          this.filter()
        }
      }, 5000)
    })
  }

  ionViewDidLeave() {
    clearInterval(this.interval)
  }

  public insert() {
    if (this.rest.config.module.spa < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.data.spa.edit = {
        id: 0,
        name: '',
        phone: '',
        note: '',
        image: [],
        type: JSON.parse(JSON.stringify(this.rest.data.spa.type))
      }
      this.rest.router.navigateByUrl('/spa/insert')
    }
  }

  public detail(id: number) {
    this.rest.checkpost('spa', 'get', {
      id: id
    }).then(response => {
      this.rest.data.spa.edit = response.data
      this.rest.router.navigateByUrl('/spa/insert')
    })
  }

  public async done(id: number) {
    if (this.rest.config.module.spa < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      await this.rest.freeze('Đang hoàn thành')
      this.rest.checkpost('spa', 'done', {
        id: id,
        current: this.time.datetotime(this.rest.data.spa.current)
      }).then((response) => {
        this.rest.data.spa.time = response.time
        this.rest.data.spa.data = response.data
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async pickDate() {
    let current = this.rest.data.spa.current.split('/')
    let target = current[2] + '-' + current[1] + '-' + current[0]
    let alert = await this.alert.create({
      header: 'Chọn ngày',
      inputs: [
        {
          label: 'Ngày',
          name: 'date',
          type: 'date',
          value: target
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Chọn ngày',
          cssClass: 'secondary',
          handler: (e) => {
            let result = e.date.split('-')
            this.rest.data.spa.current = result[2] + '/' + result[1] + '/' + result[0]
            this.filterPickDate()
          }
        }
      ]
    })
    alert.present()
  }

  public async filterPickDate() {
    await this.rest.freeze('Lấy danh sách spa')
    this.filter().then(() => {
      this.rest.defreeze()
    })      
  }

  public filter() {
    return new Promise((resolve) => {
      this.checked = true
      this.rest.checkpost('spa', 'auto', {
        action: 'spa-auto',
        time: this.rest.data.spa.time,
        current: this.time.datetotime(this.rest.data.spa.current)
      }).then((response) => {
        if (response.data && response.data != this.rest.data.spa.data) {
          this.rest.data.spa.data = response.data
          this.rest.data.spa.time = response.time
        }
        this.checked = false
        resolve(true)
      }, () => {
        this.checked = false
        resolve(true)
      })
    })
  }

  public async changeDate(amount: number) {
    let time = this.time.datetotime(this.rest.data.spa.current) + amount * 60 * 60 * 24 * 1000
    this.rest.data.spa.current = this.time.timetodate(time)
    await this.rest.freeze('Lấy danh sách spa')
    this.filter().then(() => {
      this.rest.defreeze()
    })
  }
}

