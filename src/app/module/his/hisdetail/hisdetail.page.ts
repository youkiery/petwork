import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
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
      image: detail.image
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
      image: []
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
}
