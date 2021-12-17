import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itempurchase',
  templateUrl: './itempurchase.page.html',
  styleUrls: ['./itempurchase.page.scss'],
})
export class ItempurchasePage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('item')
    else this.initiaze()
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'purchase', { }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async purchased() {
    await this.rest.freeze('Đang tải dữ liệu...')
    let list = []
    this.rest.item.purchase.forEach(item => {
      if (item.checked) list.push(item.id)
    })
    if (!list.length) this.rest.notify('Chọn ít nhất 1 loại hàng')
    else this.rest.checkpost('item', 'purchased', {
      list: list
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
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
        value: 5
      },
      {
        name: 'customer',
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

  public async insertSubmit(data: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'purchase', { }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.purchase = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
