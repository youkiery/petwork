import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage {
  public prv = ''
  public input: any = {}
  public list = []
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card',
    2: 'stl-card yellow',
  }
  public name = 'Chưa chọn file'
  public toggle = false
  public selected = {}
  public segment = "0"
  public option = []
  public option2 = []
  public page = 1
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action) this.rest.navCtrl.navigateBack('/vaccine')
    else {
      if (this.rest.temp && this.rest.temp.prv && this.rest.temp.prv.length) this.rest.action = this.rest.temp.prv
      this.rest.home.doctor.forEach((item, index) => {
        this.option.push({
          name: 'userid',
          type: 'radio',
          label: item.name,
          value: item.userid,
          checked: (this.rest.home.userid == item.userid ? true : false)
        })
      });
    }
  }

  public async docs() {
    let option = []
    this.rest.home.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.home.default.docs.indexOf(item.userid) >= 0 ? true : false)
      })
    })
    const alert = await this.alert.create({
      header: 'Lọc nhân viên',
      inputs: option,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (e) => {
            let cover = []
            let docs = []
            e.forEach((index: number) => {
              cover.push(this.rest.home.doctor[index].name)
              docs.push(this.rest.home.doctor[index].userid)
            });
            
            this.rest.home.default.docs = docs
            this.rest.home.default.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('vaccine', 'refresh', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.page = 1
      this.selected = {}
      this.toggle = false
      this.rest.vaccine.temp = resp.vaccine
      this.rest.usg.temp = resp.usg
    }, () => {
      this.rest.defreeze()
    })
  }

  public changeType() {
    this.selected = {}
    this.toggle = false
  }

  public selectbox(id: number) {
    if (this.toggle) {
      this.selected[id] = !this.selected[id]
    }
  }

  public getselectedid() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        list.push(this.rest[this.rest.vaccine.type].temp[this.segment][key].id)
      }
    }
    return list
  }

  public getselectedindex() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        if (this.selected[key]) list.push(key)
      }
    }
    return list
  }

  public async transferAll() {
    let list = this.getselectedid()
    if (!list.length) this.rest.notify('Chưa chọn danh sách')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận chuyển phiếu nhắc',
        subHeader: 'Tất cả phiếu nhắc được chọn sẽ được chuyển cho nhân viên dưới đây: ',
        inputs: this.option,
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (uid) => {
              if (!uid) this.rest.notify('Chưa chọn danh sách')
              else this.transferAllSubmit(list, uid)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async transferAllSubmit(list: any, uid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'transfer', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      list: list,
      uid: uid
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.rest[this.rest.vaccine.type].temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeAll() {
    let list = this.getselectedid()
    if (!list.length) this.rest.notify('Chưa chọn danh sách')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận xóa lịch nhắc',
        subHeader: 'Sau khi xác nhận lịch nhắc sẽ biến mất',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.removeAllSubmit(list)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async removeAllSubmit(list: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'removeall', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      list: list,
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.rest[this.rest.vaccine.type].temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doneAll() {
    let list = []
    let index = this.getselectedindex()
    
    index.forEach(item => {
      let citem = this.rest[this.rest.vaccine.type].temp[this.segment][item]
      if (!(!citem.name.length || !citem.phone.length || !this.time.isisodate(this.time.datetoisodate(citem.cometime)) || !this.time.isisodate(this.time.datetoisodate(citem.calltime)))) {
        list.push(citem.id)
      }
    });

    if (!list.length) this.rest.notify('Phiếu nhập thông tin lỗi')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận tất cả phiếu nhắc?',
        subHeader: 'Sau khi xác nhận, danh sách sẽ được chuyển vào lịch nhắc',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.doneAllSubmit(list)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async doneAllSubmit(list: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'doneall', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      list: list
    }).then(resp => {
      this.rest.defreeze()
      this.rest[this.rest.vaccine.type].temp = resp.list
      this.selected = {}
      this.segment = '1'
      this.rest.vaccine.init = false
      if (resp.old.length && this.rest.vaccine.type == 'vaccine') {
        
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    if (this.rest.vaccine.type == 'vaccine') {
      this.rest.action = 'vaccine'
      let item = JSON.parse(JSON.stringify(this.rest.vaccine.temp[this.segment][index])) 
      if (!item.calltime) item.calltime = this.time.timetoisodate(this.time.datetotime(item.cometime) + 60 * 60 * 24 * 21 * 1000)
      else item.calltime = this.time.datetoisodate(item.calltime)
      item.cometime = this.time.datetoisodate(item.cometime)
      this.rest.temp = {
        prv: 'temp',
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
        time: this.rest.vaccine.time,
        id: item.id,
        petname: item.petname,
        name: item.name,
        phone: item.phone,
        address: item.address,
        typeid: item.typeid,
        cometime: item.cometime,
        calltime: item.calltime,
        note: item.note,
      }
    }
    else {
      this.rest.action = 'usg'
      let item = JSON.parse(JSON.stringify(this.rest.usg.temp[this.segment][index]))
      if (!item.calltime) item.calltime = this.time.timetoisodate(this.time.datetotime(item.cometime) + 60 * 60 * 24 * 21 * 1000)
      else item.calltime = this.time.datetoisodate(item.calltime)
      item.cometime = this.time.datetoisodate(item.cometime)
      this.rest.temp = {
        prv: 'temp',
        docs: this.rest.home.default.docs,
        docscover: this.rest.home.default.docscover,
        time: this.rest.usg.time,
        id: item.id,
        name: item.name,
        phone: item.phone,
        address: item.address,
        number: item.number,
        cometime: item.cometime,
        calltime: item.calltime,
        note: item.note,
      }
    }    
    if (this.rest.vaccine.type == 'vaccine') this.rest.navCtrl.navigateForward('/vaccine/insert')
    else this.rest.navCtrl.navigateForward('/vaccine/uinsert')
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa lịch nhắc',
      subHeader: 'Sau khi xác nhận lịch nhắc sẽ biến mất',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(index)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'removetemp', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      id: this.rest[this.rest.vaccine.type].temp[this.segment][index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest[this.rest.vaccine.type].temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let data = this.rest[this.rest.vaccine.type].temp[this.segment][index]

    if (!data.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!data.phone.length) this.rest.notify('Chưa nhập số điện thoại')
    else if (!this.time.isisodate(this.time.datetoisodate(data.cometime))) this.rest.notify('Chưa nhập ngày đến')
    else if (!this.time.isisodate(this.time.datetoisodate(data.calltime))) this.rest.notify('Chưa nhập ngày nhắc lại')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận thêm lịch nhắc',
        subHeader: 'Sau khi xác nhận lịch nhắc sẽ hiển thị trên danh sách nhắc gọi',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.doneSubmit(data.id)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async doneSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost(this.rest.vaccine.type, 'confirm', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
      id: id,
      temp: 1
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.toggle = false
      this.rest[this.rest.vaccine.type].temp = resp.temp
      this.segment = '1'
      this.rest.vaccine.init = false
      if (this.rest.vaccine.type == 'vaccine' && resp.old.length) {
        this.rest.temp.list = resp.old
        this.rest.action = 'vaccine'
        this.rest.temp.prv = 'temp'
        this.rest.temp.ov = resp.ov
        this.rest.temp.ov = JSON.parse(JSON.stringify(this.rest.temp))
        this.rest.navCtrl.navigateForward('/vaccine/recall')
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reloadTemp(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost(this.rest.vaccine.type, 'tempauto', {
      time: this.rest.vaccine.time,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.toggle = false
      this.rest[this.rest.vaccine.type].temp = resp.list
      event.target.complete();
      this.page = 1
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public cleardocs() {
    this.rest.home.default.docs = []
    this.rest.home.default.docscover = ''
    this.filter()
  }
}
