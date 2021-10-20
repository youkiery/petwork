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

  ionViewWDidEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action) this.rest.root()
    })
  }

  public update() {
    this.rest.temp = {
      id: this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].id,
      name: this.rest.his.list[this.rest.temp.i].customer,
      phone: this.rest.his.list[this.rest.temp.i].phone,
      petlist: [],
      pet: this.rest.his.list[this.rest.temp.i].petid,
      eye: this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].eye,
      temperate: this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].temperate,
      other: this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].other,
      treat: this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].treat,
      status: Number(this.rest.his.list[this.rest.temp.i].detail[this.rest.temp.j].status),
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
