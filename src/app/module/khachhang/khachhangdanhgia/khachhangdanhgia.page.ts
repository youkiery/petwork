import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-khachhangdanhgia',
  templateUrl: './khachhangdanhgia.page.html',
  styleUrls: ['./khachhangdanhgia.page.scss'],
})
export class KhachhangdanhgiaPage implements OnInit {
  public danhsachhailong = [1, 2, 3, 4, 5]
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else {
      this.rest.khachhang.thoigian = this.time.datetoisodate(this.rest.home.today)
      this.khoitao()
    }
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaodanhgia', {
      thoigian: this.rest.khachhang.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.danhgia = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitao', {
      thoigian: this.rest.khachhang.thoigian
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.khachhang.danhgia = resp.danhsach
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.khachhang.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.rest.khachhang.thoigian = this.time.timetoisodate(thoigian.getTime())
  }
}
