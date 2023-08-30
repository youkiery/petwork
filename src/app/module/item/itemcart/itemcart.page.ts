import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemcart',
  templateUrl: './itemcart.page.html',
  styleUrls: ['./itemcart.page.scss'],
})
export class ItemcartPage {
  public keyword = ''
  public list = []
  public map = []
  constructor(
    public rest: RestService
  ) { }


  // ionViewWillEnter() {
  //   if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  //   else this.initiaze()
  // }

  // public initiaze() {
  //   this.rest.item.list.forEach((item) => {
  //     item.number = 0
  //     if (item.checked) this.list.push(item)
  //   })
  // }

  // public async save() {
  //   let list = []
  //   this.list.forEach(item => {
  //     list.push({
  //       id: item.id,
  //       number: item.number
  //     })
  //   })

  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'outstocks', {
  //     data: list
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.toggle = !this.rest.item.toggle;
  //     this.rest.item.list.forEach((item, index) => {
  //       this.rest.item.list[index].checked = false
  //     })
  //     this.rest.back()
  //     this.rest.freeze('Đang chuyển hướng...')
  //     setTimeout(() => {
  //       this.rest.navCtrl.navigateForward('/item/purchase')
  //       this.rest.defreeze()
  //     }, 500);
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public remove(index: number) {
  //   let temp = this.list.filter((item, i) => {
  //     return i != index
  //   })
  //   if (temp.length) this.list = temp
  //   else this.rest.back()
  // }
}
