import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.page.html',
  styleUrls: ['./spa.page.scss'],
})
export class SpaPage {
  interval = null
  checked = false
  public status = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card yellow',
    3: 'stl-card red',
  }
  public status_text = {
    0: 'Chưa xong',
    1: 'Đã xong',
    2: 'Đã gọi',
    3: 'Đã về'
  }
  public weight = ['< 2kg', '2-4kg', '4-10kg', '10-15kg', '15-25kg', '25-35kg', '35-50kg', '> 50kg']
  public autoload = null
  public check = true
  public option = []
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'spa'
      this.autoload = setInterval(() => {
        if (this.rest.spa.init) this.auto()
      }, 15000)
      if (!this.rest.spa.init) {
        this.rest.spa.time = (new Date()).getTime()
        this.init()
      }
    })
  }

  ionViewWillLeave() {
    clearInterval(this.autoload)
  }

  public async init() {
    this.check = false
    this.rest.checkpost('spa', 'init', {
      time: this.rest.spa.time,
    }).then((resp) => {
      let firstDay = this.time.datetotime(this.rest.home.today);
      let lastDay = this.time.datetotime(this.rest.home.today);
      this.check = true
      this.rest.spa.from = this.time.timetoisodate(firstDay)
      this.rest.spa.end = this.time.timetoisodate(lastDay)
      
      this.rest.spa.init = new Date().getTime()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.rest.home.doctor.forEach(item => {
        this.option.push({
          name: 'userid',
          type: 'radio',
          label: item.name,
          value: item.userid,
          checked: (this.rest.home.userid == item.userid ? true : false)
        })
      });
    }, () => { })
  }

  public async auto() {
    if (this.check) {
      this.check = false
      this.rest.checkpost('spa', 'auto', {
        time: this.rest.spa.time,
        ctime: this.rest.spa.init
      }).then((resp) => {
        this.check = true
        if (resp.list.length) {
          this.rest.spa.init = resp.time
          this.rest.spa.list = resp.list
        }
      }, () => { })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa', 'filter', {
      time: this.rest.spa.time,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.init = resp.time
      this.rest.spa.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async search() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa', 'search', {
      keyword: this.rest.spa.keyword
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.old = resp.list
      this.rest.navCtrl.navigateForward('modal/filter')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }

  public insert() {
    this.rest.temp = {
      id: 0,
      name: '',
      phone: '',
      name2: '',
      phone2: '',
      note: '',
      weight: 0,
      image: [],
      option: this.rest.home.default['spa'],
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }

    this.rest.navCtrl.navigateForward('/modal/upload')
  }

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.spa.list[index].id,
      name: this.rest.spa.list[index].name,
      phone: this.rest.spa.list[index].phone,
      name2: this.rest.spa.list[index].name2,
      phone2: this.rest.spa.list[index].phone2,
      note: this.rest.spa.list[index].note,
      image: this.rest.spa.list[index].image,
      option: this.rest.spa.list[index].option,
      weight: Number(this.rest.spa.list[index].weight),
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }
    this.rest.router.navigateByUrl('/modal/upload')
  }

  public async returned(index: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành mục spa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.returnedSubmit(index, e)
          }
        }
      ]
    });

    if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async returnedSubmit(index: number, uid: number = 0) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'returned', {
      id: this.rest.spa.list[index].id,
      uid: uid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(index: number) {
    let alert = await this.alert.create({
      message: 'Xóa mục spa này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'remove', {
      id: this.rest.spa.list[index].id,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành mục spa?',
      inputs: this.option,
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(index, e)
          }
        }
      ]
    });

    if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async doneSubmit(index: number, uid: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'done', {
      id: this.rest.spa.list[index].id,
      uid: uid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.report(index)
    }, () => {
      this.rest.defreeze()
    })
  }

  public async called(index: number) {
    let alert = await this.alert.create({
      message: 'Đã gọi cho khách?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(index, e)
          }
        }
      ]
    });

    if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async calledSubmit(index: number, uid: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'called', {
      id: this.rest.spa.list[index].id,
      uid: uid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
    }, () => {
      this.rest.defreeze()
    })
  }

  public manager() {
    this.rest.temp = {
      manager: 1,
      image: '',
      list: []
    }
    this.rest.navCtrl.navigateForward('/spa/done')
  }

  public report(index: number) {
    let item = this.rest.spa.list[index]
    this.rest.temp = {
      id: item.id,
      uid: item.duserid,
      image: item.dimage
    }
    
    this.rest.navCtrl.navigateForward('spa/done')
  }

  public async pickDate() {
    let current = this.time.timetodate(this.rest.spa.time).split('/')
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
            this.rest.spa.time = this.time.datetotime(result[2] + '/' + result[1] + '/' + result[0])
            this.filter()
          }
        }
      ]
    })
    alert.present()
  }

  public async changeDate(amount: number) {
    this.rest.spa.time += amount * 60 * 60 * 24 * 1000
    this.filter()
  }
}
