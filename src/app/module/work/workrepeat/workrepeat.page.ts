import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workrepeat',
  templateUrl: './workrepeat.page.html',
  styleUrls: ['./workrepeat.page.scss'],
})
export class WorkrepeatPage {
  public laplai = ['', 'Lặp lại hằng tuần', 'Lặp lại hằng tháng', 'Lặp lại hằng năm']
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
    else if (!this.rest.congviec.khoitaolaplai) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'khoitaolaplai', { 
    }).then(resp => {
      this.rest.defreeze()
      this.rest.congviec.khoitaolaplai = true
      this.rest.congviec.danhsachlaplai = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat(i: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let congviec = this.rest.congviec.danhsachlaplai[i]
    this.rest.checkpost('congviec', 'laythongtin', {
      id: congviec.id,
      laplai: true
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      this.rest.temp.laplai = true
      this.rest.temp.chedo = this.rest.congviec.chedo,
      this.rest.temp.timkiem = this.rest.congviec.timkiem,
     this.rest.navCtrl.navigateForward('/work/insert')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa công việc',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoa(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'xoalaplai', {
      id: id,
      chedo: this.rest.congviec.chedo,
      filter: this.rest.congviec.timkiem,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.congviec.danhsachlaplai = resp.laplai
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'khoitaolaplai', { 
    }).then(resp => {
      this.rest.defreeze()
      this.rest.congviec.danhsachlaplai = resp.danhsach
      event.target.complete()
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
