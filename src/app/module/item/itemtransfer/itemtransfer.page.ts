import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemtransfer',
  templateUrl: './itemtransfer.page.html',
  styleUrls: ['./itemtransfer.page.scss'],
})
export class ItemtransferPage {
  public keyword = ''
  public list = []
  public map = []
  public init = false
  constructor(
    public rest: RestService
  ) { }


  // ionViewWillEnter() {
  //   if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  //   else if (!this.init) this.initiaze()
  // }

  // public initiaze() {
  //   this.rest.item.list.forEach((item) => {
  //     item.number = 0
  //     if (item.checked) this.list.push(item)
  //   })
  //   this.init = true
  // }

  // public change(index: number, number: number) {
  //   this.list[index].number += number 
  //   if (this.list[index].number < 1) this.list[index].number = 1
  // }

  // public view(posid: number) {
  //   this.rest.temp = this.rest.item.image[posid]
  //   this.rest.navCtrl.navigateForward('/modal/detail')
  // }

  // public next() {
  //   let temp = ''
  //   this.list.forEach(item => {
  //     temp += item.name + ': ' + item.number + '\n'
  //   })
  //   this.rest.temp = temp
  //   this.rest.navCtrl.navigateForward('/item/final')
  // }

  // public remove(index: number) {
  //   let temp = this.list.filter((item, i) => {
  //     return i != index
  //   })
  //   if (temp.length) this.list = temp
  //   else this.rest.back()
  // }
}
