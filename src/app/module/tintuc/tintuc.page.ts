import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.page.html',
  styleUrls: ['./tintuc.page.scss'],
})
export class TintucPage implements OnInit {
  public tab = "tintuc"
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'tintuc'
      if (!this.rest.tintuc.khoitao) {
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tintuc', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tintuc.khoitao = true
      this.rest.tintuc.danhsachtintuc = resp.danhsachtintuc
      this.rest.tintuc.danhsachchuongtrinh = resp.danhsachchuongtrinh
      this.rest.tintuc.danhsachchinhanh = resp.danhsachchinhanh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tintuc', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.tintuc.khoitao = true
      this.rest.tintuc.danhsachtintuc = resp.danhsachtintuc
      this.rest.tintuc.danhsachchuongtrinh = resp.danhsachchuongtrinh
      this.rest.tintuc.danhsachchinhanh = resp.danhsachchinhanh
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

}
