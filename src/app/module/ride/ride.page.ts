import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Sau khi xác nhận, phiếu sẽ mất khỏi danh sách',
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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'remove', {
      id: id,
      segment: this.rest.ride.segment,
      start: this.rest.home.month.start,
      end: this.rest.home.month.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertPay() {
    this.rest.action = 'pay'
    this.rest.temp = {}
    this.rest.navCtrl.navigateForward('ride/insert')
  }

  public insertRide() {
    this.rest.action = 'cole'
    this.rest.temp = {}
    this.rest.navCtrl.navigateForward('ride/insert')
  }

  public filter() {

  }

  public async init() {
    await this.rest.freeze('Đang lấy danh sách..')
    this.rest.checkpost('ride', 'init', {
      start: this.rest.home.month.start,
      end: this.rest.home.month.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
      this.rest.ride.from = this.time.datetoisodate(resp.from)
      this.rest.ride.end = this.time.datetoisodate(resp.end)
    }, () => {
      this.rest.defreeze()
    })
  }
}
