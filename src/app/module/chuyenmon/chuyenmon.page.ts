import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-chuyenmon',
  templateUrl: './chuyenmon.page.html',
  styleUrls: ['./chuyenmon.page.scss'],
})
export class ChuyenmonPage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'chuyenmon'
      if (!this.rest.chuyenmon.khoitao) {
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('chuyenmon', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.chuyenmon.khoitao = true
      this.rest.chuyenmon.danhsach = resp.danhsach
      this.rest.chuyenmon.dichvu = resp.dichvu
      this.rest.chuyenmon.chuyenmon = resp.chuyenmon
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('chuyenmon', 'khoitao', {
    }).then(resp => {
      this.rest.chuyenmon.danhsach = resp.danhsach
      this.rest.chuyenmon.dichvu = resp.dichvu
      this.rest.chuyenmon.chuyenmon = resp.chuyenmon
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public async themchuyenmonnhanvien(idnhanvien: number, idchuyenmon: number, loai: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('chuyenmon', 'themchuyenmonnhanvien', {
      idnhanvien: idnhanvien,
      idchuyenmon: idchuyenmon,
      loai: loai
    }).then(resp => {
      this.rest.defreeze()
      this.rest.chuyenmon.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themchuyenmondichvu(iddichvu: number, idchuyenmon: number, loai: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('chuyenmon', 'themchuyenmondichvu', {
      iddichvu: iddichvu,
      idchuyenmon: idchuyenmon,
      loai: loai
    }).then(resp => {
      this.rest.defreeze()
      this.rest.chuyenmon.dichvu = resp.dichvu
    }, () => {
      this.rest.defreeze()
    })
  }
}
