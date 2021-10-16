import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewDidEnter() {
    this.rest.ready().then(() => {
      this.init()
    })
  }

  public async init() {
    if (!this.rest.cart.init) {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('cart', 'auto', { }).then(resp => {
        this.rest.cart.init = true
        this.rest.cart.list = resp.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public detail(index: number) {
    this.rest.temp = index
    this.rest.navCtrl.navigateForward('/cart/detail')
  }

  // public async filter() {
  //   await this.rest.freeze('Đang tải danh sách')
  //   this.rest.checkpost('cart', 'search', {
  //     filter: this.rest.cart.filter
  //   }).then(resp => {
  //     this.rest.cart.list = resp.list
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public insert() {
  //   this.rest.action = 'cart'
  //   this.rest.temp = { id: 0, name: '', phone: '', cart: 0, cometime: this.rest.home.today, calltime: this.rest.config.next }
  //   this.rest.navCtrl.navigateForward('/modal/insert')
  // }

  // public update(index: number) {
  //   this.rest.action = 'cart'
  //   this.rest.temp = {
  //     id: this.rest.cart.list[index].id,
  //     name: this.rest.cart.list[index].name,
  //     phone: this.rest.cart.list[index].phone,
  //     cart: Number(this.rest.diseaseIndex(this.rest.cart.list[index].cart)),
  //     cometime: this.rest.cart.list[index].cometime,
  //     calltime: this.rest.cart.list[index].calltime,
  //   }
  //   this.rest.navCtrl.navigateForward('/modal/insert')
  // }

  // public async called(index: number) {
  //   let note = 'Gọi nhắc ngày: ' + this.rest.home.today
  //   if (this.rest.cart.list[index].note.length) note = this.rest.cart.list[index].note
  //   const alert = await this.alert.create({
  //     message: 'Đã gọi khách hàng, lịch nhắc sẽ lặp lại sau 1 tuần',
  //     inputs: [{
  //       type: 'text',
  //       label: 'Ghi chú',
  //       name: 'note',
  //       value: note
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.calledSubmit(index, e.note)
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // public async calledSubmit(index: number, note: string) {
  //   await this.rest.freeze('Đang thay đổi trạng thái')
  //   this.rest.checkpost('cart', 'called', {
  //     id: this.rest.cart.list[index].id,
  //     note: note,
  //     filter: this.rest.cart.filter
  //   }).then(resp => {
  //     this.rest.cart.list = resp.list
  //     this.rest.notify('Đã thay đổi trạng thái')
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async uncalled(index: number) {
  //   let note = 'Gọi nhắc ngày: ' + this.rest.home.today
  //   if (this.rest.cart.list[index].note.length) note = this.rest.cart.list[index].note
  //   const alert = await this.alert.create({
  //     message: 'Đã gọi nhưng khách không bắt máy, mai gọi lại',
  //     inputs: [{
  //       type: 'text',
  //       label: 'Ghi chú',
  //       name: 'note',
  //       value: note
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.uncalledSubmit(index, e.note)
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // public async uncalledSubmit(index: number, note: string) {
  //   await this.rest.freeze('Đang thay đổi trạng thái')
  //   this.rest.checkpost('cart', 'uncalled', {
  //     id: this.rest.cart.list[index].id,
  //     note: note,
  //     filter: this.rest.cart.filter
  //   }).then(resp => {
  //     this.rest.cart.list = resp.list
  //     this.rest.notify('Đã thay đổi trạng thái')
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async dead(index: number) {
  //   const alert = await this.alert.create({
  //     message: 'Hoàn thành tiêm phòng, lịch nhắc sẽ không xuất hiện nữa',
  //     inputs: [{
  //       type: 'text',
  //       label: 'Ghi chú',
  //       name: 'note',
  //       value: this.rest.cart.list[index].note
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.deadSubmit(index, e.note)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async deadSubmit(index: number, note: string = '') {
  //   await this.rest.freeze('Đang thay đổi trạng thái')
  //   this.rest.checkpost('cart', 'dead', {
  //     id: this.rest.cart.list[index].id,
  //     note: note,
  //     filter: this.rest.cart.filter
  //   }).then((resp) => {
  //     this.rest.cart.list = resp.list
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
