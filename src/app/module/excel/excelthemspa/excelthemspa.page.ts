import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelthemspa',
  templateUrl: './excelthemspa.page.html',
  styleUrls: ['./excelthemspa.page.scss'],
})
export class ExcelthemspaPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
  }

  public async xacnhan() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'themspa', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public xoakhoangcan(i: number) {
    this.rest.temp.khoangcan = this.rest.temp.khoangcan.filter((khoangcan, thutu) => {
      return i != thutu
    })
  }

  public themkhoangcan() {
    this.rest.temp.khoangcan.push({
      khoangcan: "0-2",
      sotien: "10000"
    })
  }
}
