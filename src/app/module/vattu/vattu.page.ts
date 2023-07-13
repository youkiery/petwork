import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.page.html',
  styleUrls: ['./vattu.page.scss'],
})
export class VattuPage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'vattu'
      if (!this.rest.vattu.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitao', {
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.khoitao = true
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.danhsachtang = resp.danhsachtang
      this.rest.vattu.danhsachnhanvien = resp.danhsachnhanvien
      this.rest.vattu.tongtien = resp.tongtien
      this.lochanghoa()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitao', {
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.vattu.khoitao = true
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.danhsachtang = resp.danhsachtang
      this.rest.vattu.danhsachnhanvien = resp.danhsachnhanvien
      this.rest.vattu.tongtien = resp.tongtien
      this.lochanghoa()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
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

  public chontang() {
    this.rest.navCtrl.navigateForward('/vattu/chontang')
  }

  public cophan() {
    this.rest.navCtrl.navigateForward('/vattu/cophan')
  }

  public hienthiloctang() {
    var loctang = []

    if (Object.keys(this.rest.vattu.loctang).length) {
      for (const key in this.rest.vattu.loctang) {
        if (Object.prototype.hasOwnProperty.call(this.rest.vattu.loctang, key)) {
          loctang.push(this.rest.vattu.loctang[key])
        }
      }
      return loctang.join(', ')
    }
    return 'Toàn bộ'
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

  public themvattu() {
    this.rest.temp = {
      id: 0,
      ten: '',
      donvi: '',
      soluong: '1',
      thoigian: this.time.datetoisodate(this.rest.home.today),
      giatri: '0',
      tile: '0',
      thuoctang: [],
      ghichu: '',
      chivattu: false,
      idchi: 0,
    }
    this.rest.navCtrl.navigateForward('/vattu/them')
  }

  public danhsachtang() {
    this.rest.navCtrl.navigateForward('/vattu/tang')
  }

  public import() {
    this.rest.navCtrl.navigateForward('/vattu/vattuimport')
  }

  public async xacnhanxuat() {
    let alert = await this.alert.create({
      message: 'Xuất file excel vật tư đang lọc',
      buttons: [{
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xuatfile()
          }
        }
      ]
    })
    alert.present()
  }

  public async xuatfile() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'xuatfile', {
      danhsach: this.rest.vattu.danhsachtam
    }).then(resp => {
      window.open(resp.link)
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa(idvattu: number) {
    let alert = await this.alert.create({
      message: 'Xóa vật tư này?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xacnhanxoa(idvattu)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoa(idvattu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'xoavattu', {
      idvattu: idvattu,
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.tongtien = resp.tongtien
      this.lochanghoa()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chivattu(idvattu: number) {
    let alert = await this.alert.create({
      message: 'Chi vật tư cố định?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanchivattu(idvattu)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanchivattu(idvattu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'chivattu', {
      idvattu: idvattu,
      loctang: this.danhsachloctang()
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vattu.dulieu = resp.dulieu
      this.rest.vattu.tongtien = resp.tongtien
      this.lochanghoa()
    }, () => {
      this.rest.defreeze()
    })
  }

  public capnhat(thutu: number) {
    var vattu = this.rest.vattu.danhsachtam[thutu]
    this.rest.temp = {
      id: vattu.id,
      ten: vattu.ten,
      donvi: vattu.donvi,
      soluong: vattu.soluong,
      thoigian: this.time.datetoisodate(vattu.thoigian),
      giatri: vattu.giatri,
      tile: vattu.tile,
      ghichu: vattu.ghichu,
      thuoctang: vattu.tang,
      chivattu: vattu.chivattu,
      idchi: vattu.idchi,
    }
    this.rest.navCtrl.navigateForward('/vattu/them')
  }
}
