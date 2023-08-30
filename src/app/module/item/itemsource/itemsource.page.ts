import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemsource',
  templateUrl: './itemsource.page.html',
  styleUrls: ['./itemsource.page.scss'],
})
export class ItemsourcePage {
  public keyword = ''
  public list = []
  public map = []
  constructor(
    public rest: RestService,
    public alert: AlertController
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
  //   this.rest.item.source.forEach((item, index) => {
  //     if (item.alias.search(key) >= 0) temp.push(index)
  //   })
  //   this.map = temp
  // }

  // // lấy từ danh sách tất cả checked chuyển thành array lưu vào temp.source
  // public save() {
  //   let temp = []
  //   this.list.forEach((item, index) => {
  //     if (item.checked) temp.push(item)
  //   })
  //   this.rest.temp.source = temp
  //   this.rest.back()
  // }

  // public async insert() {
  //   const alert = await this.alert.create({
  //     message: 'Nhập tên nhà cung cấp',
  //     inputs: [{
  //       name: 'name',
  //       type: 'text',
  //       placeholder: 'Nhà cung cấp'
  //     }],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.insertSubmit(e.name)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async insertSubmit(name: string) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'insertsource', {
  //     name: name
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.source.push(resp.data)
  //     this.search()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public initiaze() {
  //   this.rest.item.source.forEach((item, index) => {
  //     let check = false
  //     this.rest.temp.source.forEach((pos) => {
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
