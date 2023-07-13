import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workinsertfollow',
  templateUrl: './workinsertfollow.page.html',
  styleUrls: ['./workinsertfollow.page.scss'],
})
export class WorkinsertfollowPage {
  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
  }

  public doifollow() {
    let text = []
    this.rest.temp[this.rest.action].list.forEach((nhanvien: any) => {
      if (nhanvien.value) text.push(nhanvien.name)
    });
    this.rest.temp[this.rest.action].text = text.join(', ')
  }
}
