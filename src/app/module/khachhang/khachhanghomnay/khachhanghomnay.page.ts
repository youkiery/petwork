import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-khachhanghomnay',
  templateUrl: './khachhanghomnay.page.html',
  styleUrls: ['./khachhanghomnay.page.scss'],
})
export class KhachhanghomnayPage implements OnInit {
  public danhsach = []
  public loaikhachhang = ["SPA", "Điều trị"]
  public trangthai = ["Khách chưa đến", "Khách đã đến", "Khách huỷ đặt lịch"]
  public mautrangthai = ["black", "green", "red"]
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'tonghop', {
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'tonghop', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async khongden(id: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận khách không đặt lịch nữa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhankhongden(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhankhongden(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let khachhang = this.danhsach[thutu]
    this.rest.checkpost('khachhang', 'khongdentonghop', {
      id: khachhang.id,
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
