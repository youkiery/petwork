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
      this.key = this.rest.vaccine.keyword
      if (!this.rest.vaccine.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('vaccine', 'auto', {
      docs: this.rest.vaccine.docs,
      time: this.rest.vaccine.time,
    }).then(resp => {
      this.rest.vaccine.init = true
      this.rest.vaccine.new = resp.new
      this.rest.vaccine.list = resp.list
      this.rest.vaccine.type = resp.type
      this.rest.vaccine.temp = resp.temp
      this.rest.vaccine.over = resp.over
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('vaccine', 'search', {
      keyword: this.key,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then(resp => {
      this.page = 1
      this.rest.vaccine.keyword = this.key
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public moreVaccine(event: any) {
    this.page ++
    event.target.complete()
  }

  public async filterR(event: any) {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('vaccine', 'search', {
      keyword: this.key,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then(resp => {
      event.target.complete();
      this.rest.vaccine.keyword = this.key
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
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
        checked: (this.rest.vaccine.docs.indexOf(item.userid) >= 0 ? true : false)
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
            
            this.rest.vaccine.docs = docs
            this.rest.vaccine.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public insert() {
    this.rest.action = 'vaccine'

    this.rest.temp = { id: 0, petname: '', name: '', phone: '', address: '', typeid: (this.rest.vaccine.type.length ? this.rest.vaccine.type[0].id : '0'), cometime: this.time.datetoisodate(this.rest.home.today), calltime: this.time.datetoisodate(this.rest.home.next), note: '' }
    this.rest.navCtrl.navigateForward('/modal/insert')
  }

  public update(index: number) {
    this.rest.action = 'vaccine'
    let item = this.rest.vaccine.list[this.segment][index]
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
    this.rest.navCtrl.navigateForward('/modal/insert')
  }

  public async called(index: number) {
    let note = ''
    let id = 0
    if (this.key) {
      id = this.rest.vaccine.list[index].id
      note = this.rest.vaccine.list[index].note
    }
    else {
      id = this.rest.vaccine.list[this.segment][index].id
      note = this.rest.vaccine.list[this.segment][index].note
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
    this.rest.checkpost('vaccine', 'called', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then(resp => {
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uncalled(index: number) {
    let note = ''
    let id = 0
    if (this.key) {
      id = this.rest.vaccine.list[index].id
      note = this.rest.vaccine.list[index].note
    }
    else {
      id = this.rest.vaccine.list[this.segment][index].id
      note = this.rest.vaccine.list[this.segment][index].note
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
    this.rest.checkpost('vaccine', 'uncalled', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then(resp => {
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let id = 0
    if (this.key) {
      id = this.rest.vaccine.list[index].id
    }
    else {
      id = this.rest.vaccine.list[this.segment][index].id
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
    this.rest.checkpost('vaccine', 'done', {
      id: id,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then((resp) => {
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    let note = ''
    let id = 0
    if (this.key) {
      id = this.rest.vaccine.list[index].id
      note = this.rest.vaccine.list[index].note
    }
    else {
      id = this.rest.vaccine.list[this.segment][index].id
      note = this.rest.vaccine.list[this.segment][index].note
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
    this.rest.checkpost('vaccine', 'dead', {
      id: id,
      note: note,
      keyword: this.rest.vaccine.keyword,
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then((resp) => {
      this.rest.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public manager() {
    this.rest.temp = {}
    this.rest.action = 'temp'
    this.rest.navCtrl.navigateForward('vaccine/manager')
  }

  public refresh(event: any) {
    this.rest.vaccine.init = false
    this.init().then(() => {
      event.target.complete();
    })
  }
}
