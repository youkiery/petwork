import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemcapnhatdethi',
  templateUrl: './tracnghiemcapnhatdethi.page.html',
  styleUrls: ['./tracnghiemcapnhatdethi.page.scss'],
})
export class TracnghiemcapnhatdethiPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async capnhatdethi() {
    if (this.rest.temp.socau < 1 && this.rest.temp.thoigian < 1) return this.rest.notify("Số câu và thời gian làm bài > 0 phút")
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'capnhatdethi', {
      dulieu: this.rest.temp
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.dethi = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

}
