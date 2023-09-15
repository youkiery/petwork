import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workdepart',
  templateUrl: './workdepart.page.html',
  styleUrls: ['./workdepart.page.scss'],
})
export class WorkdepartPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
  }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'khoitao', { 
      timkiem: this.rest.congviec.timkiem
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.congviec.khoitao = true
      this.rest.congviec.danhsach = resp.danhsach
      this.rest.congviec.danhmuc = resp.danhmuc
      this.rest.congviec.nhanvien = resp.nhanvien
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public themdanhmuc(parentid: number = 0) {
    let list = []
    this.rest.congviec.nhanvien.forEach((nhanvien: any) => {
      list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })
    this.rest.temp = {
      id: 0,
      parentid: parentid,
      name: '',
      list: list,
    }
    this.rest.navCtrl.navigateForward('/work/departinsert')
  }

  public suadanhmuc(thutu: number = 0) {
    let danhmuc = this.rest.congviec.danhmuc[thutu]
    this.rest.temp = {
      id: danhmuc.id,
      parentid: danhmuc.parentid,
      name: danhmuc.name,
      list: danhmuc.nhanvien,
    }
    this.rest.navCtrl.navigateForward('/work/departinsert')
  }

  public async xoadanhmuc(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa danh mục?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoadanhmuc(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoadanhmuc(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'xoadanhmuc', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.congviec.danhmuc = resp.danhmuc
    }, () => {
      this.rest.defreeze()
    })
  }
}
