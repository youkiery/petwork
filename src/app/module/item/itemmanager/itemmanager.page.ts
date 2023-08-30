import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.page.html',
  styleUrls: ['./itemmanager.page.scss'],
})
export class ItemmanagerPage {
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }


  // ionViewWillEnter() {
  //   if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  // }

  // public checkPer(per: number, index: number) {
  //   let check = false
    
  //   this.rest.item.user[index].per.forEach((perd: any) => {
  //     if (perd.id == per) check = true
  //   });
  //   return check
  // }

  // public async update(index: number) {
  //   let option = []
  //   this.rest.item.catlist.forEach((item) => {
  //     option.push({
  //       type: 'checkbox',
  //       name: 'cat',
  //       label: item.name,
  //       value: item.id,
  //       checked: this.checkPer(item.id, index)
  //     })
  //   })

  //   let alert = await this.alert.create({
  //     message: 'Chọn danh mục quản lý',
  //     inputs: option,
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.updateSubmit(index, e)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async updateSubmit(index: number, cat: any) {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   this.rest.checkpost('item', 'per', {
  //     userid: this.rest.item.user[index].userid,
  //     cat: cat
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.item.user[index].storage = resp.storage
  //     this.rest.item.user[index].per = resp.per
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
