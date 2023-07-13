import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisexam',
  templateUrl: './hisexam.page.html',
  styleUrls: ['./hisexam.page.scss'],
})
export class HisexamPage {
  public list = {}
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else {
      this.rest.temp.exam.forEach((item: any) => {
        this.rest.his.type.forEach((type, i) => {
          if (type.id == item.id) this.list[i] = true
        })
      });
    }
  }

  public select() {
    let exam = []
    for (const key in this.list) {
      if (Object.prototype.hasOwnProperty.call(this.list, key)) {
        const item = this.list[key];
        if (item) exam.push(this.rest.his.type[key])
      }
    }

    this.rest.temp.exam = exam
    this.rest.back()
  }
}
