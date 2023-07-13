import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-othertype',
  templateUrl: './othertype.page.html',
  styleUrls: ['./othertype.page.scss'],
})
export class OthertypePage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/other')
  }
  
  public async insert() {
    let alert = await this.alert.create({
      message: 'Thêm loại xét nghiệm',
      inputs: [{ 
        name: 'name',
        type: 'text',
        placeholder: 'Tên dịch vụ',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertSubmit(name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'inserttype', {
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.other.type = resp.list
      this.rest.his.init = false
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async update(index: number) {
    let alert = await this.alert.create({
      message: 'Cập nhật loại xét nghiệm',
      inputs: [{ 
        name: 'name',
        type: 'text',
        placeholder: 'Tên dịch vụ',
        value: this.rest.other.type[index].name}
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updateSubmit(this.rest.other.type[index].id, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async updateSubmit(id: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'updatetype', {
      id: id,
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.other.type = resp.list
      this.rest.his.init = false
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.other.type = resp.list
      this.rest.his.init = false
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async remove(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa loại xét nghiệm',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }
  
}