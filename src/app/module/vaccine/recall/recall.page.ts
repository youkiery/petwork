import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-recall',
  templateUrl: './recall.page.html',
  styleUrls: ['./recall.page.scss'],
})
export class RecallPage {
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card',
    2: 'stl-card yellow',
  }
  public selected = {}
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')    
  }

  public selectbox(id: number) {
    this.selected[id] = !this.selected[id]
  }

  public getselectedid() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        if (this.selected[key]) list.push(this.rest.temp.list[key].id)
      }
    }
    return list
  }

  public getselectedindex() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        list.push(key)
      }
    }
    return list
  }

  public async done() {
    let index = this.getselectedindex()
    if (!index.length) this.rest.notify('Chưa chọn danh sách') 
    else {
      const alert = await this.alert.create({
        message: 'Hoàn thành lịch nhắc?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              switch (this.rest.action) {
                case 'vaccine':
                  this.doneSubmit(index)
                break;
                case 'usg':
                  this.doneUsgSubmit(index)
                break;
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async doneSubmit(index: string[]) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'donerecall', {
      list : this.getselectedid(),
      docs: this.rest.home.default.docs,
      docscover: this.rest.home.default.docscover,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.new = resp.new
      this.rest.temp.list = this.rest.temp.list.filter((item: any, i: string) => {
        if (index.indexOf(i.toString()) < 0) return true
      })
      this.selected = {}
      
      if (!this.rest.temp.list.length) {
        if (this.rest.temp.prv) this.rest.navCtrl.navigateBack('/vaccine/manager')
        else this.rest.navCtrl.back()
      } 
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doneUsgSubmit(index: number[]) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'done', {
      index: this.getselectedid(),
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
