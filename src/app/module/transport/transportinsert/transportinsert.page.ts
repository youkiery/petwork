import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-transportinsert',
  templateUrl: './transportinsert.page.html',
  styleUrls: ['./transportinsert.page.scss'],
})
export class TransportinsertPage implements OnInit {
  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    if (!this.rest.action) this.rest.root()
  }

  public async insert() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    this.rest.checkpost('transport', 'insert', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.transport.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    this.rest.checkpost('transport', 'update', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.transport.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public remove(i: number) {
    this.rest.temp.transport = this.rest.temp.detail.filter((item: any, index: number) => {
      return index !== i
    })
    if (!this.rest.temp.detail.length) this.add()
  }

  public add() {
    this.rest.temp.detail.push({name: ''})
  }
}
