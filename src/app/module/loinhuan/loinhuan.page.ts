import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-loinhuan',
  templateUrl: './loinhuan.page.html',
  styleUrls: ['./loinhuan.page.scss'],
})
export class LoinhuanPage implements OnInit {
  public spa = 0
  public banhang = 0
  public init = false
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'loinhuan'
      if (!this.rest.loinhuan.khoitao) {
        this.rest.loinhuan.thoigian = this.time.datetoisodate(this.rest.home.today)
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitao', {
      thoigian: this.rest.loinhuan.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.loinhuan.heluong = resp.heluong
      this.rest.loinhuan.tilespa = resp.tilespa
      this.rest.loinhuan.tilebanhang = resp.tilebanhang
      this.rest.loinhuan.luongcoban = resp.luongcoban
      this.rest.loinhuan.phucap = resp.phucap
      this.rest.loinhuan.danhsach = resp.dulieunhanvien
      this.rest.loinhuan.luong = resp.luong
      this.rest.loinhuan.tongluong = (Number(this.rest.loinhuan.luongcoban) + Number(this.rest.loinhuan.phucap)).toString()
      this.rest.loinhuan.khoitao = true
      this.locdanhsach()
    }, () => {
      this.rest.defreeze()
    })
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.loinhuan.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.rest.loinhuan.thoigian = this.time.timetoisodate(thoigian.getTime())
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitao', {
      thoigian: this.rest.loinhuan.thoigian
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.loinhuan.heluong = resp.heluong
      this.rest.loinhuan.tilespa = resp.tilespa
      this.rest.loinhuan.tilebanhang = resp.tilebanhang
      this.rest.loinhuan.luongcoban = resp.luongcoban
      this.rest.loinhuan.phucap = resp.phucap
      this.rest.loinhuan.danhsach = resp.dulieunhanvien
      this.rest.loinhuan.luong = resp.luong
      this.rest.loinhuan.tongluong = (Number(this.rest.loinhuan.luongcoban) + Number(this.rest.loinhuan.phucap)).toString()
      this.locdanhsach()
      this.init = true
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }
 
  public locdanhsach() {
    let tukhoa = this.rest.alias(this.rest.loinhuan.tukhoa)
    this.rest.loinhuan.danhsachtam = this.rest.loinhuan.danhsach.filter(luong => {
      let nhanvien = this.rest.alias(luong.hoten)
      return nhanvien.search(tukhoa) >= 0
    })
  }
  
  public nhaptien(bien: string) {
    let tam = Number(this[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this[bien] = this.rest.comma(tam)

    let spa = Number(this.spa.toString().replace(/[^0-9]/g, ''))
    let banhang = Number(this.banhang.toString().replace(/[^0-9]/g, ''))    
    if (Number(this.rest.loinhuan.heluong)) {
      // banhang
      let tong = spa + banhang
      let thuong = 0
      this.rest.loinhuan.tilebanhang.forEach(tilebanhang => {
        if (tilebanhang.khoang <= tong) thuong = tilebanhang.tien
      });
      this.rest.loinhuan.thuong = thuong.toString()
    }
    else {
      // spa
      spa = spa * this.rest.loinhuan.tilespa.loinhuanspa * this.rest.loinhuan.tilespa.chietkhauspa / 10000
      banhang = banhang * this.rest.loinhuan.tilespa.loinhuanbanhang * this.rest.loinhuan.tilespa.chietkhaubanhang / 10000
      
      let thuong = Math.floor(spa + banhang)
      let luong = Number(this.rest.loinhuan.luongcoban) + Number(this.rest.loinhuan.phucap)
      if (thuong > luong) this.rest.loinhuan.tongluong = thuong.toString()
      else this.rest.loinhuan.tongluong = luong.toString()
      this.rest.loinhuan.thuong = thuong.toString()
    }
  }

  public dencauhinh() {
    this.rest.navCtrl.navigateForward('/loinhuan/cauhinh')
  }

  public dendoanhthu() {
    this.rest.navCtrl.navigateForward('/loinhuan/doanhthu')
  }

  public dennhaplieu() {
    this.rest.navCtrl.navigateForward('/loinhuan/nhap')
  }
}
