import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'modal-spa',
  template: `
    <ion-toolbar color="success">
      <ion-button color="light" fill="clear" (click)="modal.dismiss()">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </ion-button>
    </ion-toolbar>

    <ion-content>
      <img [src]="rest.temp.image">
    </ion-content>
  `
})
export class DrugModal {
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  public module = {
    work: 0, kaizen: 0, schedule: 0, vaccine: 0, spa: 0, item: 0, blood: 0, usg: 0, drug: 0, profile: 0,
  }
  public list = [
    {name: 'Quản lý công việc', module: 'work'},
    {name: 'Kaizen', module: 'kaizen'},
    {name: 'Đăng ký lịch', module: 'schedule'},
    {name: 'Quản lý vaccine', module: 'vaccine'},
    {name: 'Lịch spa', module: 'spa'},
    {name: 'Quản lý hàng hóa', module: 'item'},
    {name: 'Quản lý xét nghiệm', module: 'blood'},
    {name: 'Quản lý siêu âm', module: 'usg'},
    {name: 'Tra cứu thuốc', module: 'drug'},
    {name: 'Quản lý sinh hóa', module: 'profile'},
  ]
  public level = {
    '-1': '', '0': 'Không phận sự', '1': 'Nhân viên', '2': 'Quản lý', '3': ''
  }
  @Input('username') username: string;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public modal: ModalController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
    if (this.rest.action == 'admin') this.module = this.rest.admin.list[this.rest.temp.index].module
    if (this.rest.action == 'blood') this.bloodInit()
  }

  public async bloodInit() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.checkpost('blood', 'statistic', { }).then(response => {
      this.rest.temp = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async view(image: string) {
    this.rest.temp.image = image
    let modal = await this.modal.create({
      component: DrugModal
    })
    await modal.present()
  }

  async drugUpdate() {
    if (this.rest.config.drug < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.temp = {
        index: this.rest.temp.index,
        id: this.rest.drug.list[this.rest.temp.index]['id'],
        name: this.rest.drug.list[this.rest.temp.index]['name'],
        limits: this.rest.drug.list[this.rest.temp.index]['limits'],
        effect: this.rest.drug.list[this.rest.temp.index]['effect'],
        sideeffect: this.rest.drug.list[this.rest.temp.index]['sideeffect'],
        mechanic: this.rest.drug.list[this.rest.temp.index]['mechanic'],
        image: this.rest.drug.list[this.rest.temp.index]['image'],
      }
      this.rest.navCtrl.navigateForward('/modal/upload')
    }
  }

  public async cartpick() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('cart', 'pick', {
      id: this.rest.cart.list[this.rest.temp].id
    }).then(resp => {
      this.rest.cart.list[this.rest.temp].status = resp.status
      this.rest.cart.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async cartdonealert() {
    const alert = await this.alert.create({
      message: 'Sau khi hoàn thành, đơn hàng sẽ bị xóa khỏi danh sách',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.cartdone()
          }
        }
      ]
    });
    await alert.present();
  }

  public async cartdone() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('cart', 'done', {
      id: this.rest.cart.list[this.rest.temp].id
    }).then(resp => {
      this.rest.cart.list = resp.list
      this.rest.defreeze()
      this.rest.navCtrl.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async save() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('admin', 'update', {
      module: this.module,
      id: this.rest.admin.list[this.rest.temp.index].userid
    }).then(resp => {
      this.rest.admin.list[this.rest.temp.index].module = this.module
      this.rest.config = resp.config
      this.rest.defreeze()
      this.rest.navCtrl.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(module: string, increase: number) {
    this.module[module] = Number(this.module[module]) + increase
    if (this.module[module] < 0) this.module[module] = 0
    else if (this.module[module] > 2) this.module[module] = 2
  }
}
