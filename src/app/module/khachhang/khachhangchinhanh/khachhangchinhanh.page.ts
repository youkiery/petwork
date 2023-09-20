import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-khachhangchinhanh',
  templateUrl: './khachhangchinhanh.page.html',
  styleUrls: ['./khachhangchinhanh.page.scss'],
})
export class KhachhangchinhanhPage implements OnInit {
  public option = []
  public weight = ['< 2kg', '2 - 4kg', '4 - 10kg', '10 - 15kg', '15 - 25kg', '25 - 35kg', '35 - 50kg', '> 50kg']
  public init = false
  public treat = false
  public max = 960
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else if (!this.rest.khachhang.khoitaochinhanh) this.khoitao()
  }

  public themchinhanh() {
    this.rest.temp = {
      id: 0,
      tenchinhanh: "",
      diachi: "",
      dienthoai: "",
      image: ""
    }
    this.rest.navCtrl.navigateForward("/khachhang/themchinhanh")
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaochinhanh', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.khoitaochinhanh = true
      this.rest.khachhang.chinhanh = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaochinhanh', {
    }).then(resp => {
      this.rest.khachhang.khoitaochinhanh = true
      this.rest.khachhang.chinhanh = resp.danhsach
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

}
