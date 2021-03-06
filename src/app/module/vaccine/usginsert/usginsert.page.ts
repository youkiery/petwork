import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-usginsert',
  templateUrl: './usginsert.page.html',
  styleUrls: ['./usginsert.page.scss'],
})
export class UsginsertPage implements OnInit {
  public init = false
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('vaccine')
    else if (!this.rest.temp.id && !this.init) {
      this.init = true
      this.suggest()
    }
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('/modal/suggest')
  }

  public async insertUsgSubmit() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('usg', 'insert', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.usg.new = resp.new
        this.rest.usg.list = resp.list
        this.usgCal()
        this.clear()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public usgCal() {
    for (let i = 0; i < 3; i++) {
      this.rest.usg.uncalled[i] = this.rest.usg.list[i].filter((item: any) => {
        return item.over == 1
      }).length
    }
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      message: 'Xóa lịch siêu âm?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeUsgSubmit(this.rest.usg.new[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeUsgSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'remove', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.new = resp.new
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    let item = this.rest.usg.new[index]
    this.rest.temp = {
      id: item.id,
      number: item.number,
      name: item.name,
      phone: item.phone,
      address: item.address,
      cometime: this.time.datetoisodate(item.cometime),
      calltime: this.time.datetoisodate(item.calltime),
      note: item.note,
      keyword: this.rest.vaccine.keyword
    }
  }

  public async updateUsgSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.temp.filter = this.rest.vaccine.keyword
    this.rest.checkpost('usg', 'update', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.usg.new = resp.new
      this.rest.usg.list = resp.list
      this.usgCal()
      this.clear()
      if (this.rest.temp.route) this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateHistorySubmit() {
    let msg = this.checkusgData()
    if (msg) this.rest.notify(msg)
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('usg', 'updatehistory', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.usg.temp = resp.list
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public checkusgData() {
    if (!this.rest.temp.name.length) return 'Chưa nhập tên khách hàng'
    else if (!this.rest.temp.phone.length) return 'Chưa nhập số điện thoại'
    else if (!this.time.isisodate(this.rest.temp.cometime)) return 'Chưa nhập ngày đến'
    else if (!this.time.isisodate(this.rest.temp.calltime)) return 'Chưa nhập ngày nhắc lại'
    return false
  }

  public clear() {
    this.rest.temp.id = 0
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
    this.rest.temp.address = ''
    this.rest.temp.number = 0
  }

}
