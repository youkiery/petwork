import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-his',
  templateUrl: './his.page.html',
  styleUrls: ['./his.page.scss'],
})
export class HisPage {
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card',
    2: 'stl-card yellow',
  }
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')   
  }

  public new() {
    this.rest.temp.route = 'new-history'
    this.rest.navCtrl.navigateForward('/modal/insert')
  }

  public async done(index: number) {
    let v = this.rest.vaccine.old[index]
    this.rest.temp = { 
      route: 'history',
      id: v.id,
      petname: v.petname,
      name: v.name,
      phone: v.phone,
      address: v.address,
      typeid: v.typeid,
      note: v.note,
      cometime: this.time.datetoisodate(this.rest.home.today),
      calltime: this.time.datetoisodate(this.rest.home.next) 
    }
    this.rest.navCtrl.navigateForward('/modal/insert')
  }
}
