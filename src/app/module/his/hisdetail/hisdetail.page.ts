import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-hisdetail',
  templateUrl: './hisdetail.page.html',
  styleUrls: ['./hisdetail.page.scss'],
})
export class HisdetailPage implements OnInit {
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public pay = [
    { class: 'pos red', name: 'Chưa ra toa'},
    { class: 'pos yellow', name: 'Chưa trả'},
    { class: 'pos', name: 'Đã trả'},
  ]
  public list = []
  public text = ''
  public side = ['posx', 'posx side']
  public x = ['', 'x']
  public init = false
  @ViewChild(IonContent) content: IonContent;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
    else if (!this.init) this.auto()
  }

  public chat() {
    this.rest.temp = {
      id: this.rest.detail.id
    }
    this.rest.navCtrl.navigateForward('his/chat')
  }
  
  public async change(payindex: number, index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận chuyển trạng thái thanh toán sang '+ this.pay[payindex].name,
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.changeSubmit(payindex, index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async changeSubmit(payindex: number, index: number) {
    let detail = this.rest.detail.detail[index]
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'pay', {
      pay: payindex,
      detailid: detail.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.detail.detail[index].pay = payindex
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(i: number) {
    let detail = this.rest.detail.detail[i]
    this.rest.temp = {
      id: this.rest.detail.id,
      detailid: detail.id,
      name: this.rest.detail.customer,  
      phone: this.rest.detail.phone,
      pet: this.rest.detail.pet,
      petid: this.rest.detail.petid,
      eye: detail.eye,
      temperate: detail.temperate,
      other: detail.other,
      treat: detail.treat,
      status: Number(detail.status),
      start: this.rest.his.start,
      end: this.rest.his.end,
      time: this.time.datetoisodate(detail.time),
      image: detail.image,
      pos: this.rest.his.list[this.rest.id].pos
    }
    
    this.rest.navCtrl.navigateForward('his/insert')
  }

  public insert() {
    this.rest.temp = {
      id: this.rest.detail.id,
      name: this.rest.detail.customer,  
      phone: this.rest.detail.phone,
      petname: this.rest.detail.pet,
      eye: '',
      temperate: '',
      other: '',
      treat: '',
      status: Number(this.rest.detail.status),
      start: this.rest.his.start,
      end: this.rest.his.end,
      image: [],
      pos: this.rest.his.list[this.rest.id].pos
    }
    
    this.rest.navCtrl.navigateForward('his/insert')
  }

  public async insertHis() {
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
            this.insertHisSubmit(e.his)
          }
        }
      ]
    });

    await alert.present();
  }
  
  public muchChat(number: string) {
    if (Number(number) > 99) return "99+"
    return number
  }

  public async insertHisSubmit(his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his', 'add', {
      petid: this.rest.his.list[this.rest.temp.i].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[this.rest.temp.i].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail2(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }

  public totime(time: number) {
    return this.time.timetodates(time * 1000)
  }

  public async reload(event: any) {
    await this.auto()
    event.target.complete()
  }

  public async auto() {
    await this.rest.freeze('Đang tải dữ liệu......')
    setTimeout(() => {
      this.rest.checkpost('his', 'getchat', {
        id: this.rest.his.list[this.rest.id].id,
      }).then((resp) => {
        this.rest.defreeze()
        this.init = true
        this.list = resp.list
      }, () => {
        this.rest.defreeze()
      })
    }, 1000);
  }

  public async post() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'postchat', {
      id: this.rest.his.list[this.rest.id].id,
      text: this.text
    }).then((resp) => {
      this.rest.defreeze()
      this.list = resp.list
      this.content.scrollToBottom(300);
      this.text = ''
    }, () => {
      this.rest.defreeze()
    })
  }
}
