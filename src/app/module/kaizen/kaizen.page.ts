import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-kaizen',
  templateUrl: './kaizen.page.html',
  styleUrls: ['./kaizen.page.scss'],
})
export class KaizenPage implements OnInit {
  autoupdate: boolean = false
  interval: any
  constructor(
    public alert: AlertController,
    public modal: ModalController,
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    if (!this.rest.data.drug.init) {
      await this.rest.freeze('Đang lấy dữ liệu...')
      this.rest.checkpost('kaizen', 'init', {  }).then(data => {
        this.rest.data.kaizen.init = 1
        this.rest.data.kaizen.list = data.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  
  public clear(name: string) {
    this.rest.data.kaizen.filter[name] = ''
  }

  public async filter() {
    await this.rest.freeze('Đang lấy dữ liệu')
    this.rest.data.kaizen.page = { undone: 1, done: 1 }

    this.rest.checkpost('kaizen', 'init', this.rest.data.kaizen.filter).then(data => {
      this.rest.data.kaizen.list = data['list']
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  // public filter() {
  //   return new Promise((resolve) => {
  //     if (!this.autoupdate) {
  //       this.autoupdate = true
  //       this.rest.checkpost('kaizen', 'auto', {
  //         starttime: this.time.datetotime(this.rest.data.kaizen.filter.starttime),
  //         endtime: this.time.datetotime(this.rest.data.kaizen.filter.endtime),
  //         keyword: this.rest.data.kaizen.filter.keyword,
  //         type: this.rest.data.kaizen.reversal_segment[this.rest.data.kaizen.segment],
  //         page: this.rest.data.kaizen.page[this.rest.data.kaizen.segment],
  //         sort: this.rest.data.kaizen.filter.sort,
  //       }).then(data => {
  //         this.autoupdate = false
  //         if (data['list']) {
  //           this.rest.data.kaizen.unread = data['unread']
  //           this.rest.data.kaizen.time = data.time
  //           if (data.list) this.rest.data.kaizen.data[this.rest.data.kaizen.segment] = this.rest.data.kaizen.data[this.rest.data.kaizen.segment].concat(data.list)
  //           resolve('')
  //         }
  //       }, (e) => {
  //         resolve('')
  //       })
  //     }
  //   })
  // }

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
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.checkpost('kaizen', 'check', {
      id: id,
      type: this.rest.data.kaizen.reversal_segment[this.rest.data.kaizen.segment],
      starttime: this.time.datetotime(this.rest.data.kaizen.filter.starttime),
      endtime: this.time.datetotime(this.rest.data.kaizen.filter.endtime),
      keyword: this.rest.data.kaizen.filter.keyword,
      page1: this.rest.data.kaizen.page.undone,
      page2: this.rest.data.kaizen.page.done,
      sort: this.rest.data.kaizen.filter.sort
    }).then(data => {
      this.rest.data.kaizen.data = data['list']
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  // public async edit(insert = false, index: number = 0) {
  //   this.rest.data.kaizen.insert = insert
  //   if (insert) {
  //     this.rest.data.kaizen.edit = {
  //       id: 0,
  //       problem: '',
  //       solution: '',
  //       result: '',
  //     }
  //   }
  //   else {
  //     let current = this.rest.data.kaizen.data[this.rest.data.kaizen.segment][index]
  //     this.rest.data.kaizen.edit = {
  //       id: current['id'],
  //       problem: current['problem'],
  //       solution: current['solution'],
  //       result: current['result']
  //     }
  //   }
  //   let modal = await this.modal.create({
  //     component: EditPage
  //   })
  //   modal.present()    
  // }

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
    await this.rest.freeze('Đang xóa giải pháp')
    this.rest.checkpost('kaizen', 'remove', {
      action: 'kaizen-remove',
      id: id,
      starttime: this.time.datetotime(this.rest.data.kaizen.filter.starttime),
      endtime: this.time.datetotime(this.rest.data.kaizen.filter.endtime),
      keyword: this.rest.data.kaizen.filter.keyword,
      page: this.rest.data.kaizen.page[this.rest.data.kaizen.segment],
      type: this.rest.data.kaizen.segment,
      sort: this.rest.data.kaizen.filter.sort
    }).then((data) => {
      this.rest.data.kaizen.unread = data['unread']
      this.rest.data.kaizen.time = data['time']
      this.rest.data.kaizen.data = data['list']
      this.rest.defreeze()
    }, (error) => {
      this.rest.defreeze()
    })
  }

  public loadData(event) {
    this.rest.data.kaizen.page[this.rest.data.kaizen.segment] += 1

    this.filter().then(() => {
      event.target.complete();
    })
  }
}