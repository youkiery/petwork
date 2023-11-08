import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemketqua',
  templateUrl: './tracnghiemketqua.page.html',
  styleUrls: ['./tracnghiemketqua.page.scss'],
})
export class TracnghiemketquaPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'ketquathi', {
      trang: (this.rest.tracnghiem.ketqua.trang ++)
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      resp.ketqua.forEach(ketqua => {
        this.rest.tracnghiem.ketqua.danhsach.push(ketqua)  
      });
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
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
