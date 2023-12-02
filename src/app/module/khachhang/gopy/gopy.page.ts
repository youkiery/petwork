import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-gopy',
  templateUrl: './gopy.page.html',
  styleUrls: ['./gopy.page.scss'],
})
export class GopyPage implements OnInit {
  public danhsach = []
  public trang = 1
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaogopy', {
      trang: this.trang
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async tailai(e: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaogopy', {
      trang: 1
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete()
      this.trang = 1
      this.danhsach = resp.danhsach
    }, () => {
      e.target.complete()
      this.rest.defreeze()
    })
  }

  public async taithem(e: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.trang ++
    this.rest.checkpost('khachhang', 'khoitaogopy', {
      trang: this.trang
    }).then(resp => {
      this.rest.defreeze()
      e.target.complete();
      resp.danhsach.forEach(gopy => {
        this.danhsach.push(gopy)
      });
    }, () => {
      e.target.complete()
      this.rest.defreeze()
    })
  }
}
