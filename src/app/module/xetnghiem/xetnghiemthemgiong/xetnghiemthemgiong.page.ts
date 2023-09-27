import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xetnghiemthemgiong',
  templateUrl: './xetnghiemthemgiong.page.html',
  styleUrls: ['./xetnghiemthemgiong.page.scss'],
})
export class XetnghiemthemgiongPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/xetnghiem')
  }

  public async capnhatgiong() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'capnhatgiong', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.tab = '3'
      this.rest.xetnghiem.chitieugiong = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
