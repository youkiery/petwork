import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itempurchase',
  templateUrl: './itempurchase.page.html',
  styleUrls: ['./itempurchase.page.scss'],
})
export class ItempurchasePage implements OnInit {
  public init = false
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('item')
    else if (!this.init) this.initiaze()
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'purchase', { }).then((resp) => {
      this.rest.defreeze()
      this.init = true
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async purchased() {
    let list = {
      item: [],
      recommend: []
    }
    this.rest.item.purchase.item.forEach(item => {
      if (item.checked) list.item.push(item.id)
    })
    this.rest.item.purchase.recommend.forEach(item => {
      if (item.checked) list.recommend.push(item.id)
    })
    if (!(list.item.length || list.recommend.length)) this.rest.notify('Chọn ít nhất 1 loại hàng')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('item', 'purchased', {
       list: list
     }).then((resp) => {
       this.rest.defreeze()
       this.rest.item.purchase = resp.list
     }, () => {
       this.rest.defreeze()
     })
    }
  }

  public async insert() {
    const alert = await this.alert.create({
      message: 'Ghi nội dung nhập hàng',
      inputs: [{
        name: 'content',
        type: 'text',
        placeholder: 'Nội dung nhập hàng'
      },
      {
        name: 'number',
        type: 'number',
        placeholder: 'Số lượng cần nhập',
      },
      {
        name: 'name',
        type: 'text',
        placeholder: 'Tên khách'
      },
      {
        name: 'phone',
        type: 'text',
        placeholder: 'Số điện thoại'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertSubmit(e)
          }
        }
      ]
    });

    await alert.present();
  }

  public info(i: number) {
    this.rest.temp = {
      action: 'recommend',
      data: this.rest.item.purchase.recommend[i]
    } 
    this.rest.navCtrl.navigateForward('/item/modal')
  }

  public async insertSubmit(data: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'recommend', data).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
