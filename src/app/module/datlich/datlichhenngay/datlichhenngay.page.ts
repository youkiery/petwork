import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-datlichhenngay',
  templateUrl: './datlichhenngay.page.html',
  styleUrls: ['./datlichhenngay.page.scss'],
})
export class DatlichhenngayPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hotel')
  }

  public async xacnhan() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('datlich', 'henngay', {
      id: this.rest.temp.id,
      loai: this.rest.temp.loai,
      ngayhen: this.rest.temp.ngayhen,
      tukhoa: this.rest.datlich.tukhoa,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.datlich.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
