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

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.root()
    if ((this.rest.action == 'vaccine' || this.rest.action == 'usg') && !this.rest.temp.id && !this.init) {
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
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.checkpost('usg', 'insert', this.rest.temp).then(resp => {
        this.rest.usg.new = resp.new
        this.clear()
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
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
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('usg', 'remove', {
      id: id
    }).then(resp => {
      this.rest.usg.new = resp.new
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.usg.new[index].id,
      name: this.rest.usg.new[index].name,
      phone: this.rest.usg.new[index].phone,
      address: this.rest.usg.new[index].address,
      cometime: this.time.datetoisodate(this.rest.usg.new[index].cometime),
      calltime: this.time.datetoisodate(this.rest.usg.new[index].calltime),
      number: this.rest.usg.new[index].number,
      note: this.rest.usg.new[index].note,
    }
  }

  public async updateUsgSubmit() {
    await this.rest.freeze('Thêm lịch nhắc...')
    this.rest.temp.filter = this.rest.usg.keyword
    this.rest.checkpost('usg', 'update', this.rest.temp).then(resp => {
      this.rest.usg.new = resp.new
      this.rest.usg.list = resp.list
      this.rest.defreeze()
      this.clear()
      if (this.rest.usg.keyword) this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public clear() {
    this.rest.temp.id = 0
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
    this.rest.temp.address = ''
    this.rest.temp.number = 0
  }

}
