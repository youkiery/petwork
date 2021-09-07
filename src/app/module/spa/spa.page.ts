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
  public status = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card yellow',
    3: 'stl-card red',
  }
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

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.data.spa.list[index].id,
      name: this.rest.data.spa.list[index].name,
      phone: this.rest.data.spa.list[index].phone,
      note: this.rest.data.spa.list[index].note,
      image: this.rest.data.spa.list[index].image,
      option: this.rest.data.spa.list[index].option,
      time: this.rest.data.spa.time
    }
    this.rest.action = 'spa'
    this.rest.router.navigateByUrl('/upload')
  }
  
  public async called(index: number) {
    const alert = await this.alert.create({
      message: 'Đã gọi cho khách?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async calledSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'called', {
      id: this.rest.data.spa.list[index].id,
    }).then((resp) => {
      this.rest.data.spa.list[index].status = resp.status
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async returned(index: number) {
    const alert = await this.alert.create({
      message: 'Thú cưng đã đón về?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.returnedSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async returnedSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'returned', {
      id: this.rest.data.spa.list[index].id,
    }).then((resp) => {
      this.rest.data.spa.list[index].status = resp.status
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async done(index: number) {
    const alert = await this.alert.create({
      message: 'Hoàn thành mục spa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'done', {
      id: this.rest.data.spa.list[index].id,
    }).then((resp) => {
      this.rest.data.spa.list[index].status = resp.status
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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

