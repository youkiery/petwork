import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage {
  public cate = {
    key: ['', 'user', 'admin', 'vaccine', 'usg', 'spa', 'schedule', 'item', 'cart', 'his', 'kaizen', 'drug', 'blood', 'bio', 'price', 'vehicle', 'transport'],
    name: ['Chọn danh mục', 'Người dùng', 'Quản lý', 'Quản lý vaccine', 'Quản lý siêu âm', 'Lịch spa', 'Đăng ký lịch', 'Quản lý hàng hóa', 'Bán hàng online', 'Lưu bệnh', 'Kaizen', 'Tra cứu thuốc', 'Xét nghiệm sinh lý', 'Xét nghiệm sinh hóa', 'Giá sỉ', 'Quản lý xe', 'Danh sách vận chuyển', ],
  }
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'manual'
      if (!this.rest.manual.init) this.initiaze()
      else if (this.rest.manual.key.length) this.search()
    })
  }

  public insert() {
    this.rest.temp = {
      title: '',
      module: 'vaccine',
      list: [{
        type: 0, content: ''
      }]
    }
    this.rest.navCtrl.navigateForward('/manual/insert')
  }

  public update(index: number) {
    let item = this.rest.manual.data[index]
    this.rest.temp = {
      id: item.id,
      title: item.title,
      module: item.module,
      list: item.list
    }
    this.rest.navCtrl.navigateForward('/manual/insert')
  }

  public open(index: number) {
    this.rest.manual.selected = index
    this.rest.navCtrl.navigateForward('/manual/detail')
  }

  public search() {
    let temp = []
    let key = this.rest.alias(this.rest.manual.key)
    
    this.rest.manual.data.forEach((data, index) => {
      if ((this.rest.manual.cate == '' || this.rest.manual.cate == data.module) && this.deepsearch(key, data.title)) {
        if (!temp[data.module]) {
          let key = this.cate.key.indexOf(data.module)
          temp[data.module] = {
            name: this.cate.name[key],
            list: []
          }
        }
        temp[data.module].list.push(index)
      }
    })
    let list = [] 
    for (const key in temp) {
      if (Object.prototype.hasOwnProperty.call(temp, key)) {
        const data = temp[key];
        list.push(data)
      }
    }
    
    this.rest.manual.list = list
  }

  public deepsearch(keyword: string, content: string) {
    content = this.rest.alias(content)
    if (content.search(keyword) >= 0) return true 
    return false
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      header: 'Xóa bài hướng dẫn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('manual', 'remove', {
      id: this.rest.manual.data[index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.manual.init = true
      this.rest.manual.data = resp.list
      this.search()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('manual', 'init', {  }).then(resp => {
      this.rest.defreeze()
      this.rest.manual.init = true
      this.rest.manual.data = resp.list
      this.search()
    }, () => {
      this.rest.defreeze()
    })
  }
}
