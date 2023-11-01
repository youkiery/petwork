import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hansudungthem',
  templateUrl: './hansudungthem.page.html',
  styleUrls: ['./hansudungthem.page.scss'],
})
export class HansudungthemPage {
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hansudung')
  }

  public async xacnhan( ) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'themhansudung', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.hansudung.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}