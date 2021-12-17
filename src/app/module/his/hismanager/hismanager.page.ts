import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-hismanager',
  templateUrl: './hismanager.page.html',
  styleUrls: ['./hismanager.page.scss'],
})
export class HismanagerPage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
    else this.rest.ready().then(() => {
      if (!this.rest.his.manager_init) {
        this.initiaze()
      }
    })
  }

  public async reload(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'manager', {}).then((resp) => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.his.manager = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'manager', {}).then((resp) => {
      this.rest.defreeze()
      this.rest.his.manager_init = true
      this.rest.his.manager = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    let item = this.rest.his.manager[index]
    this.rest.temp = {
      temp: 1,
      tempid: item.id,
      id: 0,
      detailid: 0,
      name: item.name,
      phone: item.phone,
      pet: '',
      petid: 0,
      eye: '',
      temperate: '',
      other: '',
      treat: item.treat,
      userid: item.userid,
      status: 0,
      time: this.time.timetoisodate(item.time * 1000),
      image: ['']
    }

    this.rest.navCtrl.navigateForward('his/temp')
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      message: 'Xóa phiếu tạm khỏi danh sách',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'tempremove', {
      id: id,
    }).then((resp) => {
      this.rest.his.manager = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
