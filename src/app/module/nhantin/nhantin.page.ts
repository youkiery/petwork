import { Component, OnInit } from '@angular/core';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';
import { KeepAwake } from '@capacitor-community/keep-awake';
// import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-nhantin',
  templateUrl: './nhantin.page.html',
  styleUrls: ['./nhantin.page.scss'],
})
export class NhantinPage implements OnInit {
  public trangthai = ['Chưa gửi tin', 'Đã gửi', 'Không gửi được']
  public classtrangthai = ['stl-card', 'stl-card green', 'stl-card red']
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
    public sms: SMS,
    // public insomnia: Insomnia
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.storage.get('xacnhanloi').then(danhsach => {
        this.xacnhandanhsachloi(danhsach).then(res => {
          if (!this.rest.nhantin.khoitaonhantin) {
            this.rest.nhantin.thoigian = this.time.datetoisodate(this.rest.home.today)
            this.khoitao()
          }
        })
      })
      this.rest.action = 'nhantin'
      KeepAwake.keepAwake()
      // this.insomnia.keepAwake()
    })
  }

  ionViewWillLeave() {
    KeepAwake.allowSleep();
    // this.insomnia.allowSleepAgain()
  }

  public async xacnhandanhsachloi(danhsach: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    return new Promise(resolve => {
      if (danhsach && danhsach.length) {
        this.rest.checkpost('admin', 'xacnhandanhsachloi', {
          danhsach: danhsach
        }).then(resp => {
          this.rest.storage.set('xacnhanloi', [])
          this.rest.defreeze()
          resolve(1)
        }, () => {
          this.rest.defreeze()
          resolve(1)
        })
      }
      else {
        this.rest.defreeze()
        resolve(1)
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaonhantin', {
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.khoitaonhantin = true
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.nhantin.cauhinhnhantin = resp.cauhinh
      this.khoitaobodem()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaonhantin', {
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.khoitaonhantin = true
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.nhantin.cauhinhnhantin = resp.cauhinh
      this.khoitaobodem()
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public khoitaobodem() {
    this.rest.nhantin.bodem = {
      thanhcong: 0,
      thatbai: 0,
      dagui: 0,
      batdau: 0,
      tieptheo: 0,
      tongcong: this.rest.nhantin.danhsachnhantin.length,
      min: this.rest.nhantin.cauhinhnhantin.min * (this.rest.nhantin.danhsachnhantin.length - 1),
      max: this.rest.nhantin.cauhinhnhantin.max * (this.rest.nhantin.danhsachnhantin.length - 1),
      tile: 0,
      thutu: 0,
      dautien: true
    }

    this.rest.nhomtin.danhsachnhan.forEach(nhantin => {
      if (nhantin.trangthai == 1) {
        this.rest.nhomtin.bodem.dagui++
        this.rest.nhomtin.bodem.thanhcong++
      }
    })

    this.rest.nhantin.danggui = false
    this.rest.nhantin.hoanthanh = false
    this.rest.nhantin.dangguitin = false
    clearInterval(this.rest.nhantin.demgio)
    clearTimeout(this.rest.nhantin.hengio)
  }

  public async xacnhandoiten(thutu: number) {
    let khachhang = this.rest.nhantin.danhsachnhantin[thutu]
    const alert = await this.alert.create({
      header: 'Nhập tên khách hàng',
      inputs: [{
        name: 'ten',
        value: khachhang.khachhang
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doiten(e.ten, khachhang.idkhachhang)
          }
        }
      ]
    });
    await alert.present();
  }

  public async doiten(ten: string, idkhachhang: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'doitenkhach', {
      ten: ten,
      idkhachhang: idkhachhang,
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhandoidienthoai(thutu: number) {
    let khachhang = this.rest.nhantin.danhsachnhantin[thutu]
    const alert = await this.alert.create({
      header: 'Nhập tên khách hàng',
      inputs: [{
        name: 'dienthoai',
        value: khachhang.dienthoai
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doidienthoai(e.dienthoai, khachhang.idkhachhang)
          }
        }
      ]
    });
    await alert.present();
  }

  public async doidienthoai(dienthoai: string, idkhachhang: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'doidienthoai', {
      dienthoai: dienthoai,
      idkhachhang: idkhachhang,
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoanhantin(thutu: number) {
    const alert = await this.alert.create({
      header: 'Loại bỏ khách hàng khỏi danh sách nhắc',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoatinnhan(thutu)
          }
        }
      ]
    });
    await alert.present();
  }

  public async xacnhanxoatinnhan(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xoanhantin', {
      idkhachhang: this.rest.nhantin.danhsachnhantin[thutu].idkhachhang,
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthucong(thutu: number) {
    const alert = await this.alert.create({
      header: 'Đánh dấu đã nhắn tin',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhan(thutu)
          }
        }
      ]
    });
    await alert.present();
  }

  public async xacnhan(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xacnhanthucong', {
      id: this.rest.nhantin.danhsachnhantin[thutu].id,
      idmautin: this.rest.nhantin.danhsachnhantin[thutu].idmautin,
      thoigian: this.rest.nhantin.thoigian
    }).then(resp => {
      this.rest.nhantin.danhsachnhantin = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public cauhinh() {
    this.rest.navCtrl.navigateForward('/nhantin/cauhinhnhantin')
  }

  public async guitinnhan() {
    const alert = await this.alert.create({
      header: 'Xác nhận gửi những tin nhắn này',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanguitinnhan()
          }
        }
      ]
    });
    await alert.present();
  }

  public xacnhanguitinnhan() {
    // tạo bộ đếm thành công/thất bại
    // thành công => lưu server
    // thất bại => để lại danh sách
    this.rest.nhantin.danggui = true
    this.rest.nhantin.hoanthanh = false
    this.rest.nhantin.dangguitin = false
    this.rest.nhantin.bodem = {
      thanhcong: 0,
      thatbai: 0,
      dagui: 0,
      batdau: 0,
      tieptheo: 0,
      tongcong: this.rest.nhantin.bodem.tongcong,
      min: this.rest.nhantin.cauhinhnhantin.min * this.rest.nhantin.bodem.tongcong,
      max: this.rest.nhantin.cauhinhnhantin.max * this.rest.nhantin.bodem.tongcong,
      tile: 0,
      thutu: 0,
      dautien: true
    }

    this.rest.nhomtin.danhsachnhan.forEach(nhantin => {
      if (nhantin.trangthai == 1) {
        this.rest.nhomtin.bodem.dagui++
        this.rest.nhomtin.bodem.thanhcong++
      }
    })

    this.rest.nhantin.demgio = setInterval(() => {
      this.rest.nhantin.bodem.batdau++
      this.rest.nhantin.bodem.tieptheo--
    }, 1000)
    this.guitin()
  }

  public guitin() {
    // thời gian gửi tin 90 - 150
    let nhantin = { dienthoai: '', mautin: '', id: '', idmautin: '' }
    while (this.rest.nhantin.bodem.thutu < this.rest.nhantin.bodem.tongcong && !this.rest.nhantin.dangguitin) {
      if (this.rest.nhantin.danhsachnhantin[this.rest.nhantin.bodem.thutu].trangthai != 1) {
        this.rest.nhantin.dangguitin = true

        var thoigiannhan = 0
        if (this.rest.nhantin.bodem.dautien) this.rest.nhantin.bodem.dautien = false
        else thoigiannhan = this.rest.nhantin.cauhinhnhantin.min * 1000 + Math.floor(Math.random() * (this.rest.nhantin.cauhinhnhantin.max - this.rest.nhantin.cauhinhnhantin.min) * 1000)
        this.rest.nhantin.bodem.tieptheo = Math.floor(thoigiannhan / 1000)

        this.rest.nhantin.hengio = setTimeout(() => {
          nhantin = this.rest.nhantin.danhsachnhantin[this.rest.nhantin.bodem.thutu]
          this.rest.nhantin.dangguitin = false
          this.sms.send(nhantin.dienthoai, nhantin.mautin, {
            replaceLineBreaks: true
          }).then(() => {
            this.rest.nhantin.bodem.dagui++
            this.rest.nhantin.bodem.thanhcong++
            this.rest.nhantin.danhsachnhantin[this.rest.nhantin.bodem.thutu].trangthai = 1
            this.xacnhandagui(nhantin.id, nhantin.idmautin)
            this.kiemtrahoanthanh()
            this.guitin()
          }, (e) => {
            this.rest.nhantin.bodem.dagui++
            this.rest.nhantin.bodem.thatbai++
            this.rest.nhantin.danhsachnhantin[this.rest.nhantin.bodem.thutu].thongbaoloi = e
            this.rest.nhantin.danhsachnhantin[this.rest.nhantin.bodem.thutu].trangthai = 2
            this.kiemtrahoanthanh()
            this.guitin()
          })
        }, thoigiannhan);
      }
      else this.kiemtrahoanthanh()
    }
  }

  public themxuongdong(vanban: string) {
    return vanban.replace(/\n/g, '<br>')
  }

  public dagui() {
    this.rest.navCtrl.navigateForward('/nhantin/tindagui')
  }

  public ngunggui() {
    this.rest.nhantin.danggui = false
    clearInterval(this.rest.nhantin.demgio)
    clearTimeout(this.rest.nhantin.hengio)
  }

  public kiemtrahoanthanh() {
    this.rest.nhantin.bodem.thutu++
    this.rest.nhantin.bodem.tile = this.rest.nhantin.bodem.dagui / this.rest.nhantin.bodem.tongcong
    if (this.rest.nhantin.bodem.dagui == this.rest.nhantin.bodem.tongcong) {
      this.rest.nhantin.hoanthanh = true
      this.rest.nhantin.danggui = false
      clearInterval(this.rest.nhantin.demgio)
      clearTimeout(this.rest.nhantin.hengio)
    }
  }

  public async xacnhandagui(id: string, idmautin: string) {
    this.rest.checkpost('admin', 'xacnhandagui', {
      id: id,
      idmautin: idmautin
    }).then(resp => { }, () => {
      this.rest.storage.get('xacnhanloi').then(danhsach => {
        if (!danhsach) danhsach = []
        danhsach.push({
          id: id,
          idmautin: idmautin
        })
        this.rest.storage.set('xacnhanloi', danhsach)
      })
    })
  }

  public chuyengiaysangphut(giay: number) {
    if (giay < 0) return 'Đang gửi...'
    else if (giay < 60) return this.diensohangchuc(giay) + 's'

    let phut = Math.floor(giay / 60)
    return this.diensohangchuc(phut) + '\'' + this.diensohangchuc(giay - 60 * phut) + 's'
  }

  public diensohangchuc(so: number) {
    if (so > 9) return so
    return '0' + so
  }

  public thongke() {
    this.rest.navCtrl.navigateForward('/nhantin/thongke')
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetotime(this.rest.nhantin.thoigian) + 60 * 60 * 24 * 1000 * songay
    this.rest.nhantin.thoigian = this.time.timetoisodate(ngay)
  }
}
