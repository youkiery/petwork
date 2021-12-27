import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-accold',
  templateUrl: './accold.page.html',
  styleUrls: ['./accold.page.scss'],
})
export class AccoldPage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('accounting')   
    else if (!this.rest.accounting.init) {
      this.rest.accounting.start = this.rest.home.month.start
      this.rest.accounting.end = this.rest.home.month.end
      this.initiaze()
    }
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'old', {
      start: this.rest.accounting.start,
      end: this.rest.accounting.end,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.accounting.init = true
      this.rest.accounting.old = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public select(index: number) {
    let item = JSON.parse(this.rest.accounting.old[index].content)
    this.rest.accounting.total = item.total
    this.rest.accounting.checkout = item.data
    this.rest.back()
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      header: 'Xóa lịch sử kế toán',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(this.rest.accounting.old[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'remove', {
      id: id,
      start: this.rest.accounting.start,
      end: this.rest.accounting.end,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.accounting.old = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
