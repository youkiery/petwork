import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-histemp',
  templateUrl: './histemp.page.html',
  styleUrls: ['./histemp.page.scss'],
})
export class HistempPage {
  public list = []
  public init = false
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else if (!this.init) this.initiaze()
  }
  
  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'temp', {
      name: this.rest.temp.name,
      phone: this.rest.temp.phone
    }).then((resp) => {
      this.rest.defreeze()
      this.init = true
      this.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    let item = this.list[index]
    this.rest.temp.id = item.id
    this.rest.temp.name = item.customer
    this.rest.temp.phone = item.phone
    this.rest.temp.pet = item.pet
    this.rest.temp.petid = item.petid
    this.rest.temp.eye = item.eye
    
    this.rest.temp.temperate = item.temperate
    this.rest.temp.other = item.other
    this.rest.temp.status = Number(item.status)
    this.rest.navCtrl.navigateForward('/his/insert')
  }

  public insert() {
    this.rest.navCtrl.navigateForward('/his/insert')
  }
}
