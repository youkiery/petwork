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
  public toggle = true
  public segment = '0'
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
  public nstatus = {
    0: 'stl-card yellow',
    1: 'stl-card blue'
  }
  public ntext = [
    'Chưa về & đã về',
    'Chưa về',
    'Đã về',
  ]
  public nrev = [1, 2, 0]
  public weight = ['< 2kg', '2-4kg', '4-10kg', '10-15kg', '15-25kg', '25-35kg', '35-50kg', '> 50kg']
  public autoload = null
  public check = true
  public option = []
  public gioihan = 30 * 60 * 1000;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'spa'
      this.search()
      if (!this.rest.spa.init) {
        let firstDay = this.time.datetotime(this.rest.home.today);
        let lastDay = this.time.datetotime(this.rest.home.today);
        this.rest.spa.search.start = this.time.timetoisodate(firstDay)
        this.rest.spa.search.end = this.time.timetoisodate(lastDay)
        this.init()
      }
      this.autoload = setInterval(() => {
        this.init()
      }, 60000)
    })
  }

  ionViewWillLeave() {
    clearInterval(this.autoload)
  }

  public changer() {
    this.rest.spa.search.status = this.nrev[this.rest.spa.search.status]
    this.search()
  }

  public search() {
    let rev = [
      ['0', '1', '2', '3'],
      ['0', '1', '2'],
      ['3']
    ]
    this.rest.spa.filter = this.rest.spa.list.filter((item, index) => {
      let key = this.rest.alias(this.rest.spa.keyword)
      return (item.phone.indexOf(key) >= 0 || this.rest.alias(item.name).indexOf(key) >= 0) && (rev[this.rest.spa.search.status].indexOf(item.status) >= 0)
    })
  }

  public thongke() {
    this.rest.navCtrl.navigateForward('/spa/thongke')
  }

  public async init() {
    this.rest.checkpost('spa', 'init', {
      filter: this.rest.spa.search
    }).then((resp) => {
      this.rest.spa.init = true
      this.rest.spa.list = resp.list
      this.option = []
      resp.nhanvien.forEach(item => {
        this.option.push({
          name: 'userid',
          type: 'radio',
          label: item.name,
          value: item.userid,
          checked: (this.rest.home.userid == item.userid ? true : false)
        })
      });
      this.search()
    }, () => { })
  }

  // public async auto() {
  //   if (this.check) {
  //     this.check = false
  //     this.rest.checkpost('spa', 'init', {
  //       start: this.rest.spa.start,
  //       end: this.rest.spa.end,
  //     }).then((resp) => {
  //       this.check = true
  //       if (resp.list.length) {
  //         this.rest.spa.list = resp.list
  //         this.search()
  //       }
  //     }, () => { })
  //   }
  // }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'init', {
      filter: this.rest.spa.search
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.init = true
      this.rest.spa.list = resp.list
      this.search()
    }, () => { 
      this.rest.defreeze()
    })
  }

  // public async search() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('spa', 'search', {
  //     keyword: this.rest.spa.keyword
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.spa.old = resp.list
  //     this.rest.navCtrl.navigateForward('/modal/filter')
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
  public kiemtrathoigian(thoigian: number, trangthai: number) {
    if (trangthai == 0 && (new Date().getTime() - thoigian) > this.gioihan) return true
    return false
  }

  public insert() {
    this.rest.temp = {
      id: 0,
      name: '',
      phone: '',
      name2: '',
      phone2: '',
      note: '',
      tinhcach: '',
      weight: 0,
      treat: Number(this.segment),
      image: [],
      option: this.rest.home.default['spa'],
      filter: this.rest.spa.search,
      did: 1,
      khonglam: 0,
      number: 1
    }
    this.rest.navCtrl.navigateForward('/spa/insert')
  }

  public update(index: number) {
    let item = this.rest.spa.filter[index]
    this.rest.temp = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      name2: item.name2,
      phone2: item.phone2,
      note: item.note,
      tinhcach: item.tinhcach,
      image: item.image,
      segment: Number(this.segment),
      option: item.option,
      weight: Number(item.weight),
      treat: Number(item.treat), 
      filter: this.rest.spa.search,
      number: item.number
    }
    this.rest.navCtrl.navigateForward('/spa/insert')
  }

  // public async schedule(index: number) {
  //   let item = this.rest.spa.filter[index]
  //   this.rest.temp = {
  //     name: item.name,
  //     phone: item.phone,
  //     note: '',
  //     image: item.image,
  //     time: this.time.timetoisodate(this.time.datetotime(this.rest.home.today) + 60 * 60 * 24 * 7 * 1000), 
  //     filter: this.rest.spa.search,
  //   }
  //   this.rest.navCtrl.navigateForward('/spa/schedule')
  // }

  // public async scheduleI() {
  //   this.rest.temp = {
  //     name: '',
  //     phone: '',
  //     note: '',
  //     image: [],
  //     time: this.time.timetoisodate(this.time.datetotime(this.rest.home.today) + 60 * 60 * 24 * 7 * 1000), 
  //     filter: this.rest.spa.search,
  //   }
  //   this.rest.navCtrl.navigateForward('/spa/schedule')
  // }

  // public near() {
  //   this.rest.navCtrl.navigateForward('/spa/near')
  // }

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
            this.returnedSubmit(index)
          }
        }
      ]
    });

    // if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async returnedSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'returned', {
      id: this.rest.spa.filter[index].id,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
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
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'remove', {
      id: this.rest.spa.filter[index].id,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
      this.rest.spa.init = resp.time
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành mục spa?',
      // inputs: this.option,
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(index)
            // this.doneSubmit(index, e)
          }
        }
      ]
    });

    // if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async doneSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'done', {
      id: this.rest.spa.filter[index].id,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
      this.rest.spa.init = resp.time
      // this.report(index)
    }, () => {
      this.rest.defreeze()
    })
  }

  public async pick(index: number) {
    let alert = await this.alert.create({
      message: 'Nhận mục spa này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.pickSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async pickSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'pick', {
      id: this.rest.spa.filter[index].id,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async picktrans(index: number) {
    let alert = await this.alert.create({
      message: 'Chuyển mục spa này cho nhân viên',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.picktransSubmit(index, e)
          }
        }
      ]
    });
    alert.inputs = this.option
    await alert.present();
  }

  public async picktransSubmit(index: number, uid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'picktrans', {
      id: this.rest.spa.filter[index].id,
      uid: uid,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
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
            this.calledSubmit(index)
          }
        }
      ]
    });

    // if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async calledSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'called', {
      id: this.rest.spa.filter[index].id,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
      this.rest.spa.init = resp.time
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chuyenngaunhien(index: number) {
    let alert = await this.alert.create({
      message: 'Mục spa sẽ được chuyển ngẫu nhiên cho người khác?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanchuyenngaunhien(index)
          }
        }
      ]
    });

    // if (this.rest.home.doctor.length && !this.rest.spa.list[index].duser.length) alert.inputs = this.option

    await alert.present();
  }

  public async xacnhanchuyenngaunhien(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'chuyenngaunhienspa', {
      id: this.rest.spa.filter[index].id,
      duserid: this.rest.spa.filter[index].duserid,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.search()
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

  public bieudo() {
    this.rest.navCtrl.navigateForward('/spa/bieudo')
  }

  // public report(index: number) {
  //   let item = this.rest.spa.list[index]
  //   this.rest.temp = {
  //     id: item.id,
  //     uid: item.duserid,
  //     status: item.status,
  //     image: item.dimage
  //   }
    
  //   this.rest.navCtrl.navigateForward('/spa/done')
  // }

  // public async updateSc(index: number) {
  //   let item = this.rest.spa.near[index]
  //   this.rest.temp = {
  //     id: item.id,
  //     name: item.name,
  //     phone: item.phone,
  //     note: item.note,
  //     image: item.image,
  //     time: this.time.datetoisodate(item.time), 
  //   }
  //   this.rest.navCtrl.navigateForward('/spa/schedule')
  // }
    
  // public async removeSc(id: number) {
  //   const alert = await this.alert.create({
  //     message: 'Xác nhận xóa lịch tái khám?',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.removeScSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeScSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   this.rest.checkpost('his', 'removesc', {
  //     id: id,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.spa.near = resp.list
  //     this.rest.spa.count = resp.count
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async pickDate() {
  //   let current = this.time.timetodate(this.rest.spa.time).split('/')
  //   let target = current[2] + '-' + current[1] + '-' + current[0]
  //   let alert = await this.alert.create({
  //     header: 'Chọn ngày',
  //     inputs: [
  //       {
  //         label: 'Ngày',
  //         name: 'date',
  //         type: 'date',
  //         value: target
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //         cssClass: 'default'
  //       }, {
  //         text: 'Chọn ngày',
  //         cssClass: 'secondary',
  //         handler: (e) => {
  //           let result = e.date.split('-')
  //           this.rest.spa.time = this.time.datetotime(result[2] + '/' + result[1] + '/' + result[0])
  //           this.filter()
  //         }
  //       }
  //     ]
  //   })
  //   alert.present()
  // }

  // public async changeDate(amount: number) {
  //   this.rest.spa.time += amount * 60 * 60 * 24 * 1000
  //   this.filter()
  // }
}
