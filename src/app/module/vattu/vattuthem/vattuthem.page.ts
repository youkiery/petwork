import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattuthem',
  templateUrl: './vattuthem.page.html',
  styleUrls: ['./vattuthem.page.scss'],
})
export class VattuthemPage implements OnInit {
  public danhdau = {}
  public khoitao = false
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
    else if (!this.khoitao) {
      this.danhdau = {}
      this.rest.vattu.danhsachtang.forEach((tang => {
        if (this.rest.temp.thuoctang[tang.id]) this.danhdau[tang.id] = true
        else this.danhdau[tang.id] = false
      }))
      this.khoitao = true
    }
  }

  public nhaptien(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }
  
  public nhaptile(bien: string) {
    let tam = this.rest.temp[bien]
    if (!tam.length) tam = '0'
    if (Number(tam) > 100) tam = '100'
    if (Number(tam) < 0 || Number.isNaN(Number(tam))) tam = '0'
    this.rest.temp[bien] = tam
  }

  public danhsachloctang() {
    var danhsach = []
    for (const key in this.rest.vattu.loctang) {
      if (Object.prototype.hasOwnProperty.call(this.rest.vattu.loctang, key)) {
        danhsach.push(key)
      }
    }
    return danhsach    
  }

  public async them() {
    var canhbao = ''
    if (!this.rest.temp.ten.length) canhbao = 'Tên vật tư trống!!!';
    else if (this.rest.purenumber(this.rest.temp.soluong) < 1) canhbao = 'Số lượng nhỏ hơn 1!!!';
    if (canhbao.length) {
      this.rest.notify(canhbao)
      return 0
    }

    this.rest.temp.thuoctang = {}

    for (const key in this.danhdau) {
      if (Object.prototype.hasOwnProperty.call(this.danhdau, key)) {
        if (this.danhdau[key]) this.rest.temp.thuoctang[key] = 1
      }
    }

    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'themvattu', {
      dulieu: this.rest.temp,
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.tongtien = resp.tongtien
      this.lochanghoa()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public lochanghoa() {
    let danhsachtam = []
    let tukhoa = this.rest.alias(this.rest.vattu.tukhoa)
    this.rest.vattu.dulieu.danhsach.forEach(vattu => {
      if (this.rest.alias(vattu.ten).indexOf(tukhoa) >= 0) danhsachtam.push(vattu)
    })
    this.rest.vattu.danhsachtam = danhsachtam
  }

  public async themtang() {
    let alert = await this.alert.create({
      message: 'Nhập tên tầng mới',
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
            this.xacnhanthemtang(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemtang(ten: string) {
    if (!ten.length) {
      this.rest.notify('Tên tầng trống!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'themtang', {
      ten: ten
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.danhsachtang = resp.danhsachtang
    }, () => {
      this.rest.defreeze()
    })
  }
}
