import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage {
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public modal: ModalController
  ) { }

  public async ionViewDidEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    if (!this.rest.filter.vaccine.init) {
      this.rest.data.vaccine.list = []
      this.rest.data.vaccine.new = []
      await this.rest.freeze('Đang tải danh sách')
      this.filter().then(() => {
        this.rest.defreeze()
      })
    }
  }
  
  public filter() {
    return new Promise((resolve) => {
      this.rest.checkpost('vaccine', 'auto', { }).then(resp => {
        this.rest.filter.vaccine.init = true
        this.rest.data.vaccine.new = resp.new
        this.rest.data.vaccine.list = resp.list
        resolve('')
      }, () => {
        resolve('')
      })
    })
  }

  public filterModal() {
    this.rest.action = 'vaccine'
    this.rest.router.navigateByUrl('/modal/filter')
  }

  public insertModal() {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.action = 'vaccine'
      this.rest.temp = {
        name: '',
        phone: '',
        vaccine: '',
        cometime: '',
        calltime: ''
      }
      this.rest.router.navigateByUrl('/vaccine/insert')
    }
  }

  // public async onSegmentChange() {
  //   await this.rest.freeze('Đang tải danh sách')
  //   this.filter().then(() => {
  //     this.rest.defreeze()
  //   })
  // }

  
  public async changeStatus(id: number) {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
        header: 'Chú ý!!!',
        message: 'Vaccine sẽ chuyển sang tab khác',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'danger',
            handler: () => {
              this.changeStatusSubmit(id)
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  public async changeStatusSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'change', {
      id: id,
      status: this.rest.filter.vaccine.status
    }).then(resp => {
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.filter.vaccine.data = resp.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async note(index: number, id: number, text: string) {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      let alert = await this.alert.create({
        message: 'Chỉnh sửa ghi chú',
        inputs: [
          {
            type: 'text',
            name: 'note',
            value: text
          }
        ],
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'secondary',
            handler: (e) => {
              this.noteSubmit(id, index, e['note'])
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async noteSubmit(id: number, index: number, note: string) {
    await this.rest.freeze('Đang hoàn thành..')
    this.rest.checkpost('vaccine', 'note', {
      id: id,
      text: note,
      status: this.rest.filter.vaccine.status
    }).then(() => {
      this.rest.filter.vaccine.data[index].note = note
      this.rest.defreeze()
    }, () => [
    ])
  }
}
