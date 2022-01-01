import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kaizeninsert',
  templateUrl: './kaizeninsert.page.html',
  styleUrls: ['./kaizeninsert.page.scss'],
})
export class KaizeninsertPage implements OnInit {

  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
  }
  
  public async save() {
    let action = 'insert'
    if (this.rest.temp.id) action = 'edit'
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('kaizen', action, {
      data: this.rest.temp,
      filter: this.rest.kaizen.filter
    }).then(data => {
      this.rest.kaizen.list = data['list']
      this.rest.defreeze()
      this.rest.back()
    }, (e) => {
      this.rest.defreeze()
    })
  }
}