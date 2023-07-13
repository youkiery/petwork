import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) {  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()      
  }

  public async detail(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }

  public async rate(id: number, point: number = 0) {
    if (this.rest.config.spa > 1) {
      let alert = await this.alert.create({
        message: 'Đánh giá '+ point +' sao cho nhân viên?',
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
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'rate', {
      id: id,
      rate: point,
      keyword: this.rest.spa.keyword
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.old = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
