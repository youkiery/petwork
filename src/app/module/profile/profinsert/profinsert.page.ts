import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profinsert',
  templateUrl: './profinsert.page.html',
  styleUrls: ['./profinsert.page.scss'],
})
export class ProfinsertPage implements OnInit {
  public serial = 0
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
  }

  public update() {
    this.rest.checkpost('target', 'update', this.rest.temp).then(response => {
      this.rest.profile.target = response.list
      this.rest.notify('Đã cập nhật thông tin')
      // this.rest.navCtrl.pop()
    }, () => { })
  }

  public insert() {
    this.rest.checkpost('target', 'insert', this.rest.temp).then(response => {
      this.rest.profile.target = response.list
      this.rest.navCtrl.pop()
    }, () => { })
  }
}
