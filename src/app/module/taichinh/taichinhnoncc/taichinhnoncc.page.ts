import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-taichinhnoncc',
  templateUrl: './taichinhnoncc.page.html',
  styleUrls: ['./taichinhnoncc.page.scss'],
})
export class TaichinhnonccPage implements OnInit {
  public khoitao = false
  public danhdau = {}
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
    if (bien == 'giatri') {
      this.rest.temp.thanhtoan = this.rest.temp.giatri
    }
    else if (bien = 'thanhtoan') {
      if (Number(this.rest.temp.thanhtoan.toString().replace(/[^0-9]/g, '')) > Number(this.rest.temp.giatri.toString().replace(/[^0-9]/g, ''))) this.rest.temp.thanhtoan = this.rest.temp.giatri
    }
  }

  public async them() {
    if (!this.rest.temp.idnhacungcap) {
      this.rest.notify('Chọn 1 nhà cung cấp!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themnonhacungcap', {
      dulieu: this.rest.temp,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.taichinh.danhsachncc = resp.danhsach
      this.rest.taichinh.tab = '2'
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themnhacungcap() {
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
            this.xacnhanthemnhacungcap(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemnhacungcap(ten: string) {
    if (!ten.length) {
      this.rest.notify('Nhập tên nhà cung cấp!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themnhacungcap', {
      ten: ten
    }).then(resp => {
      this.rest.taichinh.danhsachnhacungcap = resp.danhsach
      this.rest.temp.idnhacungcap = resp.danhsach[resp.danhsach.length - 1].id.toString()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

}
