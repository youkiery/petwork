import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-loinhuannhap',
  templateUrl: './loinhuannhap.page.html',
  styleUrls: ['./loinhuannhap.page.scss'],
})
export class LoinhuannhapPage implements OnInit {
  public thoigian = ''
  public danhsachnhanvien = []
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/loinhuan')
    else {
      this.thoigian = this.time.datetoisodate(this.rest.home.today)
      this.khoitao()
    }
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitaonhaplieu', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.danhsachnhanvien = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitaonhaplieu', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.danhsachnhanvien = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public nhaptien(bien: string, thutu: number) {
    let tam = Number(this.danhsachnhanvien[thutu][bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.danhsachnhanvien[thutu][bien] = this.rest.comma(tam)
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.thoigian = this.time.timetoisodate(thoigian.getTime())
  }

  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'capnhatnhaplieu', {
      danhsachnhanvien: this.danhsachnhanvien,
      thoigian: this.thoigian
    }).then(resp => {
      this.danhsachnhanvien = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
