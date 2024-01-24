import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemchuyenmuc',
  templateUrl: './tracnghiemchuyenmuc.page.html',
  styleUrls: ['./tracnghiemchuyenmuc.page.scss'],
})
export class TracnghiemchuyenmucPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.tracnghiem.khoitaochuyenmuc) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitaochuyenmuc', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaochuyenmuc = true
      this.rest.tracnghiem.chuyenmuc = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitaochuyenmuc', {
    }).then(resp => {
      event.target.complete()
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaochuyenmuc = true
      this.rest.tracnghiem.chuyenmuc = resp.danhsach
    }, () => {
      event.target.complete()
      this.rest.defreeze()
    })
  }

  public async themchuyenmuc() {
    this.rest.temp = {
      id: 0,
      tenchuyenmuc: "",
      socau: 1,
      thoigian: 1,
      nhanvien: this.rest.home.fullname,
      cauhoi: []
    }
    this.rest.navCtrl.navigateForward("/tracnghiem/capnhat")
  }

  public async capnhatchuyenmuc(idchuyenmuc: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'dulieuchuyenmuc', {
      idchuyenmuc: idchuyenmuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.chuyenmuc
      this.rest.temp.nhanvien = this.rest.home.fullname
      this.rest.navCtrl.navigateForward("/tracnghiem/capnhat")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoachuyenmuc(idchuyenmuc: number) {
    const alert = await this.alert.create({
      header: 'Chuyên mục sẽ không thi được nữa',
      buttons: [{
        text: 'Trở về',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoachuyenmuc(idchuyenmuc)
        }
      }]
    });
    await alert.present();
  }
  
  public async xacnhanxoachuyenmuc(idchuyenmuc: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'xoachuyenmuc', {
      idchuyenmuc: idchuyenmuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.chuyenmuc = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
}
