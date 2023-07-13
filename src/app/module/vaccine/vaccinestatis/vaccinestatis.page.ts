import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccinestatis',
  templateUrl: './vaccinestatis.page.html',
  styleUrls: ['./vaccinestatis.page.scss'],
})
export class VaccinestatisPage {
  public list = []
  public segment = 'vaccine'
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
    else this.initiaze()
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'statis', {}).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public checkvaccine() {
    return this.list.filter((item: any) => {
      return (item.uncall.length || item.vaccine.length)
    }).length
  }

  public checkusg() {
    return this.list.filter((item: any) => {
      return (item.usg.length || item.prog.length || item.birth.length || item.unbirth.length)
    }).length
  }
}
