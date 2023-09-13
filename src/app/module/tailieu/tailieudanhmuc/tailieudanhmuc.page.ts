import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tailieudanhmuc',
  templateUrl: './tailieudanhmuc.page.html',
  styleUrls: ['./tailieudanhmuc.page.scss'],
})
export class TailieudanhmucPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tailieu')
  }

  public async themdanhmuc(thutu: number = -1) {
    let danhmuc = {
      id: 0,
      tendanhmuc: "",
    }
    if (thutu >= 0) danhmuc = this.rest.tailieu.danhmuc[thutu]
    
    let alert = await this.alert.create({
      message: 'Thêm danh mục',
      inputs: [{
        name: "tendanhmuc",
        type: "text",
        value: danhmuc.tendanhmuc,
        placeholder: "Tên Danh mục"
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemdanhmuc(danhmuc.id, e.tendanhmuc)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanthemdanhmuc(id: number, tendanhmuc: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tailieu', 'capnhatdanhmuc', {
      id: id,
      tendanhmuc: tendanhmuc,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.tailieu.danhmuc = resp.danhmuc
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoadanhmuc(id: number) {
    let alert = await this.alert.create({
      message: 'Xoá danh mục',
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
    this.rest.checkpost('tailieu', 'xoadanhmuc', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.tailieu.danhmuc = resp.danhmuc
    }, () => {
      this.rest.defreeze()
    })
  }

}
