import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-hansudung',
  templateUrl: './hansudung.page.html',
  styleUrls: ['./hansudung.page.scss'],
})
export class HansudungPage {
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = "hansudung"
      if (!this.rest.hansudung.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'khoitaohansudung', {}).then(resp => {
      this.rest.defreeze()
      this.rest.hansudung.khoitao = true
      this.rest.hansudung.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(e:any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'khoitaohansudung', {}).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.rest.hansudung.khoitao = true
      this.rest.hansudung.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      e.target.complete()
    })
  }

  public themhansudung() {
    this.rest.temp = {
      tenhang: '',
      soluong: 1,
      hansudung: this.time.datetoisodate(this.rest.home.today),
    }
    this.rest.navCtrl.navigateForward('/hansudung/them')
  }

  public async xoahansudung(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận hạn sử dụng?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoahansudung(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoahansudung(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'xoahansudung', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.hansudung.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
