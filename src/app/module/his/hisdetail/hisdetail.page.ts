import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

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
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
  }

  public update(i: number) {
    this.rest.temp = {
      id: this.rest.detail.id,
      detailid: this.rest.detail.detail[i].id,
      name: this.rest.detail.customer,  
      phone: this.rest.detail.phone,
      petname: this.rest.detail.pet,
      eye: this.rest.detail.detail[i].eye,
      temperate: this.rest.detail.detail[i].temperate,
      other: this.rest.detail.detail[i].other,
      treat: this.rest.detail.detail[i].treat,
      status: Number(this.rest.detail.detail[i].status),
      from: this.rest.his.from,
      end: this.rest.his.end,
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
      from: this.rest.his.from,
      end: this.rest.his.end,
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

}
