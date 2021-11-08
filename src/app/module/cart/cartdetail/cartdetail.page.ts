import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.page.html',
  styleUrls: ['./cartdetail.page.scss'],
})
export class CartdetailPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('cart')
  }
  
  public async cartpick() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('cart', 'pick', {
      id: this.rest.cart.list[this.rest.temp].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.cart.list[this.rest.temp].status = resp.status
      this.rest.cart.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async cartdonealert() {
    const alert = await this.alert.create({
      message: 'Sau khi hoàn thành, đơn hàng sẽ bị xóa khỏi danh sách',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.cartdone()
          }
        }
      ]
    });
    await alert.present();
  }

  public async cartdone() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('cart', 'done', {
      id: this.rest.cart.list[this.rest.temp].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.cart.list = resp.list
      this.rest.navCtrl.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
