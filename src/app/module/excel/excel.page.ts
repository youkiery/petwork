import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.page.html',
  styleUrls: ['./excel.page.scss'],
})
export class ExcelPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    this.rest.action = 'excel'
  }

  public change(action: string) {
    this.rest.action = action
    this.rest.navCtrl.navigateForward('/excel/manager')
  }
}
