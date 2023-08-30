import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-itempurchased',
  templateUrl: './itempurchased.page.html',
  styleUrls: ['./itempurchased.page.scss'],
})
export class ItempurchasedPage {
  public init = false
  public list = []
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
  //   this.rest.checkpost('item', 'getpurchased', { }).then((resp) => {
  //     this.rest.defreeze()
  //     this.init = true
  //     this.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async detail(image: string) {
  //   this.rest.temp = image
  //   this.rest.navCtrl.navigateForward('/modal/detail')
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
  //   this.rest.checkpost('item', 'removerecommended', {
  //     id: id
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
