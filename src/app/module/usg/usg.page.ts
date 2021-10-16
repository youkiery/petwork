import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-usg',
  templateUrl: './usg.page.html',
  styleUrls: ['./usg.page.scss'],
})
export class UsgPage {
  public status_text = {
    0: 'Nhắc tới ngày sa lơ',
    1: 'Tư vấn trước sinh',
    2: 'Ngày sinh',
    3: 'Nhắc sổ giun lần 1',
    4: 'Nhắc sổ giun lần 2',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã hoàn thành',
    7: 'Không theo dõi nữa',
    8: 'Phiếu tạm',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card red',
  }
  public header = {
    0: 'Đã hẹn nhắc sa lơ',
    1: 'Tư vấn trước sinh',
    2: 'Ngày sinh',
    3: 'Nhắc sổ giun lần 1',
    4: 'Nhắc sổ giun lần 2',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã hoàn thành',
    7: 'Không theo dõi nữa',
    8: 'Phiếu tạm',
  }
  public subheader = {
    0: 'Xác nhận gọi nhắc salơ, phiếu nhắc sẽ được đánh dấu là đã hoàn thành',
    1: 'Xác nhận tư vấn trước sinh, phiếu nhắc sinh sẽ hiện lại 1 ngày sau khi sinh',
    2: 'Xác nhận đã sinh, phiếu nhắc xổ giun sẽ hiện lại 3 tuần sau khi sinh',
    3: 'Xác nhận xổ giun lần 1, phiếu nhắc xổ giun lần 2 sẽ hiện lại 5 tuần sau khi sinh',
    4: 'Xác nhận xổ giun lần 2, phiếu nhắc tiêm phòng sẽ hiện lại 6 tuần sau khi sinh',
  }
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'usg'
      this.rest.usg.key = this.rest.usg.keyword
      if (!this.rest.usg.init) this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'auto', {
      keyword: this.rest.usg.key,
      docs: this.rest.usg.docs,
      time: this.rest.usg.time,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.init = true
      this.rest.usg.new = resp.new
      this.rest.usg.list = resp.list
      // this.rest.usg.type = resp.type
      this.rest.usg.temp = resp.temp
      // this.rest.usg.over = resp.over
    }, () => {
      this.rest.defreeze()
    })
  }

  public async search() {
    if (!this.rest.usg.key.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('usg', 'searchcustomer', {
        keyword: this.rest.usg.key
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
        this.rest.navCtrl.navigateForward('usg/search')
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      keyword: this.rest.usg.key,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.rest.defreeze()
      this.page = 1
      this.rest.usg.keyword = this.rest.usg.key
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public moreusg(event: any) {
    this.page ++
    event.target.complete()
  }

  public async filterR(event: any) {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('usg', 'search', {
      keyword: this.rest.usg.key,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      event.target.complete();
      this.rest.defreeze()
      this.page = 1
      this.rest.usg.keyword = this.rest.usg.key
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async docs() {
    let option = []
    this.rest.home.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.usg.docs.indexOf(item.userid) >= 0 ? true : false)
      })
    })
    const alert = await this.alert.create({
      header: 'Lọc nhân viên',
      inputs: option,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (e) => {
            let cover = []
            let docs = []
            e.forEach((index: number) => {
              cover.push(this.rest.home.doctor[index].name)
              docs.push(this.rest.home.doctor[index].userid)
            });
            
            this.rest.usg.docs = docs
            this.rest.usg.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public insert() {
    this.rest.temp = { id: 0, number: 0, name: '', phone: '', address: '', cometime: this.time.datetoisodate(this.rest.home.today), calltime: this.time.datetoisodate(this.rest.home.next), note: '' }
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public update(index: number) {
    let item = this.rest.usg.list[index]
    this.rest.temp = {
      id: item.id,
      petname: item.petname,
      name: item.name,
      phone: item.phone,
      address: item.address,
      typeid: item.typeid,
      cometime: this.time.datetoisodate(item.cometime),
      calltime: this.time.datetoisodate(item.calltime),
      note: item.note,
    }
    this.rest.navCtrl.navigateForward('/usg/insert')
  }

  public async called(index: number) {
    const alert = await this.alert.create({
      header: this.header[this.rest.usg.list[index].status],
      subHeader: this.subheader[this.rest.usg.list[index].status],
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.usg.list[index].note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(this.rest.usg.list[index].id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'called', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận không theo dõi',
      subHeader: 'Sau khi xác nhận phiếu siêu âm sẽ không nhắc lại nữa',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.usg.list[index].note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(this.rest.usg.list[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'dead', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public manager() {
    this.rest.temp = {}
    this.rest.navCtrl.navigateForward('usg/manager')
  }
}
