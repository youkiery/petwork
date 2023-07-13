import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisdinsertisease',
  templateUrl: './hisdinsertisease.page.html',
  styleUrls: ['./hisdinsertisease.page.scss'],
})
export class HisdinsertiseasePage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/his')
  }

  public reload() {
    let text = []
    for (const key in this.rest.temp.disease.list) {
      if (Object.prototype.hasOwnProperty.call(this.rest.temp.disease.list, key)) {
        text.push(this.searchdisease(key))
      }
    }
    this.rest.temp.disease.text = text.join(', ')
  }

  public searchdisease(diseaseid: string) {
    let name = ''
    this.rest.his.disease.forEach(disease => {
      if (disease.id == diseaseid) name = disease.name
    })
    return name
  }
}
