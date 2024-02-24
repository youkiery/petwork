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
  public trangthai = ["Chưa thi", "Rớt", "Đậu"]
  public loptrangthai = ["", "rot", "dau"]
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.tracnghiem.thongke.khoitao) {
      this.rest.tracnghiem.thongke.batdau = this.rest.home.month.start
      this.rest.tracnghiem.thongke.ketthuc = this.rest.home.month.end
      this.thongkebaithi()
    }
  }

  public async thongkebaithi() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'thongkebaithi', {
      batdau: this.rest.tracnghiem.thongke.batdau,
      ketthuc: this.rest.tracnghiem.thongke.ketthuc,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.thongke.danhsach = resp.danhsach
      this.rest.tracnghiem.thongke.khoitao = true
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
