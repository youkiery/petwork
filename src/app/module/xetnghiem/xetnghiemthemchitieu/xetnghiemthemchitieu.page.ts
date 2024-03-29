import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xetnghiemthemchitieu',
  templateUrl: './xetnghiemthemchitieu.page.html',
  styleUrls: ['./xetnghiemthemchitieu.page.scss'],
})
export class XetnghiemthemchitieuPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/xetnghiem')
  }
  
  public async capnhatchitieu() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'capnhatchitieu', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.tab = '3'
      this.rest.xetnghiem.danhsachchitieu = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
