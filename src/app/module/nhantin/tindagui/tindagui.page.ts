import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-tindagui',
  templateUrl: './tindagui.page.html',
  styleUrls: ['./tindagui.page.scss'],
})
export class TindaguiPage implements OnInit {
  public danhsachdaguitin = []
  public ngay = ''
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhantin')
    else {
      this.ngay = this.time.datetoisodate(this.rest.home.today)
    }
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaodaguitin', {
      ngay: this.ngay
    }).then(resp => {
      this.rest.defreeze()
      this.danhsachdaguitin = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async done(id: number) {
    let alert = await this.alert.create({
      message: 'Không gửi tin nhắc khách nữa?',
      inputs: [
        {
          placeholder: 'Lý do',
          name: 'lydo',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(id, e.lydo)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(id: number, lydo: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xacnhankhongnhantin', {
      id: id,
      lydo: lydo,
      ngay: this.ngay
    }).then((resp) => {
      this.rest.defreeze()
      this.danhsachdaguitin = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

}
