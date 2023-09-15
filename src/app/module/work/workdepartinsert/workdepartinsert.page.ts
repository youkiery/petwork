import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workdepartinsert',
  templateUrl: './workdepartinsert.page.html',
  styleUrls: ['./workdepartinsert.page.scss'],
})
export class WorkdepartinsertPage {

  constructor(
    public rest: RestService
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
  }

  public async capnhat() {
    let kiemtra = false
    this.rest.temp.list.forEach(nhanvien => {
      if (nhanvien.value) kiemtra = true
    });
    if (!kiemtra) return this.rest.notify("Hãy chọn ít nhất 1 nhân viên")
    else if (!this.rest.temp.name.length) return this.rest.notify("Xin hãy nhập tên danh mục")
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'capnhatdanhmuc', this.rest.temp).then(resp => {
    this.rest.defreeze()
      this.rest.congviec.danhmuc = resp.danhmuc
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
