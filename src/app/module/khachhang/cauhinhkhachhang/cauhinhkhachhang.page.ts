import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-cauhinhkhachhang',
  templateUrl: './cauhinhkhachhang.page.html',
  styleUrls: ['./cauhinhkhachhang.page.scss'],
})
export class CauhinhkhachhangPage implements OnInit {
  public cauhinh = {
    chuongtrinh: "",
    luotdatlich: 0
  }
  public dulieu = {
    chuongtrinh: "",
    luotdatlich: 0
  }
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else if (!this.rest.khachhang.khoitaochinhanh) this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaocauhinh', {
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
      this.cauhinhmacdinh()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'luucauhinh', this.dulieu).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public cauhinhmacdinh() {
    this.dulieu = JSON.parse(JSON.stringify(this.cauhinh))
    console.log(this.dulieu);
    
  }
}
