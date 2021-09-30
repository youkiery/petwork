import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-recall',
  templateUrl: './recall.page.html',
  styleUrls: ['./recall.page.scss'],
})
export class RecallPage {
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Đã gọi chưa quá ngày',
    2: 'Đã gọi đã quá ngày',
    3: 'Chưa gọi đã quá ngày',
    4: 'Đã tái chủng',
    5: 'Không tái chủng',
  }
  public status = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card yellow',
    3: 'stl-card red',
    4: 'stl-card white',
    5: 'stl-card white',
  }
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.root()
  }

  public async done(index: number) {
    const alert = await this.alert.create({
      message: 'Hoàn thành lịch nhắc?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            switch (this.rest.action) {
              case 'vaccine':
                this.doneSubmit(index)
              break;
              case 'usg':
                this.doneUsgSubmit(index)
              break;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public async doneSubmit(index: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('vaccine', 'done', {
      id: this.rest.vaccine.old[index].id,
      customerid: this.rest.vaccine.old[index].customerid,
    }).then(resp => {
      this.rest.vaccine.list = resp.list
      if (resp.old.length) this.rest.vaccine.old = resp.old
      else this.rest.navCtrl.back()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doneUsgSubmit(index: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('usg', 'done', {
      id: this.rest.usg.old[index].id,
      customerid: this.rest.usg.old[index].customerid,
    }).then(resp => {
      this.rest.usg.list = resp.list
      this.rest.usg.old = resp.old
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
