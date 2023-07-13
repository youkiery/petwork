import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-taichinhthemchi',
  templateUrl: './taichinhthemchi.page.html',
  styleUrls: ['./taichinhthemchi.page.scss'],
})
export class TaichinhthemchiPage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/taichinh')
  }

  public nhaptien(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }
  
  public async them() {
    if (!this.rest.temp.idloaichi) {
      this.rest.notify('Chọn 1 loại chi')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themchi', {
      dulieu: this.rest.temp,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.taichinh.danhsachchi = resp.danhsach
      this.rest.taichinh.tab = '1' 
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async themloaichi() {
    let alert = await this.alert.create({
      message: 'Nhập loại chi',
      inputs: [{
        name: 'ten',
        type: 'text',
        value: ''
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemloaichi(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemloaichi(ten: string) {
    if (!ten.length) {
      this.rest.notify('Nhập loại chi!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themloaichi', {
      ten: ten
    }).then(resp => {
      this.rest.taichinh.danhsachloaichi = resp.danhsach
      this.rest.temp.idloaichi = resp.danhsach[resp.danhsach.length - 1].id
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
