import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usg',
  templateUrl: './usg.page.html',
  styleUrls: ['./usg.page.scss'],
})
export class UsgPage {

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
    if (!this.rest.data.usg.init) {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('usg', 'auto', { }).then(resp => {
        this.rest.data.usg.init = true
        this.rest.data.usg.new = resp.new
        this.rest.data.usg.list = resp.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  // public async birth(id: number) {
  //   let alert = await this.alert.create({
  //     message: 'Số lượng con sinh ra',
  //     inputs: [
  //       {
  //         type: 'number',
  //         name: 'number',
  //         value: 0
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Bỏ',
  //         role: 'cancel',
  //         cssClass: 'default'
  //       }, {
  //         text: 'Xác nhận',
  //         cssClass: 'secondary',
  //         handler: (e) => {
  //           this.birthSubmit(id, e['number'])
  //         }
  //       }
  //     ]
  //   })
  //   alert.present()
  // }

  // public async birthSubmit(id: number, number: number) {
  //   await this.rest.freeze('Đang hoàn thành...')
  //   this.rest.checkpost('usg', 'birth', {
  //     action: 'usg-birth',
  //     id: id,
  //     number: Number(number),
  //     keyword: this.rest.data.usg.filterKey,
  //     status: this.rest.data.usg.status
  //   }).then((response) => {
  //     this.rest.data.usg.data = response.data
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      filter: this.rest.data.usg.filter
    }).then(resp => {
      this.rest.data.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.rest.action = 'usg'
    this.rest.temp = { id: 0, name: '', phone: '', number: 0, cometime: this.rest.config.today, calltime: this.rest.config.next }
    this.rest.router.navigateByUrl('/modal/insert')
  }

  public update(index: number) {
    this.rest.action = 'usg'
    this.rest.temp = {
      id: this.rest.data.usg.list[index].id,
      name: this.rest.data.usg.list[index].name,
      phone: this.rest.data.usg.list[index].phone,
      usg: Number(this.rest.diseaseIndex(this.rest.data.usg.list[index].usg)),
      cometime: this.rest.data.usg.list[index].cometime,
      calltime: this.rest.data.usg.list[index].calltime,
      number: this.rest.data.usg.list[index].number,
    }
    this.rest.router.navigateByUrl('/modal/insert')
  }

  public async called(index: number) {
    let note = 'Gọi nhắc ngày: ' + this.rest.config.today
    if (this.rest.data.usg.list[index].note.length) note = this.rest.data.usg.list[index].note
    const alert = await this.alert.create({
      message: 'Đã gọi khách hàng này?',
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
    this.rest.checkpost('usg', 'called', {
      id: this.rest.data.usg.list[index].id,
      note: note,
      filter: this.rest.data.usg.filter
    }).then(resp => {
      this.rest.data.usg.list = resp.list
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  
  public async uncalled(index: number) {
    let note = 'Gọi nhắc ngày: ' + this.rest.config.today
    if (this.rest.data.usg.list[index].note.length) note = this.rest.data.usg.list[index].note
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
    this.rest.checkpost('usg', 'uncalled', {
      id: this.rest.data.usg.list[index].id,
      note: note,
      filter: this.rest.data.usg.filter
    }).then(resp => {
      this.rest.data.usg.list = resp.list
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      message: 'Hoàn thành siêu âm, lịch nhắc sẽ không xuất hiện nữa',
      inputs: [{
        type: 'text',
        label: 'Ghi chú',
        name: 'number',
        value: this.rest.data.usg.list[index].number
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(index, e.number)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(index: number, number: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'dead', {
      id: this.rest.data.usg.list[index].id,
      number: number,
      filter: this.rest.data.usg.filter
    }).then((resp) => {
      this.rest.data.usg.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
