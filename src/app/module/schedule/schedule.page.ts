import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  // public day = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  // public limit = [1, 2, 2, 2, 2, 2, 1]
  // public color = [
  //   ['', '', '', ''],
  //   ['', '', '', ''],
  //   ['', '', '', ''],
  //   ['', '', '', ''],
  //   ['', '', '', ''],
  //   ['', '', '', ''],
  //   ['', '', '', '']
  // ]
  public txt = {
    0: {
      0: 'BV',
      1: 'LB'
    },
    1: {
      0: 'S',
      1: 'C'
    }
  }
  public reversal_color = {
    'gray': 'gray',
    'red': 'purple',
    'purple': 'red',
    'green': 'yellow',
    'yellow': 'green',
    'orange': 'blue',
    'blue': 'orange',
  }
  public userAction = {
    'yellow': 'insert',
    'blue': 'remove'
  }
  public managerAction = {
    'yellow': 'insert',
    'purple': 'remove',
  }
  public day = []
  temp: any
  today = ''
  constructor(
    public rest: RestService,
    public time: TimeService,
    private alert: AlertController
  ) {
  }

  ngOnInit() { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.schedule.time = this.time.datetotime(this.rest.home.today)
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.name,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.list = resp.list
      this.rest.schedule.except = resp.except
      this.rest.schedule.data = resp.data
      // if (this.rest.config.schedule < 2) this.parseData()
      // else this.temp = JSON.parse(JSON.stringify(resp['data']))
    }, () => {
      this.rest.defreeze()
    })
  }

  public reg(index: number, type: number) {
    this.rest.schedule.data[index].list[type].color = this.reversal_color[this.rest.schedule.data[index].list[type].color]
  }

  public reg2(index: number, index2: number) {
    this.rest.schedule.data['list'][index].list[index2] = this.reversal_color[this.rest.schedule.data['list'][index].list[index2]]
  }

  public async register() {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Lịch đăng ký sẽ thay đổi',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Đăng ký',
          cssClass: 'secondary',
          handler: () => {
            if (this.rest.config.schedule < 2) this.userRegister()
            else this.managerRegister()
          }
        }
      ]
    })
    alert.present()
  }

  public async userRegister() {
    let list = []
    this.rest.schedule.data.forEach((data, date) => {
      data.list.forEach((ud: any, type: number) => {
        if (this.userAction[ud.color]) list.push({
          uid: this.rest.home.userid,
          order: date,
          type: type,
          action: this.userAction[ud.color]
        })
      });
    })
    if (!list.length) this.rest.notify('Chưa chọn ca đăng ký')
    else {
      this.rest.freeze()
      this.rest.checkpost('schedule', 'userreg', {
        list: list,
        name: this.rest.home.name,
        time: this.rest.schedule.time,
        state: this.rest.schedule.state,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.schedule.data = resp.data
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public num(n: string) {
    return Number(n)
  }

  public async managerRegister() {
    let list = []
    this.rest.schedule.data['list'].forEach((data: any) => {
      data.list.forEach((color: any, index: number) => {
        if (this.managerAction[color]) list.push({
          uid: data.uid,
          order: Math.floor(index / 2),
          type: (index % 2),
          action: this.managerAction[color]
        })
      });
    })
    if (!list.length) this.rest.notify('Chưa chọn ca đăng ký')
    else {
      this.rest.freeze()
      this.rest.checkpost('schedule', 'managerreg', {
        list: list,
        time: this.rest.schedule.time,
        state: this.rest.schedule.state,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.schedule.data = resp.data
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public cancel() {
    if (this.rest.config.schedule < 2) {
      this.rest.schedule.data.forEach((data, date) => {
        data.list.forEach((ud: any, type: number) => {
          if (this.userAction[ud.color]) this.rest.schedule.data[date].list[type].color = this.reversal_color[ud.color]
        });
      })
    }
    else {
    }
  }

  public async changeWeek(increaseWeek: number) {
    let time = this.rest.schedule.time + 60 * 60 * 24 * 7 * 1000 * increaseWeek
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: time,
      name: this.rest.home.name,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.data = resp.data
      this.rest.schedule.time = time
    }, () => {
      this.rest.defreeze()
    })
  }

  public async auto() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.name,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.data = resp.data
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reload(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.name,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.schedule.data = resp.data
    }, () => {
      event.target.complete()
      this.rest.defreeze()
    })
  }
}
