import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-khachhangthongke',
  templateUrl: './khachhangthongke.page.html',
  styleUrls: ['./khachhangthongke.page.scss'],
})
export class KhachhangthongkePage implements OnInit {
  public dulieu = {
    id: 0,
    khachhang: "",
    dienthoai: "",
    hanghoa: 0,
    spa: 0
  }
  public them = 0
  public thoigian = ""
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.thoigian = this.time.datetoisodate(this.rest.home.today)
      if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
      else this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaokhachvip', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.thongke = resp.thongke
      this.them = 0
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaokhachvip', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.khachhang.thongke = resp.thongke
      this.them = 0
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public themkhachhang() {
    if (this.them) return this.them = 0
    this.dulieu = {
      id: 0,
      khachhang: "",
      dienthoai: "",
      hanghoa: 0,
      spa: 0
    }
    this.them = 1
  }

  public async xacnhanthemkhachhang() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'themkhachvip', {
      dulieu: this.dulieu,
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.thongke = resp.thongke
      this.them = 0
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async xoakhachvip(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa khách VIP này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoakhachvip(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoakhachvip(id: number = 0) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'xoakhachvip', {
      id: id,
      thoigian: this.thoigian
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.khachhang.thongke = resp.thongke
    }, () => {
      this.rest.defreeze()
    })
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.thoigian = this.time.timetoisodate(thoigian.getTime())
  }
}
