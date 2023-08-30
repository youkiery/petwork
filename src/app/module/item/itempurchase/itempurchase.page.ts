import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-itempurchase',
  templateUrl: './itempurchase.page.html',
  styleUrls: ['./itempurchase.page.scss'],
})
export class ItempurchasePage {
  public init = false
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }


  // ionViewWillEnter() {
  //   if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  //   else if (!this.init) this.initiaze()
  // }

  // public async initiaze() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'purchase', { }).then((resp) => {
  //     this.rest.defreeze()
  //     this.init = true
  //     this.rest.item.purchase = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async purchased() {
  //   let list = {
  //     item: [],
  //     recommend: []
  //   }
  //   this.rest.item.purchase.item.forEach(item => {
  //     if (item.checked) list.item.push(item.id)
  //   })
  //   this.rest.item.purchase.recommend.forEach(item => {
  //     if (item.checked) list.recommend.push(item.id)
  //   })
  //   if (!(list.item.length || list.recommend.length)) this.rest.notify('Chọn ít nhất 1 loại hàng')
  //   else {
  //     await this.rest.freeze('Đang tải dữ liệu...')
  //     this.rest.checkpost('item', 'purchased', {
  //      list: list
  //    }).then((resp) => {
  //      this.rest.defreeze()
  //      this.rest.item.purchase = resp.list
  //    }, () => {
  //      this.rest.defreeze()
  //    })
  //   }
  // }

  // public async remove(id: number) {
  //   const alert = await this.alert.create({
  //     message: 'Xóa đề xuất nhập hàng',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.removeSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'removerecommend', {
  //     id: id
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.purchase = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async removeStock(id: number) {
  //   const alert = await this.alert.create({
  //     message: 'Xóa đề xuất nhập hàng',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.removeStockSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeStockSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'removestock', {
  //     id: id
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.purchase = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async done(id: number) {
  //   const alert = await this.alert.create({
  //     message: 'Xác nhận đã nhập hàng',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.doneSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async doneSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'done', {
  //     id: id
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.purchase = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async update(index: number) {
  //   let item = this.rest.item.purchase.recommend[index]
  //   this.rest.temp = {
  //     id: item.id,
  //     content: item.content,
  //     number: item.number,
  //     name: item.name,
  //     phone: item.phone,
  //     image: item.image
  //   }
  //   this.rest.navCtrl.navigateForward('/item/purchaseinsert')
  // }

  // public async detail(image: string) {
  //   this.rest.temp = image
  //   this.rest.navCtrl.navigateForward('/modal/detail')
  // }

  // public async insert() {
  //   this.rest.temp = {
  //     content: '',
  //     number: '0',
  //     name: '',
  //     phone: '',
  //     image: []
  //   }
  //   this.rest.navCtrl.navigateForward('/item/purchaseinsert')
  // }

  // public info(i: number) {
  //   this.rest.temp = {
  //     action: 'recommend',
  //     data: this.rest.item.purchase.recommend[i]
  //   } 
  //   this.rest.navCtrl.navigateForward('/item/modal')
  // }

  // public async updateStock(itemindex: number) {
  //   let item = this.rest.item.purchase.item[itemindex]
    
  //   const alert = await this.alert.create({
  //     message: 'Số lượng đề xuất nhập',
  //     inputs: [{
  //       placeholder: 'Số lượng',
  //       value: item.outstock,
  //       type: 'text',
  //       name: 'number'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.outstockSubmit(itemindex, this.rest.item.purchase.item[itemindex].id, e.number)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async outstockSubmit(itemindex: number, id: number, number: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'outstock', {
  //     id: id,
  //     number: number
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.purchase.item[itemindex].outstock = resp.value
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
