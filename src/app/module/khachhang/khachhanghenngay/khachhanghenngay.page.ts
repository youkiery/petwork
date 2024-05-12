import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-khachhanghenngay',
  templateUrl: './khachhanghenngay.page.html',
  styleUrls: ['./khachhanghenngay.page.scss'],
})
export class KhachhanghenngayPage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
  }

  public async xacnhan() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'henngay', {
      id: this.rest.temp.id,
      loai: this.rest.temp.loai,
      ngayhen: this.rest.temp.ngayhen,
      tungay: this.rest.khachhang.tungay,
      tukhoa: this.rest.khachhang.tukhoa,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
