import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattuchontang',
  templateUrl: './vattuchontang.page.html',
  styleUrls: ['./vattuchontang.page.scss'],
})
export class VattuchontangPage implements OnInit {
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
    else {
      this.danhdau = {}
      this.rest.vattu.danhsachtang.forEach((tang => {
        if (this.rest.vattu.loctang[tang.id]) this.danhdau[tang.id] = true
        else this.danhdau[tang.id] = false
      }))
      this.khoitao = true
    }
  }

  public xacnhan() {
    this.rest.vattu.loctang = []
    this.rest.vattu.danhsachtang.forEach((tang => {
      if (this.danhdau[tang.id]) this.rest.vattu.loctang[tang.id] = tang.ten
    }))
    this.khoitaothongke()
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

  public async khoitaothongke() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitao', {
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.danhsachtang = resp.danhsachtang
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
