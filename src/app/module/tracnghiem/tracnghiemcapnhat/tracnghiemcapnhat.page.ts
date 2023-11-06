import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemcapnhat',
  templateUrl: './tracnghiemcapnhat.page.html',
  styleUrls: ['./tracnghiemcapnhat.page.scss'],
})
export class TracnghiemcapnhatPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public themcauhoi() {
    this.rest.temp.cauhoi.push({
      noidung: "",
      danhsach: [
        {id: 0, noidung: "", dapan: 1},
        {id: 0, noidung: "", dapan: 0},
        {id: 0, noidung: "", dapan: 0},
        {id: 0, noidung: "", dapan: 0},
      ]
    })
  }

  public xoacauhoi(thutu: number) {
    this.rest.temp.cauhoi = this.rest.temp.cauhoi.filter((cauhoi, index) => {
      return thutu !== index
    })
    if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public async capnhatchuyenmuc() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'capnhatchuyenmuc', {
      dulieu: this.rest.temp
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
