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
      if (!this.rest.tracnghiem.khoitaodethi) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaodethi = true
      this.rest.tracnghiem.dethi = resp.danhsach
      this.baithicuoi = resp.baithicuoi
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.tracnghiem.khoitaodethi = true
      this.rest.tracnghiem.dethi = resp.danhsach
      this.baithicuoi = resp.baithicuoi
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public async thongbaobaithi(iddethi: number, thoigian: number) {
    const alert = await this.alert.create({
      header: 'Bạn còn 1 bài thi chưa hoàn thành',
      buttons: [{
        text: 'Thi tiếp',
        handler: (e) => {
          this.xacnhanthitiep(thoigian)
        }
      }, {
        text: 'Thi lại',
        handler: (e) => {
          this.xacnhanbatdauthi(iddethi, thoigian)
        }
      }]
    });
    await alert.present();
  }

  public async batdauthi(iddethi: number, thoigian: number) {
    if (this.baithicuoi + thoigian * 60 > new Date().getTime() / 1000) this.thongbaobaithi(iddethi, thoigian)
    else this.xacnhanbatdauthi(iddethi, thoigian)
  }

  public async xacnhanbatdauthi(iddethi: number, thoigian: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'batdauthi', {
      iddethi: iddethi,
      thoigian: thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.bailam = resp.bailam
      this.baithicuoi = resp.baithicuoi
      this.rest.navCtrl.navigateForward("/tracnghiem/baithi")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthitiep(thoigian: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'xacnhanthitiep', {
      thoigian: thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.bailam = resp.bailam
      this.rest.navCtrl.navigateForward("/tracnghiem/baithi")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chitiet(idchuyenmuc: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'chitiet', {
      idchuyenmuc: idchuyenmuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.danhsach
      this.rest.navCtrl.navigateForward("/tracnghiem/chitiet")
    }, () => {
      this.rest.defreeze()
    })
  }

  public async ketquathi() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.tracnghiem.ketqua.trang = 1
    this.rest.checkpost('tracnghiem', 'ketquathi', {
      trang: this.rest.tracnghiem.ketqua.trang
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.ketqua.danhsach = resp.danhsach
      this.rest.navCtrl.navigateForward("/tracnghiem/ketqua")
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async hoiphucchuyenmuc(idchuyenmuc: number) {
    const alert = await this.alert.create({
      header: 'Cho phép nhân viên làm kiểm tra chuyên mục?',
      buttons: [{
        text: 'Trở về',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanhoiphucchuyenmuc(idchuyenmuc)
        }
      }]
    });
    await alert.present();
  }
  
  public async xacnhanhoiphucchuyenmuc(idchuyenmuc: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'hoiphucchuyenmuc', {
      idchuyenmuc: idchuyenmuc
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.dethi = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public chuyenmuc() {
    this.rest.navCtrl.navigateForward("/tracnghiem/chuyenmuc")
  }

  public dethi() {
    this.rest.navCtrl.navigateForward("/tracnghiem/dethi")
  }
}
