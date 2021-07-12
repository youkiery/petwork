import { Component } from '@angular/core';
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
    if (!this.rest.filter.vaccine.init) {
      this.rest.data.vaccine.list = []
      this.rest.data.vaccine.new = []
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('vaccine', 'auto', {}).then(resp => {
        this.rest.filter.vaccine.init = true
        this.rest.data.vaccine.new = resp.new
        this.rest.data.vaccine.list = resp.list
        this.rest.data.vaccine.disease = resp.disease
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public filter() {
    this.rest.action = 'vaccine'
    this.rest.router.navigateByUrl('/modal/filter')
  }

  public insert() {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.action = 'vaccine'
      this.rest.temp = { name: '', phone: '', vaccine: 0, cometime: this.rest.config.today, calltime: this.rest.config.next }
      this.rest.router.navigateByUrl('/modal/insert')
    }
  }

  public async called(index: number) {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
        message: 'Đã gọi khách hàng này?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.calledSubmit(index)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async calledSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'called', {
      id: this.rest.data.vaccine.list[index].id
    }).then(resp => {
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
        message: 'Lịch tiêm phòng này sẽ bị xóa?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.deadSubmit(index)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async deadSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'dead', {
      id: this.rest.data.vaccine.list[index].id
    }).then(() => {
      this.rest.notify('Đã xóa lịch tiêm phòng')
      this.rest.data.vaccine.list = this.rest.data.vaccine.list.filter((item, item_index) => {
        return index !== item_index
      })
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async note(index: number) {
    if (this.rest.config.module.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      let alert = await this.alert.create({
        message: 'Chỉnh sửa ghi chú',
        inputs: [
          {
            type: 'text',
            name: 'note',
            value: this.rest.data.vaccine.list[index].note
          }
        ],
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.noteSubmit(index, e['note'])
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async noteSubmit(index: number, note: string) {
    await this.rest.freeze('Đang hoàn thành..')
    this.rest.checkpost('vaccine', 'note', {
      id: this.rest.data.vaccine.list[index].id,
      note: note,
    }).then(() => {
      this.rest.data.vaccine.list[index].note = note
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
