import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-recall',
  templateUrl: './recall.page.html',
  styleUrls: ['./recall.page.scss'],
})
export class RecallPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
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
      id: this.rest.data.vaccine.old[index].id,
      customerid: this.rest.data.vaccine.old[index].customerid,
    }).then(resp => {
      this.rest.data.vaccine.list = resp.list
      this.rest.data.vaccine.old = resp.old
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doneUsgSubmit(index: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('usg', 'done', {
      id: this.rest.data.usg.old[index].id,
      customerid: this.rest.data.usg.old[index].customerid,
    }).then(resp => {
      this.rest.data.usg.list = resp.list
      this.rest.data.usg.old = resp.old
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
