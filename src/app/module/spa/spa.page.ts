import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';


@Component({
  selector: 'modal-spa',
  template: `
    <ion-toolbar color="success">
      <ion-button color="light" fill="clear" (click)="modal.dismiss()">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </ion-button>
    </ion-toolbar>

    <ion-content>
      <img [src]="rest.temp">
    </ion-content>
  `
})
export class SpaModal {
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }
}

@Component({
  selector: 'app-spa',
  templateUrl: './spa.page.html',
  styleUrls: ['./spa.page.scss'],
})
export class SpaPage {
  interval = null
  checked = false
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
    public modal: ModalController
  ) { }

  async ionViewDidEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.data.spa.init) {
        this.rest.data.spa.time = (new Date()).getTime()
        this.filter()
      }
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa', 'auto', {
      action: 'spa-auto',
      time: this.rest.data.spa.time
    }).then((resp) => {
      this.rest.data.spa.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(image: string) {
    this.rest.temp = image
    let modal = await this.modal.create({
      component: SpaModal
    })
    await modal.present()
  }

  public insert() {
    this.rest.temp = {
      id: 0,
      name: '',
      phone: '',
      note: '',
      image: [],
      time: this.rest.data.spa.time
    }
    this.rest.action = 'spa'
    this.rest.router.navigateByUrl('/upload')
  }

  public async pickDate() {
    let current = this.time.timetodate(this.rest.data.spa.time).split('/')
    let target = current[2] + '-' + current[1] + '-' + current[0]
    let alert = await this.alert.create({
      header: 'Chọn ngày',
      inputs: [
        {
          label: 'Ngày',
          name: 'date',
          type: 'date',
          value: target
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Chọn ngày',
          cssClass: 'secondary',
          handler: (e) => {
            let result = e.date.split('-')
            this.rest.data.spa.time = this.time.datetotime(result[2] + '/' + result[1] + '/' + result[0])
            this.filter()
          }
        }
      ]
    })
    alert.present()
  }

  public async changeDate(amount: number) {
    this.rest.data.spa.time += amount * 60 * 60 * 24 * 1000
    this.filter()
  }
}

