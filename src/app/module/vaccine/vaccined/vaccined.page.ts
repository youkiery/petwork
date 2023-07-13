import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccined',
  templateUrl: './vaccined.page.html',
  styleUrls: ['./vaccined.page.scss'],
})
export class VaccinedPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/vaccine')
    else this.rest.ready().then(() => {
      this.filter()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'vaccined', {
      start: this.rest.temp.start,
      end: this.rest.temp.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reset(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận',
      message: 'Sau khi xác nhận, phiếu nhắc sẽ trở thành chưa gọi, xác nhận?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.resetSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async resetSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'resetvaccine', {
      start: this.rest.temp.start,
      end: this.rest.temp.end,
      id: this.rest.temp.list[index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
