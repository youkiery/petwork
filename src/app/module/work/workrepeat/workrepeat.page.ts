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
    else if (!this.rest.work.khoitaolaplai) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'khoitaolaplai', { 
    }).then(resp => {
      this.rest.defreeze()
      this.rest.work.khoitaolaplai = true
      this.rest.work.danhsachlaplai = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat(i: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let congviec = this.rest.work.danhsachlaplai[i]
    this.rest.checkpost('work', 'laythongtin', {
      id: congviec.id,
      laplai: true
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      this.rest.temp.laplai = true
      this.rest.temp.chedo = this.rest.work.chedo,
      this.rest.temp.filter = this.rest.work.filter,
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
    this.rest.checkpost('work', 'xoalaplai', {
      id: id,
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.work.danhsachlaplai = resp.laplai
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'khoitaolaplai', { 
    }).then(resp => {
      this.rest.defreeze()
      this.rest.work.danhsachlaplai = resp.danhsach
      event.target.complete()
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
