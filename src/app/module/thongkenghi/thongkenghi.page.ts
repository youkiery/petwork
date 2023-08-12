import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-thongkenghi',
  templateUrl: './thongkenghi.page.html',
  styleUrls: ['./thongkenghi.page.scss'],
})
export class ThongkenghiPage implements OnInit {
  public mau = [
    "green",
    "gray",
    "yellow",
    "orange",
    "red"
  ]
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'thongkenghi'
      if (!this.rest.thongkenghi.khoitao) {
        this.rest.thongkenghi.tungay = this.rest.home.month.start
        this.rest.thongkenghi.denngay = this.rest.home.month.end
        this.khoitao() 
      }
    })
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitao', {
      tungay: this.rest.thongkenghi.tungay,
      denngay: this.rest.thongkenghi.denngay
    }).then(resp => {
      this.rest.defreeze()
      this.rest.thongkenghi.khoitao = true
      this.rest.thongkenghi.danhsach = resp.danhsach
      this.rest.thongkenghi.danhsachngay = resp.danhsachngay
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitao', {
      tungay: this.rest.thongkenghi.tungay,
      denngay: this.rest.thongkenghi.denngay
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.thongkenghi.khoitao = true
      this.rest.thongkenghi.danhsach = resp.danhsach
      this.rest.thongkenghi.danhsachngay = resp.danhsachngay
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public cauhinh() {
    this.rest.navCtrl.navigateForward("/thongkenghi/cauhinh")
  }
  
  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.thongkenghi.tungay).split('/')
    let tungay = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    let denngay = new Date(Number(ngay[2]), Number(ngay[1]) + songay, 1)
    this.rest.thongkenghi.tungay = this.time.timetoisodate(tungay.getTime())
    this.rest.thongkenghi.denngay = this.time.timetoisodate(denngay.getTime() - 1)
    this.khoitao()
  }
}
