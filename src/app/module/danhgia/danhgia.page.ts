import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-danhgia',
  templateUrl: './danhgia.page.html',
  styleUrls: ['./danhgia.page.scss'],
})
export class DanhgiaPage implements OnInit {
  public danhsachhailong = [1, 2, 3, 4, 5]
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'danhgia'
      if (!this.rest.danhgia.khoitao) {
        this.rest.danhgia.thoigian = this.time.datetoisodate(this.rest.home.today)
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('danhgia', 'khoitao', {
      thoigian: this.rest.danhgia.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.danhgia.khoitao = true
      this.rest.danhgia.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('danhgia', 'khoitao', {
      thoigian: this.rest.danhgia.thoigian
    }).then(resp => {
      this.rest.danhgia.danhsach = resp.danhsach
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.danhgia.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.rest.danhgia.thoigian = this.time.timetoisodate(thoigian.getTime())
  }
}
