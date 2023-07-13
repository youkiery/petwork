import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-kaizen',
  templateUrl: './kaizen.page.html',
  styleUrls: ['./kaizen.page.scss'],
})
export class KaizenPage {
  interval: any
  constructor(
    public alert: AlertController,
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'kaizen'
      this.init()
    })
  }

  public async init() {
    if (!this.rest.kaizen.init) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.kaizen.filter.starttime = this.rest.home.month.start
      this.rest.kaizen.filter.endtime = this.rest.home.month.end
      this.rest.checkpost('kaizen', 'init', {
        filter: this.rest.kaizen.filter
      }).then(data => {
        this.rest.kaizen.init = true
        this.rest.kaizen.list = data.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }
  
  public clear(name: string) {
    this.rest.kaizen.filter[name] = ''
  }

  public async detail(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.kaizen.filter.done = 1
    this.rest.kaizen.filter.undone = 1

    this.rest.checkpost('kaizen', 'init', {
      filter: this.rest.kaizen.filter
    }).then(data => {
      this.rest.kaizen.list = data['list']
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async checker(id: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành sẽ không thể hoàn tác',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.checkerSubmit(id)
          }
        }
      ]
    })
    alert.present()
  }

  public async checkerSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('kaizen', 'done', {
      id: id,
      type: this.rest.kaizen.segment,
      filter: this.rest.kaizen.filter
    }).then(data => {
      this.rest.kaizen.list = data['list']
      this.rest.kaizen.segment = 'done'
      this.rest.badge.init = false
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  public async edit(index: number = 0) {
    let item = this.rest.kaizen.list[this.rest.kaizen.segment][index]
    this.rest.temp = {
      id: item.id,
      problem: item.problem,
      solution: item.solution,
      result: item.result,
      image: item.image,
      noidungdongdoi: item.noidungdongdoi,
      noidungtugiac: item.noidungtugiac,
      hinhanhdongdoi: item.hinhanhdongdoi,
      hinhanhtugiac: item.hinhanhtugiac,
      filter: this.rest.kaizen.filter
    }
    this.rest.navCtrl.navigateForward('/kaizen/insert')
  }

  public async insert() {
    this.rest.temp = {
      problem: '',
      solution: '',
      result: '',
      image: [],
      noidungdongdoi: '',
      noidungtugiac: '',
      hinhanhdongdoi: [],
      hinhanhtugiac: [],
      filter: this.rest.kaizen.filter
    }
    this.rest.navCtrl.navigateForward('/kaizen/insert')
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Giải pháp sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở vể',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('kaizen', 'remove', {
      action: 'kaizen-remove',
      id: id,
      filter: this.rest.kaizen.filter
    }).then((data) => {
      this.rest.kaizen.unread = data['unread']
      this.rest.kaizen.time = data['time']
      this.rest.kaizen.list = data['list']
      this.rest.badge.init = false
      this.rest.defreeze()
    }, (error) => {
      this.rest.defreeze()
    })
  }

  public loadData(event) {
    this.rest.kaizen.filter[this.rest.kaizen.segment] += 1

    this.filter().then(() => {
      event.target.complete();
    })
  }
}