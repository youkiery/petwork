import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage {
  public status = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card yellow',
    3: 'stl-card red',
  }
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewDidEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    if (!this.rest.data.vaccine.init) {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('vaccine', 'auto', { }).then(resp => {
        this.rest.data.vaccine.init = true
        this.rest.data.vaccine.new = resp.new
        this.rest.data.vaccine.list = resp.list
        this.rest.data.vaccine.disease = resp.disease
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('vaccine', 'search', {
      filter: this.rest.data.vaccine.filter
    }).then(resp => {
      this.rest.data.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.rest.action = 'vaccine'
    this.rest.temp = { id: 0, name: '', phone: '', vaccine: 0, cometime: this.rest.config.today, calltime: this.rest.config.next }
    this.rest.router.navigateByUrl('/modal/insert')
  }

  public update(index: number) {
    this.rest.action = 'vaccine'
    this.rest.temp = {
      id: this.rest.data.vaccine.list[index].id,
      name: this.rest.data.vaccine.list[index].name,
      phone: this.rest.data.vaccine.list[index].phone,
      vaccine: Number(this.rest.diseaseIndex(this.rest.data.vaccine.list[index].vaccine)),
      cometime: this.rest.data.vaccine.list[index].cometime,
      calltime: this.rest.data.vaccine.list[index].calltime,
    }
    this.rest.router.navigateByUrl('/modal/insert')
  }

  public async called(index: number) {
    let note = 'Gọi nhắc ngày: ' + this.rest.config.today
    if (this.rest.data.vaccine.list[index].note.length) note = this.rest.data.vaccine.list[index].note
    const alert = await this.alert.create({
      message: 'Đã gọi khách hàng, lịch nhắc sẽ lặp lại sau 1 tuần',
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
            this.calledSubmit(index, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(index: number, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'called', {
      id: this.rest.data.vaccine.list[index].id,
      note: note,
      filter: this.rest.data.vaccine.filter
    }).then(resp => {
      this.rest.data.vaccine.list = resp.list
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uncalled(index: number) {
    let note = 'Gọi nhắc ngày: ' + this.rest.config.today
    if (this.rest.data.vaccine.list[index].note.length) note = this.rest.data.vaccine.list[index].note
    const alert = await this.alert.create({
      message: 'Đã gọi nhưng khách không bắt máy, mai gọi lại',
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
            this.uncalledSubmit(index, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async uncalledSubmit(index: number, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'uncalled', {
      id: this.rest.data.vaccine.list[index].id,
      note: note,
      filter: this.rest.data.vaccine.filter
    }).then(resp => {
      this.rest.data.vaccine.list = resp.list
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      message: 'Hoàn thành tiêm phòng, lịch nhắc sẽ không xuất hiện nữa',
      inputs: [{
        type: 'text',
        label: 'Ghi chú',
        name: 'note',
        value: this.rest.data.vaccine.list[index].note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(index, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(index: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'dead', {
      id: this.rest.data.vaccine.list[index].id,
      note: note,
      filter: this.rest.data.vaccine.filter
    }).then((resp) => {
      this.rest.data.vaccine.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
