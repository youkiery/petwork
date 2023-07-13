import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luongsosanh',
  templateUrl: './luongsosanh.page.html',
  styleUrls: ['./luongsosanh.page.scss'],
})
export class LuongsosanhPage {
  public chedo = {
    'luongcoban': "Lương cơ bản",
    'luongthuong': "Lương thưởng",
    'luongphucap': "Lương phụ cấp",
  }
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
    else if (!this.rest.luong.sosanh.khoitao) this.sosanh()
  }

  public async sosanh() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'sosanh', {
      thoigian: this.rest.luong.sosanh.thoigian
    }).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.sosanh.khoitao = true
      this.rest.luong.sosanh.danhsach = phanhoi.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
