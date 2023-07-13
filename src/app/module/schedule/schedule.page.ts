import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
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
  public batdau = ''
  public ketthuc = ''
  public reversal_color = {
    'gray': 'gray',
    'cyan': 'cyan',
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
  // public chedodangky = {
  //   0: 7,
  //   1: 28
  // } // 0: theo tuần, 1: theo tháng
  constructor(
    public rest: RestService,
    public time: TimeService,
    private alert: AlertController
  ) { }


  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'schedule'
      this.rest.schedule.filter = {
        batdau: this.rest.home.month.start,
        ketthuc: this.rest.home.month.end,
        danhsach: []
      }
      if (!this.rest.schedule.init) {
        this.batdau = this.rest.home.month.start
        this.ketthuc = this.rest.home.month.end
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.schedule.time = this.time.datetotime(this.rest.home.today)
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.fullname,
      state: this.rest.schedule.state,
      batdau: this.batdau,
      ketthuc: this.ketthuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.init = true
      this.rest.schedule.start = this.rest.home.month.start
      this.rest.schedule.end = this.rest.home.month.end
      this.rest.schedule.list = resp.list
      this.rest.schedule.except = resp.except
      this.rest.schedule.data = resp.data
      // this.rest.schedule.chedodangky = resp.chedochotlich
      this.rest.schedule.quangay = resp.quangay
      this.rest.schedule.dachotlich = resp.dachotlich
      this.rest.schedule.dadangky = resp.dadangky
      this.rest.schedule.nghichunhat = resp.nghichunhat
      this.rest.schedule.cauhinh = resp.cauhinh
      this.rest.schedule.dangky = resp.dangky
      this.rest.schedule.thangnay = resp.thangnay
      // if (this.rest.config.schedule < 2) this.parseData()
      // else this.temp = JSON.parse(JSON.stringify(resp['data']))
    }, () => {
      this.rest.defreeze()
    })
  }

  // 'red': 'purple',
  // 'purple': 'red',
  // 'green': 'yellow',
  // 'yellow': 'green',
  // 'orange': 'blue',
  // 'blue': 'orange',

  public reg(index: number, type: number) {
    // kiểm tra nếu type là chủ nhật thì kiểm tra toàn bộ, nếu có 2 cái chủ nhật thì thông báo
    var ngaydangky = this.rest.schedule.data[index]
    if (type >= 2 && (ngaydangky.list[type].color == 'gray' || ngaydangky.list[type].color == 'green') && ngaydangky.day == 'CN') {
      let kiemtra = 0
      this.rest.schedule.data.forEach((dangky, thutu) => {
        if (dangky.day == 'CN' && type >= 2) {
          if (dangky.list[2].color == 'yellow') kiemtra++
          if (dangky.list[3].color == 'yellow') kiemtra++
        }
      });

      if (kiemtra + this.rest.schedule.nghichunhat[ngaydangky.date] >= 2) {
        this.rest.notify('Không được đăng ký quá 2 buổi Chủ nhật trong 2 tháng!!!')
        return 0
      }
    }

    let color = this.reversal_color[this.rest.schedule.data[index].list[type].color]
    
    if (this.rest.schedule.thangnay && type >= 2) {
      // kiểm tra nếu đăng ký nghỉ trong tháng, ngày đăng ký > ngày hôm nay thì
      if (ngaydangky.thaydoi) {
        if (ngaydangky.list[type].color == 'cyan' && (this.rest.schedule.cauhinh.huydangky - this.rest.schedule.dangky.huydangky) > 0) {
          this.rest.schedule.data[index].list[type].color = 'blue'
          this.rest.schedule.dangky.huydangky ++
          this.rest.schedule.dadangky ++
        }
        else if (ngaydangky.list[type].color == 'blue') {
          this.rest.schedule.data[index].list[type].color = 'cyan'
          this.rest.schedule.dangky.huydangky --
          this.rest.schedule.dadangky --
        }
        else if (ngaydangky.list[type].color == 'gray' && this.rest.schedule.dadangky > 0 && this.rest.schedule.cauhinh.dangkythem - this.rest.schedule.dangky.dangkythem > 0) {
          this.rest.schedule.data[index].list[type].color = 'yellow'
          this.rest.schedule.dangky.dangkythem ++
          this.rest.schedule.dadangky --
        }
        else if (ngaydangky.list[type].color == 'yellow') {
          this.rest.schedule.data[index].list[type].color = 'gray'
          this.rest.schedule.dangky.dangkythem --
          this.rest.schedule.dadangky ++
        }
      }

      // từ cyan => blue, hủy đăng ký -1
      // từ blue => cyan, hủy đăng ký +1
      // gray => yellow, kiểm tra chủ nhật và số ngày đăng ký, thêm đăng ký -1
      // yellow => gray, thêm đăng ký +1
    }
    else {
      if (this.rest.schedule.dadangky > 0 || color == 'blue' || color == 'green' || color == 'purple' || type < 2) {
        this.rest.schedule.data[index].list[type].color = color
        if (type >= 2) {
          if (color == 'yellow' || color == 'orange' || color == 'red') this.rest.schedule.dadangky--
          else if (color == 'blue' || color == 'green' || color == 'purple') this.rest.schedule.dadangky++
        }
      }
    } 
  }

  public reg2(index: number, index2: number) {
    let color = this.reversal_color[this.rest.schedule.data['dangky'][index].danhsach[index2]]
    this.rest.schedule.data['dangky'][index].danhsach[index2] = color
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
      await this.rest.freeze()
      this.rest.checkpost('schedule', 'userreg', {
        list: list,
        name: this.rest.home.fullname,
        time: this.rest.schedule.time,
        state: this.rest.schedule.state,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.schedule.data = resp.data
        this.rest.schedule.quangay = resp.quangay
        this.rest.schedule.dadangky = resp.dadangky
        this.rest.schedule.nghichunhat = resp.nghichunhat
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
    this.rest.schedule.data['dangky'].forEach((data: any) => {
      data.danhsach.forEach((color: any, index: number) => {
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
      await this.rest.freeze()
      this.rest.checkpost('schedule', 'managerreg', {
        list: list,
        time: this.rest.schedule.time,
        state: this.rest.schedule.state,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.schedule.data = resp.data
        this.rest.schedule.quangay = resp.quangay
        this.rest.schedule.dadangky = resp.dadangky
        this.rest.schedule.nghichunhat = resp.nghichunhat
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

  public async changeMonth(increase: number) {
    // let time = this.rest.schedule.time + increase * this.chedodangky[this.rest.schedule.chedodangky] * 60 * 60 * 24 * 1000
    let date = new Date(this.rest.schedule.time)
    let time = 0
    if (increase > 0) {
      if (date.getMonth() == 11) time = new Date(date.getFullYear() + 1, 0, 1).getTime()
      else time = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()
    }
    else {
      if (date.getMonth() == 0) time = new Date(date.getFullYear() - 1, 11, 1).getTime()
      else time = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime()
    }

    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: time,
      name: this.rest.home.fullname,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.data = resp.data
      this.rest.schedule.quangay = resp.quangay
      this.rest.schedule.time = time
      this.rest.schedule.dachotlich = resp.dachotlich
      this.rest.schedule.dadangky = resp.dadangky
      this.rest.schedule.nghichunhat = resp.nghichunhat
      this.rest.schedule.cauhinh = resp.cauhinh
      this.rest.schedule.dangky = resp.dangky
      this.rest.schedule.thangnay = resp.thangnay
    }, () => {
      this.rest.defreeze()
    })
  }

  public async auto() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.fullname,
      state: this.rest.schedule.state,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.schedule.data = resp.data
      this.rest.schedule.quangay = resp.quangay
      this.rest.schedule.dachotlich = resp.dachotlich
      this.rest.schedule.dadangky = resp.dadangky
      this.rest.schedule.nghichunhat = resp.nghichunhat
      this.rest.schedule.cauhinh = resp.cauhinh
      this.rest.schedule.dangky = resp.dangky
      this.rest.schedule.thangnay = resp.thangnay
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reload(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'init', {
      time: this.rest.schedule.time,
      name: this.rest.home.fullname,
      state: this.rest.schedule.state,
      batdau: this.batdau,
      ketthuc: this.ketthuc
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.schedule.data = resp.data
      this.rest.schedule.quangay = resp.quangay
      this.rest.schedule.dachotlich = resp.dachotlich
      this.rest.schedule.dadangky = resp.dadangky
      this.rest.schedule.nghichunhat = resp.nghichunhat
      this.rest.schedule.cauhinh = resp.cauhinh
      this.rest.schedule.dangky = resp.dangky
      this.rest.schedule.thangnay = resp.thangnay
    }, () => {
      event.target.complete()
      this.rest.defreeze()
    })
  }

  public async xemchotlich() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'xemchotlich', {
      filter: this.rest.schedule.filter,
      batdau: this.batdau,
      ketthuc: this.ketthuc
    }).then((phanhoi) => {
      this.rest.schedule.filter.danhsach = phanhoi.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chotlich() {
    const alert = await this.alert.create({
      header: 'Xác nhận chốt lịch nghỉ tính lương',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Chốt lịch',
          handler: () => {
            this.xacnhanchotlich()
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanchotlich() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('schedule', 'chotlich', {
      danhsach: this.rest.schedule.filter.danhsach,
      batdau: this.batdau,
      ketthuc: this.ketthuc
    }).then((phanhoi) => {
      this.rest.schedule.dachotlich = phanhoi.dachotlich
      this.rest.luong.khoitao = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
