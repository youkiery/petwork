import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage {
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
    3: 'Đã tái chủng',
    4: 'Không tái chủng',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card yellow',
    2: 'stl-card green',
    3: 'stl-card green',
    4: 'stl-card red',
  }
  public uheader = {
    0: 'Nhắc tiêm phòng trước salơ',
    1: 'Nhắc test Progesterone',
    2: '1 tuần trước sinh',
    3: '1 ngày sau sinh',
    4: 'Nhắc sổ giun',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã nhắc tiêm vaccine',
    7: 'Đã hoàn thành',
    8: 'Không theo dõi nữa',
    9: 'Phiếu tạm',
  }
  public ustatus = {
    0: 'stl-card white',
    1: 'stl-card red',
  }
  public usubheader = {
    0: 'Xác nhận gọi nhắc tiêm phòng trước salơ, phiếu nhắc test progesterone sẽ hiện lại sau 1 tháng nữa',
    1: '',
    2: 'Xác nhận tư vấn trước sinh, phiếu nhắc sinh sẽ hiện lại 1 ngày sau khi sinh',
    3: 'Xác nhận đã sinh, phiếu nhắc xổ giun lần 1 sẽ hiện lại 5 tuần sau khi sinh',
    4: 'Xác nhận đã xổ giun, phiếu nhắc tiêm phòng sẽ hiện lại sau 1 tuần',
    5: 'Xác nhận đã tiêm vaccine',
  }
  public segment = '0'
  public key = ''
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'vaccine'
      if (!this.rest.vaccine.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'auto', {
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      time: this.rest.vaccine.time,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.init = true
      this.rest.usg.new = resp.usg.new
      this.rest.usg.list = resp.usg.list
      this.rest.usg.temp = resp.usg.temp
      this.rest.vaccine.new = resp.vaccine.new
      this.rest.vaccine.list = resp.vaccine.list
      this.vacCal()
      this.rest.vaccine.temp = resp.vaccine.temp
      this.rest.vaccine.over = resp.vaccine.over
    }, () => {
      this.rest.defreeze()
    })
  }

  public vacCal() {
    this.rest.vaccine.uncalled = this.rest.vaccine.list[0].filter((item: any) => {
      return item.over == 1
    }).length
  }

  public async search() {
    if (!this.rest.vaccine.keyword.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost(this.rest.vaccine.type, 'searchcustomer', {
        keyword: this.rest.vaccine.keyword,
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
        time: this.rest.vaccine.time,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
        this.rest.action = this.rest.vaccine.type
        if (this.rest.vaccine.type == 'vaccine') this.rest.navCtrl.navigateForward('/vaccine/search')
        else this.rest.navCtrl.navigateForward('/vaccine/usearch')
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public cleardocs() {
    this.rest.home.default.docs = []
    this.rest.home.default.docscover = ''
    this.filter()
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'filter', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.page = 1
      this.rest[this.rest.vaccine.type].list = resp.list
      if (this.rest.vaccine.type == 'vaccine') this.vacCal()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filterR(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'filter', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest[this.rest.vaccine.type].list = resp.list
      if (this.rest.vaccine.type == 'vaccine') this.vacCal()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public vaccined() {
    this.rest.temp = {
      start: this.rest.home.month.start,
      end: this.rest.home.month.end,
      list: []
    }
    this.rest.navCtrl.navigateForward('/vaccine/d')
  }

  public async docs() {
    let option = []
    this.rest.home.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.home.default.docs.indexOf(item.userid) >= 0 ? true : false)
      })
    })
    const alert = await this.alert.create({
      header: 'Lọc nhân viên',
      inputs: option,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (e) => {
            let cover = []
            let docs = []
            e.forEach((index: number) => {
              cover.push(this.rest.home.doctor[index].name)
              docs.push(this.rest.home.doctor[index].userid)
            });

            this.rest.home.default.docs = docs
            this.rest.home.default.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public insert() {
    this.rest.action = 'vaccine'

    if (this.rest.action == 'vaccine') {
      this.rest.temp = {
        id: 0,
        petname: '',
        name: '',
        phone: '',
        address: '',
        typeid: (this.rest.home.type.length ? this.rest.home.type[0].id : '0'),
        cometime: this.time.datetoisodate(this.rest.home.today),
        calltime: this.time.datetoisodate(this.rest.home.next),
        note: '',
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover
      }
    }
    else {
      this.rest.temp = {
        id: 0,
        number: 0,
        name: '',
        phone: '',
        address: '',
        cometime: this.time.datetoisodate(this.rest.home.today),
        calltime: this.time.datetoisodate(this.rest.home.next),
        note: '',
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
      }
    }
    if (this.rest.vaccine.type == 'vaccine') this.rest.navCtrl.navigateForward('/vaccine/insert')
    else this.rest.navCtrl.navigateForward('/vaccine/uinsert')
  }

  public update(index: number) {
    this.rest.action = this.rest.vaccine.type
    let item = this.rest[this.rest.vaccine.type].list[this.segment][index]
    if (this.rest.vaccine.type == 'vaccine') {
      this.rest.temp = {
        id: item.id,
        petname: item.petname,
        name: item.name,
        phone: item.phone,
        address: item.address,
        typeid: item.typeid,
        cometime: this.time.datetoisodate(item.cometime),
        calltime: this.time.datetoisodate(item.calltime),
        note: item.note,
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
      }
    }
    else {
      this.rest.temp = {
        route: true,
        id: item.id,
        number: item.number,
        name: item.name,
        phone: item.phone,
        address: item.address,
        cometime: this.time.datetoisodate(item.cometime),
        calltime: this.time.datetoisodate(item.calltime),
        note: item.note,
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
      }
    }
    if (this.rest.vaccine.type == 'vaccine') this.rest.navCtrl.navigateForward('/vaccine/insert')
    else this.rest.navCtrl.navigateForward('/vaccine/uinsert')
  }

  public async called(index: number) {
    let note = ''
    let id = 0
    id = this.rest.vaccine.list[this.segment][index].id
    note = this.rest.vaccine.list[this.segment][index].note

    const alert = await this.alert.create({
      header: 'Xác nhận Đã gọi',
      subHeader: 'Đã gọi khách hàng, xác nhận?',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'called', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.list = resp.list
      this.vacCal()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uncalled(index: number) {
    let note = ''
    let id = 0
    id = this.rest.vaccine.list[this.segment][index].id
    note = this.rest.vaccine.list[this.segment][index].note

    const alert = await this.alert.create({
      header: 'Xác nhận Không gọi được',
      subHeader: 'Đã gọi nhưng khách không nghe máy, xác nhận?',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        label: 'Ghi chú',
        name: 'note',
        value: note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.uncalledSubmit(id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async uncalledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'uncalled', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.list = resp.list
      this.vacCal()
    }, () => {
      this.rest.defreeze()
    })
  }

  public loaitru() {
    this.rest.navCtrl.navigateForward('/vaccine/loaitru')
  }

  public async xacnhandanhsachloaitru(index: number) {
    let id = this.rest.vaccine.list[this.segment][index].customerid

    const alert = await this.alert.create({
      header: 'Xác nhận loại trừ',
      subHeader: 'Khách đưa vào danh sách loại trừ sẽ không nhắc nữa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.danhsachloaitru(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async danhsachloaitru(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'loaitru', {
      id: id,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uuncalled(index: number) {
    let note = ''
    let id = 0
    id = this.rest.usg.list[this.segment][index].id
    note = this.rest.usg.list[this.segment][index].note

    const alert = await this.alert.create({
      header: 'Xác nhận Không gọi được',
      subHeader: 'Đã gọi nhưng khách không nghe máy, xác nhận?',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        label: 'Ghi chú',
        name: 'note',
        value: note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.uuncalledSubmit(id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async uuncalledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'uncalled', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let id = 0
    id = this.rest.vaccine.list[this.segment][index].id

    const alert = await this.alert.create({
      header: 'Xác nhận tiêm phòng',
      subHeader: 'Khách đã tiêm phòng, lịch sẽ không nhắc lại nữa, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'done', {
      id: id,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.vaccine.list = resp.list
      this.vacCal()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    let note = ''
    let id = 0
    id = this.rest.vaccine.list[this.segment][index].id
    note = this.rest.vaccine.list[this.segment][index].note

    const alert = await this.alert.create({
      header: 'Xác nhận khách không tiêm phòng',
      subHeader: 'Khách không tiêm phòng, lịch sẽ không nhắc lại nữa, xác nhận?',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'dead', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.vaccine.list = resp.list
      this.vacCal()
    }, () => {
      this.rest.defreeze()
    })
  }

  public manager() {
    this.rest.temp = {}
    this.rest.action = 'temp'
    this.rest.navCtrl.navigateForward('/vaccine/manager')
  }

  public async birth(index: number) {
    let target = this.time.datetoisodate(this.rest.usg.list[this.segment][index].calltime)
    let deworm = this.time.timetoisodate(this.time.datetotime(this.rest.usg.list[this.segment][index].calltime) + 60 * 60 * 24 * 7 * 5 * 1000)
    let item = this.rest.usg.list[this.segment][index]
    this.rest.temp = {
      id: item.id,
      number: item.number,
      calltime: target,
      deworm: deworm,
      vaccine: '',
      repregnant: '',
      note: item.note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }

    this.rest.navCtrl.navigateForward('/vaccine/birth')
  }

  // public async ucalled(index: number) {
  //   const alert = await this.alert.create({
  //     header: this.uheader[this.rest.usg.list[this.segment][index].status],
  //     subHeader: this.usubheader[this.rest.usg.list[this.segment][index].status],
  //     inputs: [{
  //       type: 'text',
  //       name: 'note',
  //       value: this.rest.usg.list[this.segment][index].note,
  //       placeholder: 'Ghi chú'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.ucalledSubmit(this.rest.usg.list[this.segment][index].id, e.note)
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // public async ucalledSubmit(id: number, note: string) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('usg', 'called', {
  //     id: id,
  //     note: note,
  //     time: this.rest.usg.time,
  //     docs: this.rest.home.default.docs,
  //     docscover: this.rest.home.default.docscover,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.usg.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async deworm(index: number) {
  //   let deworm = this.time.timetodate(this.time.datetotime(this.rest.home.today) + 60 * 60 * 24 * 7 * 1000).split('/')
  //   let target = deworm[2] + '-' + deworm[1] + '-' + deworm[0]
    
  //   const alert = await this.alert.create({
  //     header: this.uheader[this.rest.usg.list[this.segment][index].status],
  //     subHeader: this.usubheader[this.rest.usg.list[this.segment][index].status],
  //     inputs: [{
  //       type: 'text',
  //       name: 'note',
  //       value: this.rest.usg.list[this.segment][index].note,
  //       placeholder: 'Ghi chú'
  //     },
  //     {
  //       type: 'date',
  //       name: 'time',
  //       value: target,
  //       placeholder: 'Ngày nhắc'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.dewormSubmit(this.rest.usg.list[this.segment][index].id, e.note, e.time)
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // public async dewormSubmit(id: number, note: string, time: string) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('usg', 'deworm', {
  //     id: id,
  //     note: note,
  //     deworm: time,
  //     time: this.rest.usg.time,
  //     docs: this.rest.home.default.docs,
  //     docscover: this.rest.home.default.docscover,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.usg.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  public async udead(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận không theo dõi',
      subHeader: 'Sau khi xác nhận phiếu siêu âm sẽ không nhắc lại nữa',
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.usg.list[this.segment][index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.udeadSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async udeadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'dead', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  // public async udone(index: number) {
  //   const alert = await this.alert.create({
  //     header: 'Xác nhận đã hoàn thành',
  //     subHeader: 'Sau khi xác nhận phiếu siêu âm sẽ không nhắc lại nữa',
  //     inputs: [{
  //       type: 'text',
  //       name: 'note',
  //       value: this.rest.usg.list[this.segment][index].note,
  //       placeholder: 'Ghi chú'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.udoneSubmit(this.rest.usg.list[this.segment][index].id, e.note)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async udoneSubmit(id: number, note: string = '') {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('usg', 'done', {
  //     id: id,
  //     note: note,
  //     time: this.rest.usg.time,
  //     docs: this.rest.home.default.docs,
  //     docscover: this.rest.home.default.docscover,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.usg.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async progesterone(index: number) {
  //   const alert = await this.alert.create({
  //     header: 'Xác nhận đã hoàn thành',
  //     subHeader: 'Sau khi xác nhận phiếu siêu âm sẽ không nhắc lại nữa',
  //     inputs: [{
  //       type: 'text',
  //       name: 'note',
  //       value: this.rest.usg.list[this.segment][index].note,
  //       placeholder: 'Ghi chú'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.progesteroneSubmit(this.rest.usg.list[this.segment][index].id, e.note)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async progesteroneSubmit(id: number, note: string = '') {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('usg', 'done', {
  //     id: id,
  //     note: note,
  //     time: this.rest.usg.time,
  //     docs: this.rest.home.default.docs,
  //     docscover: this.rest.home.default.docscover,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.usg.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async repregnant(index: number) {
  //   const alert = await this.alert.create({
  //     header: 'Xác nhận thai đã chết',
  //     subHeader: 'Thai đã chết nhưng vẫn nhắc lại 5 tháng sau có thể phối',
  //     inputs: [{
  //       type: 'text',
  //       name: 'note',
  //       value: this.rest.usg.list[this.segment][index].note,
  //       placeholder: 'Ghi chú'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.repregnantSubmit(this.rest.usg.list[this.segment][index].id, e.note)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  public statis() {
    this.rest.navCtrl.navigateForward('/vaccine/statis')
  }

  // public async repregnantSubmit(id: number, note: string = '') {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('usg', 'repregnant', {
  //     id: id,
  //     note: note,
  //     time: this.rest.usg.time,
  //     docs: this.rest.home.default.docs,
  //     docscover: this.rest.home.default.docscover,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.usg.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
