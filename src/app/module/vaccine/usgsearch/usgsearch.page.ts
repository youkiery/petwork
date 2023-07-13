import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usgsearch',
  templateUrl: './usgsearch.page.html',
  styleUrls: ['./usgsearch.page.scss'],
})
export class UsgsearchPage {
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
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
  }

  public async search() {
    if (!this.rest.vaccine.keyword.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('usg', 'searchcustomer', {
        keyword: this.rest.vaccine.keyword,
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
        time: this.rest.usg.time,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
        this.page = 1
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async birth(index: number) {
    let current = this.rest.temp[index].calltime.split('/')
    let target = current[2] + '-' + current[1] + '-' + current[0]

    const alert = await this.alert.create({
      header: this.header[this.rest.temp[index].status],
      subHeader: this.subheader[this.rest.temp[index].status],
      inputs: [{
        type: 'number',
        name: 'number',
        value: this.rest.temp[index].number,
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
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.birthSubmit(this.rest.temp[index].id, e.number, e.calltime, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async birthSubmit(id: number, number: number, calltime: string, note: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'birth', {
      id: id,
      note: note,
      number: number,
      calltime: calltime,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async called(index: number) {
    const alert = await this.alert.create({
      header: this.header[this.rest.temp[index].status],
      subHeader: this.subheader[this.rest.temp[index].status],
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(this.rest.temp[index].id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'called', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.list
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
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(this.rest.temp[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'dead', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
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
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(this.rest.temp[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'done', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
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
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.progesteroneSubmit(this.rest.temp[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async progesteroneSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'done', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
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
        value: this.rest.temp[index].note,
        placeholder: 'Ghi chú'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.repregnantSubmit(this.rest.temp[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async repregnantSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'repregnant', {
      id: id,
      note: note,
      time: this.rest.usg.time,
      docs: this.rest.home.default.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public moreVaccine(event: any) {
    this.page ++
    event.target.complete()
  }
}
