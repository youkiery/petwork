import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-tracnghiemketqua',
  templateUrl: './tracnghiemketqua.page.html',
  styleUrls: ['./tracnghiemketqua.page.scss'],
})
export class TracnghiemketquaPage implements OnInit {
  public batdau = ""
  public ketthuc = ""
  public danhsach = []
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    this.batdau = this.time.datetoisodate(this.rest.home.today)
    this.ketthuc = this.time.datetoisodate(this.rest.home.today)
    this.thongkebaithi()
  }

  public async thongkebaithi() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'thongkebaithi', {
      batdau: this.batdau,
      ketthuc: this.ketthuc,
     }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
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
