import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-loinhuancauhinh',
  templateUrl: './loinhuancauhinh.page.html',
  styleUrls: ['./loinhuancauhinh.page.scss'],
})
export class LoinhuancauhinhPage implements OnInit {
  public tilespa = {
    loinhuanbanhang: 0,
    loinhuanspa: 0,
    chietkhaubanhang: 0,
    chietkhauspa: 0,
  }
  public tilebanhang = []
  public danhsachnhanvien = []
  public buttoncolor = ['pos gray', 'pos']
  public buttoncolor2 = ['pos', 'pos warning']
  public danhsachtam = []
  public tukhoa = ''
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/loinhuan')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitaocauhinh', {}).then(resp => {
      this.rest.defreeze()
      this.tilespa = resp.tilespa
      this.tilebanhang = resp.tilebanhang
      this.danhsachnhanvien = resp.danhsachnhanvien
      this.locnhanvien()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitaocauhinh', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.tilespa = resp.tilespa
      this.tilebanhang = resp.tilebanhang
      this.danhsachnhanvien = resp.danhsachnhanvien
      this.locnhanvien()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async capnhatcophan(userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'laythongtincophan', {
      userid: userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      this.rest.navCtrl.navigateForward('/vattu/themcophan')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doianbangluong() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'anbangluong', { }).then(resp => {
      this.rest.defreeze()
      this.rest.loinhuan.anbangluong = resp.anbangluong
    }, () => {
      this.rest.defreeze()
    })
  }

  public locnhanvien() {
    let tukhoa = this.rest.alias(this.tukhoa)
    this.danhsachtam = this.danhsachnhanvien.filter((nhanvien) => {
      var tennhanvien = this.rest.alias(nhanvien.fullname)
      return tennhanvien.search(tukhoa) >= 0
    })
  }

  public nhaptien(bien: string, thutu: number) {
    let tam = Number(this.tilebanhang[thutu][bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.tilebanhang[thutu][bien] = this.rest.comma(tam)
  }

  public async xoatile(thutu: number) {
    let tile = this.tilebanhang[thutu]
    if (tile.id > 0) {
      let alert = await this.alert.create({
        message: 'Xóa tỉ lệ',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.xacnhanxoatile(tile.id)
            }
          }
        ]
      });
  
      await alert.present();
    }
    else {
      this.tilebanhang = this.tilebanhang.filter((item, index) => {
        return index !== thutu
      })
    }
  }

  public async xacnhanxoatile(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'xoatile', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.tilebanhang = resp.tile
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luutile() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'luutile', {
      tile: this.tilebanhang
    }).then(resp => {
      this.rest.defreeze()
      this.tilebanhang = resp.tile
    }, () => {
      this.rest.defreeze()
    })
  }

  public themtile() {
    this.tilebanhang.push({
      id: 0, khoang: '0', tien: '0'
    })
  }

  public capnhat(thutu: number) {
    var luong = this.danhsachnhanvien[thutu]
    this.rest.temp = {
      userid: luong.userid,
      tenkiot: luong.tenkiot,
      luongcoban: this.rest.comma(luong.luongcoban),
      phucap: this.rest.comma(luong.phucap),
      lenluong: this.rest.comma(luong.lenluong),
      tiletietkiem: luong.tiletietkiem,
      kyhopdong: (luong.kyhopdong == 'Chưa lập' ? this.time.datetoisodate(this.rest.home.today) : this.time.datetoisodate(luong.kyhopdong)),
      tamnghi: Number(luong.tamnghi) > 0,
      heluong: Number(luong.heluong) > 0,
      tilethuong: luong.tilethuong
    }
    this.rest.navCtrl.navigateForward('/loinhuan/themcauhinh')
  }

  public heluong(giatri: string) {
    if (Number(giatri) > 0) return 'Lương bán hàng'
    return 'Lương điều trị'
  }

  public nhaptile(bien: string) {
    let tam = this.tilespa[bien]
    if (!tam.length) tam = '0'
    if (Number(tam) > 100) tam = '100'
    if (Number(tam) < 0 || Number.isNaN(Number(tam))) tam = '0'
    this.tilespa[bien] = tam
  }

  public async thaydoigiatri(bien: string, giatri: string, userid: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'thaydoigiatri', {
      bien: bien,
      giatri: giatri,
      userid: userid,
    }).then(resp => {
      this.rest.defreeze()
      this.danhsachnhanvien = resp.danhsachnhanvien
      this.locnhanvien()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'luucauhinh', {
      cauhinh: this.tilespa
    }).then(resp => {
      this.rest.defreeze()
      this.tilespa = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }
}
