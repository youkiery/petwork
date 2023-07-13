import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-vaccinesearch',
  templateUrl: './vaccinesearch.page.html',
  styleUrls: ['./vaccinesearch.page.scss'],
})
export class VaccinesearchPage {

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
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
  }

  public async search() {
    if (!this.rest.vaccine.keyword.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('vaccine', 'searchcustomer', {
        keyword: this.rest.vaccine.keyword,
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
        time: this.rest.vaccine.time,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async called(index: number) {
    let note = ''
    let id = 0
    id = this.rest.temp[index].id
    note = this.rest.temp[index].note
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
      docs: this.rest.home.default.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uncalled(index: number) {
    let note = ''
    let id = 0
    id = this.rest.temp[index].id
    note = this.rest.temp[index].note
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
      docs: this.rest.home.default.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let id = 0
    id = this.rest.temp[index].id

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
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    let note = ''
    let id = 0
    id = this.rest.temp[index].id
    note = this.rest.temp[index].note

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
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
