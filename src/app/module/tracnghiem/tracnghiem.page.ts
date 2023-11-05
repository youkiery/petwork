import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiem',
  templateUrl: './tracnghiem.page.html',
  styleUrls: ['./tracnghiem.page.scss'],
})
export class TracnghiemPage implements OnInit {
  public baithicuoi = 0
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'tracnghiem'
      if (!this.rest.tracnghiem.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitao = true
      this.baithicuoi = resp.baithicuoi
      this.rest.tracnghiem.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.tracnghiem.khoitao = true
      this.baithicuoi = resp.baithicuoi
      this.rest.tracnghiem.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public async thongbaobaithi(idchuyenmuc: number) {
    const alert = await this.alert.create({
      header: 'Bạn còn 1 bài thi chưa hoàn thành',
      buttons: [{
        text: 'Thi tiếp',
        handler: (e) => {
          this.xacnhanthitiep()
        }
      }, {
        text: 'Thi lại',
        handler: (e) => {
          this.xacnhanbatdauthi(idchuyenmuc)
        }
      }]
    });
    await alert.present();
  }

  public async batdauthi(idchuyenmuc: number) {
    if (this.baithicuoi + 60 * 20 > new Date().getTime() / 1000) this.thongbaobaithi(idchuyenmuc)
    else this.xacnhanbatdauthi(idchuyenmuc)
  }

  public async xacnhanbatdauthi(idchuyenmuc: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'batdauthi', {
      idchuyenmuc: idchuyenmuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.bailam = resp.bailam
      this.baithicuoi = resp.baithicuoi
      this.rest.navCtrl.navigateForward("/tracnghiem/baithi")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthitiep() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'xacnhanthitiep', { }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.bailam = resp.bailam
      this.rest.navCtrl.navigateForward("/tracnghiem/baithi")
    }, () => {
      this.rest.defreeze()
    })
  }
}
