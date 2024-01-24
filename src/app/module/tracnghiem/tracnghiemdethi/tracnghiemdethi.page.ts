import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemdethi',
  templateUrl: './tracnghiemdethi.page.html',
  styleUrls: ['./tracnghiemdethi.page.scss'],
})
export class TracnghiemdethiPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.tracnghiem.khoitaodethi || !this.rest.tracnghiem.khoitaochuyenmuc) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitaochuyenmucdethi', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaodethi = true
      this.rest.tracnghiem.dethi = resp.dethi
      this.rest.tracnghiem.khoitaochuyenmuc = true
      this.rest.tracnghiem.chuyenmuc = resp.chuyenmuc
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitaochuyenmucdethi', {
    }).then(resp => {
      event.target.complete()
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaodethi = true
      this.rest.tracnghiem.dethi = resp.dethi
      this.rest.tracnghiem.khoitaochuyenmuc = true
      this.rest.tracnghiem.chuyenmuc = resp.chuyenmuc
    }, () => {
      event.target.complete()
      this.rest.defreeze()
    })
  }

  public async themdethi() {
    this.rest.temp = {
      id: 0,
      tendethi: "",
      danhsachchuyenmuc: []
    }
    this.rest.navCtrl.navigateForward("/tracnghiem/capnhatdethi")
  }

  public async capnhatdethi(iddethi: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'dulieudethi', {
      iddethi: iddethi
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.dethi
      this.rest.navCtrl.navigateForward("/tracnghiem/capnhatdethi")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoadethi(iddethi: number) {
    const alert = await this.alert.create({
      header: 'Đề thi sẽ không thi được nữa',
      buttons: [{
        text: 'Trở về',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoadethi(iddethi)
        }
      }]
    });
    await alert.present();
  }
  
  public async xacnhanxoadethi(iddethi: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'xoadethi', {
      iddethi: iddethi
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.dethi = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
}

