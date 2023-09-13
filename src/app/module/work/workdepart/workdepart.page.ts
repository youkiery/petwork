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

  public back() {
    if (this.rest.congviec.child.length) {
      this.rest.congviec.child = []
      this.rest.congviec.childid = -1
    }
    else this.rest.back()
  }

  public gochild(i: number) {
    this.rest.congviec.childid = i
    this.rest.congviec.child = this.rest.congviec.danhmuc[i].child 
  }

  public themdanhmuc() {
    let list = []
    this.rest.congviec.nhanvien.forEach((nhanvien: any) => {
      list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })
    let child = 0
    if (this.rest.congviec.childid >= 0) child = this.rest.congviec.danhmuc[this.rest.congviec.childid].id
    this.rest.temp = {
      name: '',
      child: child,
      list: list
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
      if (this.rest.congviec.child.length) this.rest.congviec.child = this.rest.congviec.danhmuc[this.rest.congviec.childid].child
    }, () => {
      this.rest.defreeze()
    })
  }

  public themnhanvien(i: number) {
    let danhmuc = this.rest.congviec.danhmuc[i]
    let list = []
    this.rest.congviec.nhanvien.forEach((nhanvien: any) => {
      if (danhmuc.list[nhanvien.userid]) list.push({ value: true, userid: nhanvien.userid, name: nhanvien.fullname })
      else list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })

    this.rest.temp = {
      id: danhmuc.id,
      name: danhmuc.name,
      list: list
    }
    this.rest.navCtrl.navigateForward('/work/departinsert')
  }

  public themnhanvien2(i: number) {
    let danhmuc = this.rest.congviec.child[i]
    let list = []
    this.rest.congviec.nhanvien.forEach((nhanvien: any) => {
      if (danhmuc.list[nhanvien.userid]) list.push({ value: true, userid: nhanvien.userid, name: nhanvien.fullname })
      else list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })

    this.rest.temp = {
      id: danhmuc.id,
      name: danhmuc.name,
      list: list
    }
    this.rest.navCtrl.navigateForward('/work/departinsert')
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'danhmuc', { }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.congviec.danhmuc = resp.danhmuc
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
