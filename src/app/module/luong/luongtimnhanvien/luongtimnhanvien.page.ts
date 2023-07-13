import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luongtimnhanvien',
  templateUrl: './luongtimnhanvien.page.html',
  styleUrls: ['./luongtimnhanvien.page.scss'],
})
export class LuongtimnhanvienPage {
  public timkiem = ''
  public danhsach = []
  public danhsachtimkiem = []
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'timthemnhanvien', {}).then((phanhoi) => {
      this.rest.defreeze()
      this.danhsach = phanhoi.danhsach
      this.timkiemnhanvien()
    }, () => {
      this.rest.defreeze()
    })
  }

  public timkiemnhanvien() {
    let danhsachtimkiem = []
    let tukhoa = this.rest.alias(this.timkiem)
    this.danhsach.forEach(nhanvien => {
      if (nhanvien.gianluoc.search(tukhoa) >= 0 || nhanvien.taikhoan.search(tukhoa) >= 0) danhsachtimkiem.push(nhanvien)
    });
    this.danhsachtimkiem = danhsachtimkiem
  }

  public chon(i: number) {
    this.rest.temp.id = this.danhsachtimkiem[i].id
    this.rest.navCtrl.navigateForward('/luong/themnhanvien')
  }

  public themnhanvien() {
    this.rest.temp.fullname = '',
    this.rest.temp.username = '',
    this.rest.temp.opassword = '',
    this.rest.temp.password = '',
    this.rest.temp.vpassword = '',
    this.rest.navCtrl.navigateForward('/luong/themnhanvien2')
  }
}
