import { Component, } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-vaccineinsert',
  templateUrl: './vaccineinsert.page.html',
  styleUrls: ['./vaccineinsert.page.scss'],
})
export class VaccineinsertPage {
  public init = false
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
      if (!this.rest.temp.id && !this.init) {
        this.init = true
        this.suggest()
      }      
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('/modal/suggest')
  }

  public async insertSubmit() {
    let msg = this.checkVaccineData()
    if (msg) this.rest.notify(msg)
    else {
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.checkpost('vaccine', 'insert', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.temp.vid = resp.vid
        this.rest.vaccine.list = resp.list
        this.rest.vaccine.new = resp.new
        this.rest.temp.ov = JSON.parse(JSON.stringify(this.rest.temp))
        if (this.rest.temp.route == 'new-history') this.rest.back()
        else if (resp.old.length) {
          this.rest.temp.list = resp.old
          this.rest.navCtrl.navigateForward('/vaccine/recall')
        }
        this.clear()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async insertVaccineHistorySubmit() {
    let msg = this.checkVaccineData()
    if (msg) this.rest.notify(msg)
    else {
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.checkpost('vaccine', 'inserthistory', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.vaccine.new = resp.new
        this.clear()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      message: 'Xóa lịch tiêm phòng?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeSubmit(this.rest.vaccine.new[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('vaccine', 'removevaccine', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.new = resp.new
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    this.rest.temp = {
      ppv: '1',
      id: this.rest.vaccine.new[index].id,
      name: this.rest.vaccine.new[index].name,
      phone: this.rest.vaccine.new[index].phone,
      address: this.rest.vaccine.new[index].address,
      petname: this.rest.vaccine.new[index].petname,
      typeid: this.rest.vaccine.new[index].typeid,
      cometime: this.time.datetoisodate(this.rest.vaccine.new[index].cometime),
      calltime: this.time.datetoisodate(this.rest.vaccine.new[index].calltime),
      note: this.rest.vaccine.new[index].note,
    }
  }

  public async updateSubmit() {
    this.rest.temp.keyword = this.rest.vaccine.keyword
    let msg = this.checkVaccineData()
    if (msg) this.rest.notify(msg)
    else {
      await this.rest.freeze('Cập nhật lịch nhắc...')
      this.rest.checkpost('vaccine', 'update', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.vaccine.list = resp.list
        this.rest.vaccine.new = resp.new
        if (this.rest.temp.ppv) this.clear()
        else this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public checkVaccineData() {
    if (!this.rest.temp.name.length) return 'Chưa nhập tên khách hàng'
    else if (!this.rest.temp.phone.length) return 'Chưa nhập số điện thoại'
    else if (!this.time.isisodate(this.rest.temp.cometime)) return 'Chưa nhập ngày đến'
    else if (!this.time.isisodate(this.rest.temp.calltime)) return 'Chưa nhập ngày nhắc lại'
    return false
  }

  public async updateHistorySubmit() {
    let msg = this.checkVaccineData()
    if (msg) this.rest.notify(msg)
    else {
      await this.rest.freeze('Cập nhật & xác nhận lịch nhắc...')
      this.rest.checkpost('vaccine', 'updatehistory', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.vaccine.temp = resp.list
        this.rest.temp.vid = this.rest.temp.id
        this.rest.temp.ov = JSON.parse(JSON.stringify(this.rest.temp))
        this.rest.back()
        if (resp.old.length) {
          this.rest.temp.list = resp.old
          this.rest.navCtrl.navigateForward('vaccine/recall')
        }
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public clear() {
    this.rest.temp.id = 0
    this.rest.temp.route = ''
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
    this.rest.temp.petname = ''
    this.rest.temp.note = ''
  }

  public inout(action: string) {
    this.rest.temp.action = action
    this.rest.navCtrl.navigateForward('/inout')
  }

  public changeNumber() {
    this.rest.temp.end = this.rest.temp.start - this.rest.temp.number
  }

  public async bloodInsert() {
    await this.rest.freeze('Đang thêm phiếu nhập...')
    this.rest.checkpost('blood', 'insert', {
      'number': this.rest.temp.number,
      'target': this.rest.temp.target,
    }).then(response => {
      this.rest.defreeze()
      this.rest.temp.number = 1
      this.rest.temp.total = Number(response.number)
      this.rest.temp.start = this.rest.temp.total
      this.rest.temp.end = this.rest.temp.total - 1
      this.rest.temp.target = ''
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
