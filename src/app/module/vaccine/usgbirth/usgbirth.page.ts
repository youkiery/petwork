import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usgbirth',
  templateUrl: './usgbirth.page.html',
  styleUrls: ['./usgbirth.page.scss'],
})
export class UsgbirthPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('vaccine')
  }

  public async save(id: number, data: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'birth', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
      this.usgCal()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public usgCal() {
    for (let i = 0; i < 3; i++) {
      this.rest.usg.uncalled[i] = this.rest.usg.list[i].filter((item: any) => {
        return item.over == 1
      }).length
    }
  }
}
