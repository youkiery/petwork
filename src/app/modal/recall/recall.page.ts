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
      message: 'Hoàn thành lịch tiêm phòng?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.doneSubmit(index)
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
}
