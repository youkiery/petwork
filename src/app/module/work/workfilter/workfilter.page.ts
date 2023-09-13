import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workfilter',
  templateUrl: './workfilter.page.html',
  styleUrls: ['./workfilter.page.scss'],
})
export class WorkfilterPage {
  public loc: any = { tukhoa: '', danhmuc: 0, denhan: 0, hoanthanh: 0 }
  public hoanthanh = ['Toàn bộ', 'Chưa hoàn thành', 'Đã hoàn thành']
  public denhan = ['Toàn bộ', 'Gần hạn', 'Quá hạn']
  public rev = ['1', '2', '0']
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
    else this.loc = JSON.parse(JSON.stringify(this.rest.congviec.timkiem))
  }

  public async filter() {
    // this.rest.congviec.timkiem = this.loc
    // await this.rest.freeze('Đang tải dữ liệu...')
    // this.rest.checkpost('congviec', 'danhsach', {
    //   chedo: this.rest.congviec.chedo,
    //   filter: this.rest.congviec.timkiem
    // }).then(resp => {
    // this.rest.defreeze()
    //   this.rest.congviec.khoitao = [false, false]
    //   this.rest.congviec.khoitao[this.rest.congviec.chedo] = true
    //   this.rest.congviec.danhsach[this.rest.congviec.chedo] = resp.danhsach
    //   this.rest.back()
    // }, () => {
    //   this.rest.defreeze()
    // })
  }
}
