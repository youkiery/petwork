import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemchitiet',
  templateUrl: './tracnghiemchitiet.page.html',
  styleUrls: ['./tracnghiemchitiet.page.scss'],
})
export class TracnghiemchitietPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
  }

  public async chitietbaithi(idbaithi: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'chitietbaithi', {
      idbaithi: idbaithi
     }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.bailam = resp.bailam
      this.rest.navCtrl.navigateForward("/tracnghiem/baithi")
    }, () => {
      this.rest.defreeze()
    })
  }
}
