import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-adminzalo',
  templateUrl: './adminzalo.page.html',
  styleUrls: ['./adminzalo.page.scss'],
})
export class AdminzaloPage implements OnInit {
  public danhsach = []
  public danhsachtam = []
  public tukhoa = ""
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/admin')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaozalo', {}).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
      this.locdanhsach()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chonzalo(zalouid) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'chonzalo', {
      userid: this.rest.temp,
      zalouid: zalouid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.init = false
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public locdanhsach() {
    let danhsachtam = []
    this.danhsach.forEach((khachhang) => {
      if (khachhang && khachhang.data && khachhang.data.display_name.search(this.tukhoa) >= 0) danhsachtam.push(khachhang)
    })
    this.danhsachtam = danhsachtam
  }
}
