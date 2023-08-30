import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itempos',
  templateUrl: './itempos.page.html',
  styleUrls: ['./itempos.page.scss'],
})
export class ItemposPage {
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

  // // lọc danh sách theo từ khóa
  // // tạo 1 danh sách ảo rồi liên kết danh sách
  // public search() {
  //   let temp = []
  //   let key = this.rest.alias(this.keyword)
  //   this.rest.item.position.forEach((item, index) => {
  //     if (item.alias.search(key) >= 0) temp.push(index)
  //   })
  //   this.map = temp
  // }

  // // lấy từ danh sách tất cả checked chuyển thành array lưu vào temp.position
  // public save() {
  //   let temp = []
  //   this.list.forEach((item, index) => {
  //     if (item.checked) temp.push(item)
  //   })
  //   this.rest.temp.position = temp
  //   this.rest.back()
  // }

  // public initiaze() {
  //   this.rest.item.position.forEach((item, index) => {
  //     let check = false
  //     this.rest.temp.position.forEach((pos) => {
  //       if (item.id == pos.id) check = true
  //     })
  //     this.list.push({
  //       id: item.id,
  //       name: item.name,
  //       checked: check
  //     })
  //     this.map.push(index)
  //   })
  // }
}
