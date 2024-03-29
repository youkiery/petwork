import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tailieuthem',
  templateUrl: './tailieuthem.page.html',
  styleUrls: ['./tailieuthem.page.scss'],
})
export class TailieuthemPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tailieu')
  }

  public async capnhattailieu() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tailieu', 'capnhattailieu', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.tailieu.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
