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
    else this.loc = JSON.parse(JSON.stringify(this.rest.work.filter))
  }

  public async filter() {
    this.rest.work.filter = this.loc
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'danhsach', {
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter
    }).then(resp => {
    this.rest.defreeze()
      this.rest.work.khoitao = [false, false]
      this.rest.work.khoitao[this.rest.work.chedo] = true
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
