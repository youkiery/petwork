import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  public init = false
  public list = []
  public text = ''
  public side = ['pos', 'pos side']
  public x = ['', 'x']
  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else this.auto()
  }

  public totime(time: number) {
    return this.time.timetodates(time * 1000)
  }

  public async reload(event: any) {
    await this.auto()
    event.target.complete()
  }

  public async auto() {
    await this.rest.freeze('Đang tải dữ liệu......')
    setTimeout(() => {
      this.rest.checkpost('his', 'getchat', {
        id: this.rest.temp.id,
      }).then((resp) => {
        this.rest.defreeze()
        this.list = resp.list
      }, () => {
        this.rest.defreeze()
      })
    }, 1000);
  }

  public async post() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'postchat', {
      id: this.rest.temp.id,
      text: this.text
    }).then((resp) => {
      this.rest.defreeze()
      this.list = resp.list
      this.text = ''
    }, () => {
      this.rest.defreeze()
    })
  }
}
