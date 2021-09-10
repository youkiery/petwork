import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
  }

  public async insertAdmin(id: number) {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('admin', 'insert', {
      id: id,
      key: this.rest.temp.key
    }).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filterAdmin() {
    await this.rest.freeze('Đang lọc...')
    this.rest.checkpost('admin', 'filter', {
      key: this.rest.temp.key
    }).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggest() {
    this.rest.router.navigateByUrl('/modal/suggest')
  }

  public async insertSubmit() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.temp.disease = this.rest.data.vaccine.disease[this.rest.temp.vaccine].id
      this.rest.temp.vaccine = this.rest.data.vaccine.disease[this.rest.temp.vaccine].id
      this.rest.checkpost('vaccine', 'insert', this.rest.temp).then(resp => {
        this.rest.data.vaccine.new = resp.new
        if (resp.old.length) {
          this.rest.data.vaccine.old = resp.old
          this.rest.router.navigateByUrl('/modal/recall')
        }
        this.clear()
        this.rest.defreeze()
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
            this.removeSubmit(this.rest.data.vaccine.new[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('vaccine', 'remove', {
      id: id
    }).then(resp => {
      this.rest.data.vaccine.new = resp.new
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.data.vaccine.new[index].id,
      name: this.rest.data.vaccine.new[index].name,
      phone: this.rest.data.vaccine.new[index].phone,
      vaccine: Number(this.rest.diseaseIndex(this.rest.data.vaccine.new[index].vaccine)),
      cometime: this.rest.data.vaccine.new[index].cometime,
      calltime: this.rest.data.vaccine.new[index].calltime,
    }
  }

  public async updateSubmit() {
    await this.rest.freeze('Thêm lịch nhắc...')
    this.rest.temp.disease = this.rest.data.vaccine.disease[this.rest.temp.vaccine].id
    this.rest.temp.filter = this.rest.data.vaccine.filter
    this.rest.checkpost('vaccine', 'update', this.rest.temp).then(resp => {
      this.rest.data.vaccine.new = resp.new
      this.rest.data.vaccine.list = resp.list
      this.clear()
      this.rest.defreeze()
      if (this.rest.data.vaccine.filter) this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public clear() {
    this.rest.temp.id = 0
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
  }

  public async insertUsgSubmit() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.checkpost('usg', 'insert', this.rest.temp).then(resp => {
        this.rest.data.usg.new = resp.new
        if (resp.old.length) {
          this.rest.data.usg.old = resp.old
          this.rest.router.navigateByUrl('/modal/recall')
        }
        this.clear()
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }
  
  public async removeUsg(index: number) {
    const alert = await this.alert.create({
      message: 'Xóa lịch siêu âm?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeUsgSubmit(this.rest.data.usg.new[index].id)
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
      this.rest.data.usg.new = resp.new
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public updateUsg(index: number) {
    this.rest.temp = {
      id: this.rest.data.vaccine.new[index].id,
      name: this.rest.data.vaccine.new[index].name,
      phone: this.rest.data.vaccine.new[index].phone,
      cometime: this.rest.data.vaccine.new[index].cometime,
      calltime: this.rest.data.vaccine.new[index].calltime,
      number: this.rest.data.vaccine.new[index].number,
    }
  }

  public async updateUsgSubmit() {
    await this.rest.freeze('Thêm lịch nhắc...')
    this.rest.temp.filter = this.rest.data.usg.filter
    this.rest.checkpost('usg', 'update', this.rest.temp).then(resp => {
      this.rest.data.usg.new = resp.new
      this.rest.data.usg.list = resp.list
      this.clearUsg()
      this.rest.defreeze()
      if (this.rest.data.usg.filter) this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public clearUsg() {
    this.rest.temp.id = 0
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
    this.rest.temp.number = 0
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
      this.rest.temp.number = 1
      this.rest.temp.total = Number(response.number)
      this.rest.temp.start = this.rest.temp.total
      this.rest.temp.end = this.rest.temp.total - 1
      this.rest.temp.target = ''
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }
}
