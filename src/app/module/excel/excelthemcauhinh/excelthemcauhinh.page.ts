import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelthemcauhinh',
  templateUrl: './excelthemcauhinh.page.html',
  styleUrls: ['./excelthemcauhinh.page.scss'],
})
export class ExcelthemcauhinhPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
  }

  public async themcauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    let nhom = []
    this.rest.temp.nhom.forEach((dulieu: any) => {
      if (dulieu.checked) nhom.push(dulieu.id)
    });
    if (!nhom.length) {
      this.rest.notify('Chọn ít nhất 1 nhóm!')
      return 0
    }
    this.rest.checkpost('vaccine', 'themcauhinh', {
      ngaytruoc: this.rest.temp.ngaytruoc,
      ngay: this.rest.temp.ngay,
      nhom: nhom
    }).then(() => {
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
