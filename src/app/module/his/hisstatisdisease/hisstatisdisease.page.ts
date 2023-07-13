import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisstatisdisease',
  templateUrl: './hisstatisdisease.page.html',
  styleUrls: ['./hisstatisdisease.page.scss'],
})
export class HisstatisdiseasePage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/his')
  }

  public reload() {
    let text = []
    for (const key in this.rest.his.d.list) {
      if (Object.prototype.hasOwnProperty.call(this.rest.his.d.list, key)) {
        if (this.rest.his.d.list) text.push(this.searchdisease(key))
      }
    }
    this.rest.his.d.text = text.join(', ')
  }

  public searchdisease(diseaseid: string) {
    let name = ''
    this.rest.his.disease.forEach(disease => {
      if (disease.id == diseaseid) name = disease.name
    })
    return name
  }
}

