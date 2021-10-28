import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-usg',
  templateUrl: './usg.page.html',
  styleUrls: ['./usg.page.scss'],
})
export class UsgPage {
  public segment = '0'
  public header = {
    0: 'Nhắc tiêm phòng trước salơ',
    1: 'Nhắc test Progesterone',
    2: 'Tư vấn trước sinh',
    3: 'Ngày sinh',
    4: 'Nhắc sổ giun lần 1',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã nhắc tiêm vaccine',
    7: 'Đã hoàn thành',
    8: 'Không theo dõi nữa',
    9: 'Phiếu tạm',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card red',
  }
  public subheader = {
    0: 'Xác nhận gọi nhắc tiêm phòng trước salơ, phiếu nhắc test progesterone sẽ hiện lại sau 1 tháng nữa',
    1: '',
    2: 'Xác nhận tư vấn trước sinh, phiếu nhắc sinh sẽ hiện lại 1 ngày sau khi sinh',
    3: 'Xác nhận đã sinh, phiếu nhắc xổ giun lần 1 sẽ hiện lại 5 tuần sau khi sinh',
    4: 'Xác nhận đã xổ giun, phiếu nhắc tiêm phòng sẽ hiện lại 6 tuần sau khi sinh',
    5: 'Xác nhận đã tiêm vaccine',
  }
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'usg'
      this.rest.usg.key = this.rest.usg.key
      if (!this.rest.usg.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'auto', {
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      time: this.rest.usg.time,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.init = true
      this.rest.usg.new = resp.new
      this.rest.usg.list = resp.list
      // this.rest.usg.type = resp.type
      this.rest.usg.temp = resp.temp
      // this.rest.usg.over = resp.over
    }, () => {
      this.rest.defreeze()
    })
  }

  public async search() {
    if (!this.rest.usg.key.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('usg', 'searchcustomer', {
        keyword: this.rest.usg.key
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
        this.rest.navCtrl.navigateForward('usg/search')
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
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.page = 1
      this.rest.usg.key = this.rest.usg.key
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public moreusg(event: any) {
    this.page ++
    event.target.complete()
  }

  public async filterR(event: any) {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      event.target.complete();
      this.rest.defreeze()
      this.page = 1
      this.rest.usg.key = this.rest.usg.key
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
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
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
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
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public update(index: number) {
    let item = this.rest.usg.list[this.segment][index]
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
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public async birth(index: number) {
    let current = this.rest.usg.list[this.segment][index].calltime.split('/')
    let target = current[2] + '-' + current[1] + '-' + current[0]

    const alert = await this.alert.create({
      header: this.header[this.rest.usg.list[this.segment][index].status],
      subHeader: this.subheader[this.rest.usg.list[this.segment][index].status],
      inputs: [{
        type: 'number',
        name: 'number',
        value: this.rest.usg.list[this.segment][index].number,
        placeholder: 'Số thai'
      },
      {
        type: 'date',
        name: 'calltime',
        value: target,
        placeholder: 'Ngày sinh'
      },
      {
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
            this.birthSubmit(this.rest.usg.list[this.segment][index].id, e.number, e.calltime, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async birthSubmit(id: number, number: number, calltime: string, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'birth', {
      id: id,
      note: note,
      number: number,
      calltime: calltime,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async called(index: number) {
    const alert = await this.alert.create({
      header: this.header[this.rest.usg.list[this.segment][index].status],
      subHeader: this.subheader[this.rest.usg.list[this.segment][index].status],
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
            this.calledSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'called', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
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
            this.deadSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
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

  public async done(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận đã hoàn thành',
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
            this.doneSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'done', {
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

  public async progesterone(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận đã hoàn thành',
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
            this.progesteroneSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async progesteroneSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'done', {
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

  public async repregnant(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận thai đã chết',
      subHeader: 'Thai đã chết nhưng vẫn nhắc lại 5 tháng sau có thể phối',
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
            this.repregnantSubmit(this.rest.usg.list[this.segment][index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async repregnantSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'repregnant', {
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

  public manager() {
    this.rest.temp = {}
    this.rest.navCtrl.navigateForward('usg/manager')
  }
}
