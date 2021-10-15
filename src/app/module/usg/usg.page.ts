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
  public segment = '0'
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'usg'
      this.rest.usg.key = this.rest.usg.keyword
      if (!this.rest.usg.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'auto', {
      docs: this.rest.usg.docs,
      time: this.rest.usg.time,
    }).then(resp => {
      this.rest.usg.init = true
      this.rest.usg.new = resp.new
      this.rest.usg.list = resp.list
      // this.rest.usg.type = resp.type
      // this.rest.usg.temp = resp.temp
      // this.rest.usg.doctor = resp.doctor
      // this.rest.usg.over = resp.over
      this.rest.defreeze()
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
        this.rest.navCtrl.navigateForward('usg/usgsearch')
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      keyword: this.rest.usg.key,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.page = 1
      this.rest.usg.keyword = this.rest.usg.key
      this.rest.usg.list = resp.list
      this.rest.defreeze()
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
      keyword: this.rest.usg.key,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      event.target.complete();
      this.rest.usg.keyword = this.rest.usg.key
      this.rest.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async docs() {
    let option = []
    this.rest.vaccine.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.usg.docs.indexOf(item.userid) >= 0 ? true : false)
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
              cover.push(this.rest.usg.doctor[index].name)
              docs.push(this.rest.usg.doctor[index].userid)
            });
            
            this.rest.usg.docs = docs
            this.rest.usg.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public insert() {
    this.rest.temp = { id: 0, number: 0, name: '', phone: '', address: '', cometime: this.time.datetoisodate(this.rest.home.today), calltime: this.time.datetoisodate(this.rest.home.next), note: '' }
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public update(index: number) {
    let item = this.rest.usg.list[this.segment][index]
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
    }
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public async called(index: number) {
    let note = ''
    let id = 0
    if (this.rest.usg.key) {
      id = this.rest.usg.list[index].id
      note = this.rest.usg.list[index].note
    }
    else {
      id = this.rest.usg.list[this.segment][index].id
      note = this.rest.usg.list[this.segment][index].note
    }
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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'called', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.rest.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uncalled(index: number) {
    let note = ''
    let id = 0
    if (this.rest.usg.key) {
      id = this.rest.usg.list[index].id
      note = this.rest.usg.list[index].note
    }
    else {
      id = this.rest.usg.list[this.segment][index].id
      note = this.rest.usg.list[this.segment][index].note
    }
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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'uncalled', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.rest.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let id = 0
    if (this.rest.usg.key) {
      id = this.rest.usg.list[index].id
    }
    else {
      id = this.rest.usg.list[this.segment][index].id
    }

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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'done', {
      id: id,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then((resp) => {
      this.rest.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    let note = ''
    let id = 0
    if (this.rest.usg.key) {
      id = this.rest.usg.list[index].id
      note = this.rest.usg.list[index].note
    }
    else {
      id = this.rest.usg.list[this.segment][index].id
      note = this.rest.usg.list[this.segment][index].note
    }

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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'dead', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then((resp) => {
      this.rest.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public manager() {
    this.rest.temp = {}
    this.rest.navCtrl.navigateForward('usg/manager')
  }

  public refresh(event: any) {
    this.rest.usg.init = false
    this.init().then(() => {
      event.target.complete();
    })
  }
}
