import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-his',
  templateUrl: './his.page.html',
  styleUrls: ['./his.page.scss'],
})
export class HisPage implements OnInit {
  public insult = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public insult_text = {
    0: 'Đang lưu bệnh',
    1: 'Đã ra viện',
    2: 'Đã chết'
  }
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.his.start = this.time.timetoisodate(this.time.datetotime(this.rest.home.today) - 60 * 60 * 24 * 21 * 1000)
      this.rest.his.end = this.time.datetoisodate(this.rest.home.today)
      if (!this.rest.his.init) {
        this.rest.action = 'his'
        this.filter()
      }
    })
  }

  public manager() {
    this.rest.navCtrl.navigateForward('his/manager')
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('his', 'filter', {
      start: this.rest.his.start,
      end: this.rest.his.end,
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.init = true
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public statistic() {
    this.rest.navCtrl.navigateForward('/his/statis')
  }

  public async insertDetail(i: number) {
    this.rest.temp = {
      index: i,
      id: this.rest.his.list[i].id,
      time: this.time.datetoisodate(this.rest.home.today),
      name: this.rest.his.list[i].customer,
      phone: this.rest.his.list[i].phone,
      pet: "",
      petid: this.rest.his.list[i].petid,
      eye: '',
      temperate: '',
      other: '',
      treat: '',
      start: this.rest.his.start,
      end: this.rest.his.end,
      status: Number(this.rest.his.list[i].status),
    }
    this.rest.navCtrl.navigateForward('his/insert')
  }

  public async insertHis(index: number) {
    const alert = await this.alert.create({
      message: 'Thêm tiền sử bệnh',
      inputs: [{
        name: 'his',
        label: 'Tiền sử',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertHisSubmit(index, e.his)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertHisSubmit(index: number, his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his', 'add', {
      petid: this.rest.his.list[index].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[index].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận lưu bệnh đã chết',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('his', 'dead', {
      id: this.rest.his.list[index].id,
    }).then((resp) => {
      this.rest.his.list[index].insult = resp.insult
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async return(index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận lưu bệnh xuất viện',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.returnSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async returnSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('his', 'returned', {
      id: this.rest.his.list[index].id,
    }).then((resp) => {
      this.rest.his.list[index].insult = resp.insult
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      message: 'Sau khi xóa hồ sơ sẽ biến mất vĩnh viễn',
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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('his', 'remove', {
      id: this.rest.his.list[index].id,
      start: this.rest.his.start,
      end: this.rest.his.end,
    }).then((resp) => {
      this.rest.his.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public view(i: number) {
    this.rest.id = i
    this.rest.detail = this.rest.his.list[i]
    this.rest.navCtrl.navigateForward('his/detail')
  }

  public update(i: number) {
    let item = this.rest.his.list[i]
    let detail = item.detail[0]
    this.rest.temp = {
      id: item.id,
      detailid: detail.id,
      name: item.customer,  
      phone: item.phone,
      pet: item.pet,
      petid: item.petid,
      eye: detail.eye,
      temperate: detail.temperate,
      other: detail.other,
      treat: detail.treat,
      status: Number(detail.status),
      start: this.rest.his.start,
      end: this.rest.his.end,
      time: this.time.datetoisodate(item.time),
      image: detail.image
    }
    
    this.rest.navCtrl.navigateForward('his/insert')
  }

  public insert() {
    this.rest.temp = {
      start: this.rest.his.start,
      end: this.rest.his.end,
      time: this.time.datetoisodate(this.rest.home.today),
      name: '',
      phone: '',
      pet: '',
      petid: 0,
      eye: '',
      temperate: '',
      other: '',
      treat: '',
      status: 0,
      image: []
    }
    this.rest.navCtrl.navigateForward('his/insert')
  }


  public async rate(id: number, point: number = 0) {
    if (this.rest.config.spa > 1) {
      let alert = await this.alert.create({
        message: 'Đánh giá ' + point + ' sao cho nhân viên?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.rateSubmit(id, point)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async rateSubmit(id: number, point: number = 0) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('his', 'statrate', {
      id: id,
      rate: point,
      start: this.rest.his.start,
      end: this.rest.his.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }


  public cleardocs() {
    this.rest.home.default.docs = []
    this.rest.home.default.docscover = ''
    this.filter()
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

            this.rest.home.default.docs = docs
            this.rest.home.default.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public async hopital(id: number) {
    let alert = await this.alert.create({
      message: 'Hồ sơ sẽ chuyển sang lưu bệnh, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.hopitalSubmit(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async hopitalSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('his', 'hopital', {
      id: id,
      start: this.rest.his.start,
      end: this.rest.his.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public isNumber(number: number) {
    return Number(number)
  }

  public async toggleShare(id: number, share: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'share', {
      id: id,
      share: share,
      start: this.rest.his.start,
      end: this.rest.his.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
