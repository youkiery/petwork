import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemthanhphan',
  templateUrl: './itemthanhphan.page.html',
  styleUrls: ['./itemthanhphan.page.scss'],
})
export class ItemthanhphanPage implements OnInit {
  public hanga = ""
  public hangb = ""
  public soluong = 0
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hanghoa')
  }

  public async xacnhan() {
    if (!this.rest.temp.mahang.length) return this.rest.notify("Xin hãy nhập mã hàng")
    else if (!this.rest.temp.tenhang.length) return this.rest.notify("Xin hãy nhập tên hàng")
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('item', 'capnhat', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.item.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
