import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    await this.rest.freeze('Đang lấy danh sách..')
    this.rest.checkpost('ride', 'init', { }).then(resp => {
      this.rest.defreeze()
      this.rest.ride.list = resp.list
      this.rest.ride.from = resp.from
      this.rest.ride.end = resp.end
    }, () => {
      this.rest.defreeze()
    })
  }

}
