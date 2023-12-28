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
        this.rest.schedule.time = this.time.datetoisodate(this.rest.home.today)
        this.batdau = this.rest.home.month.start
        this.ketthuc = this.rest.home.month.end
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
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

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.schedule.time).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.rest.schedule.time = this.time.timetoisodate(thoigian.getTime())
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

  public chamcong() {
    this.rest.navCtrl.navigateForward("/schedule/chamcong")
  }
}
