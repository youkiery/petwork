import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiem',
  templateUrl: './tracnghiem.page.html',
  styleUrls: ['./tracnghiem.page.scss'],
})
export class TracnghiemPage implements OnInit {
  public chuyendoi = ["A", "B", "C", "D"]
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'tracnghiem'
      if (!this.rest.tracnghiem.khoitao) this.khoitao()
    })
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitao = true
      this.rest.tracnghiem.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.tracnghiem.khoitao = true
      this.rest.tracnghiem.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
