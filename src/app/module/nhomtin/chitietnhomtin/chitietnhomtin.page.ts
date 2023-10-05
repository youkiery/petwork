import { Component, OnInit } from '@angular/core';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
// import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
  selector: 'app-chitietnhomtin',
  templateUrl: './chitietnhomtin.page.html',
  styleUrls: ['./chitietnhomtin.page.scss'],
})
export class ChitietnhomtinPage implements OnInit {
  public trangthai = ['Chưa gửi', 'Đã gửi', 'Không gửi được']
  public classtrangthai = ['stl-card', 'stl-card green', 'stl-card red']
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public sms: SMS,
    // public insomnia: Insomnia
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhomtin')
    else this.khoitaobodem()
    KeepAwake.keepAwake()
    // this.insomnia.keepAwake()
  }

  ionViewWillLeave() {
    KeepAwake.allowSleep();
    // this.insomnia.allowSleepAgain()
  }

  public khoitaobodem() {
    this.rest.nhomtin.bodem = {
      thanhcong: 0,
      thatbai: 0,
      dagui: 0,
      batdau: 0,
      tieptheo: 0,
      tongcong: this.rest.nhomtin.danhsachnhan.length,
      min: this.rest.nhomtin.cauhinhnhantin.min * (this.rest.nhomtin.danhsachnhan.length - 1),
      max: this.rest.nhomtin.cauhinhnhantin.max * (this.rest.nhomtin.danhsachnhan.length - 1),
      tile: 0,
      thutu: 0,
      dautien: true
    }
    this.rest.nhomtin.danggui = false
    this.rest.nhomtin.hoanthanh = false
    this.rest.nhomtin.dangguitin = false

    this.rest.nhomtin.danhsachnhan.forEach(nhantin => {
      if (nhantin.dagui == 1) {
        this.rest.nhomtin.bodem.dagui ++
        this.rest.nhomtin.bodem.thanhcong ++
      }
    })

    clearInterval(this.rest.nhomtin.demgio)
    clearTimeout(this.rest.nhomtin.hengio)
  }

  public async xacnhandoiten(thutu: number) {
    let khachhang = this.rest.nhomtin.danhsachnhan[thutu]
    
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
    this.rest.checkpost('nhomtin', 'doitenkhach', {
      ten: ten,
      idkhachhang: idkhachhang,
      id: this.rest.nhomtin.id,
      mautin: this.rest.nhomtin.mautin
    }).then(resp => {
      this.rest.nhomtin.danhsachnhan = resp.danhsach
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
    this.rest.checkpost('nhomtin', 'xoanhantin', {
      idlienket: this.rest.nhomtin.danhsachnhan[thutu].id,
      id: this.rest.nhomtin.id,
      mautin: this.rest.nhomtin.mautin
    }).then(resp => {
      this.rest.nhomtin.danhsachnhan = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
    this.rest.nhomtin.danggui = true
    this.rest.nhomtin.hoanthanh = false
    this.rest.nhomtin.dangguitin = false
    this.rest.nhomtin.bodem = {
      thanhcong: 0,
      thatbai: 0,
      dagui: 0,
      batdau: 0,
      tieptheo: 0,
      tongcong: this.rest.nhomtin.bodem.tongcong,
      min: this.rest.nhomtin.cauhinhnhantin.min * this.rest.nhomtin.bodem.tongcong,
      max: this.rest.nhomtin.cauhinhnhantin.max * this.rest.nhomtin.bodem.tongcong,
      tile: 0,
      thutu: 0,
      dautien: true
    }

    this.rest.nhomtin.danhsachnhan.forEach(nhantin => {
      if (nhantin.dagui == 1) {
        this.rest.nhomtin.bodem.dagui ++
        this.rest.nhomtin.bodem.thanhcong ++
      }
    })

    this.rest.nhomtin.demgio = setInterval(() => {
      this.rest.nhomtin.bodem.batdau++
      this.rest.nhomtin.bodem.tieptheo--
    }, 1000)
    this.guitin()
  }

  public guitin() {
    // thời gian gửi tin 90 - 150
    let nhantin = { dienthoai: '', mautin: '', id: '', idkhachang: '' }
    while (this.rest.nhomtin.bodem.thutu < this.rest.nhomtin.bodem.tongcong && !this.rest.nhomtin.dangguitin) {
      if (this.rest.nhomtin.danhsachnhan[this.rest.nhomtin.bodem.thutu].dagui != 1) {
        this.rest.nhomtin.dangguitin = true

        var thoigiannhan = 0
        if (this.rest.nhomtin.bodem.dautien) this.rest.nhomtin.bodem.dautien = false
        else thoigiannhan = this.rest.nhomtin.cauhinhnhantin.min * 1000 + Math.floor(Math.random() * (this.rest.nhomtin.cauhinhnhantin.max - this.rest.nhomtin.cauhinhnhantin.min) * 1000)
        this.rest.nhomtin.bodem.tieptheo = Math.floor(thoigiannhan / 1000)
        
        this.rest.nhomtin.hengio = setTimeout(() => {
          nhantin = this.rest.nhomtin.danhsachnhan[this.rest.nhomtin.bodem.thutu]
          this.rest.nhomtin.dangguitin = false
          this.sms.send(nhantin.dienthoai, nhantin.mautin, {
            replaceLineBreaks: true
          }).then(() => {
            this.rest.nhomtin.bodem.dagui++
            this.rest.nhomtin.bodem.thanhcong++
            this.rest.nhomtin.danhsachnhan[this.rest.nhomtin.bodem.thutu].dagui = 1
            this.xacnhandagui(nhantin.id, nhantin.idkhachang)
            if (!this.kiemtrahoanthanh()) this.guitin()
          }, (e) => {
            this.rest.nhomtin.bodem.dagui++
            this.rest.nhomtin.bodem.thatbai++
            this.rest.nhomtin.danhsachnhan[this.rest.nhomtin.bodem.thutu].dagui = 2
            this.rest.storage.get('loichuongtrinh').then(danhsach => {
              if (!danhsach) danhsach = []
              danhsach.push({
                idlienket: nhantin.id,
                idkhachhang: nhantin.idkhachang
              })
              this.rest.storage.set('loichuongtrinh', danhsach)
            })
            if (!this.kiemtrahoanthanh()) this.guitin()
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
    this.rest.nhomtin.danggui = false
    clearInterval(this.rest.nhomtin.demgio)
    clearTimeout(this.rest.nhomtin.hengio)
  }

  public kiemtrahoanthanh() {
    this.rest.nhomtin.bodem.thutu++
    this.rest.nhomtin.bodem.tile = this.rest.nhomtin.bodem.dagui / this.rest.nhomtin.bodem.tongcong
    if (this.rest.nhomtin.bodem.dagui == this.rest.nhomtin.bodem.tongcong) {
      this.rest.nhomtin.hoanthanh = true
      this.rest.nhomtin.danggui = false
      clearInterval(this.rest.nhomtin.demgio)
      clearTimeout(this.rest.nhomtin.hengio)
      return 1
    }
    return 0
  }

  public async xacnhandagui(idlienket: string, idkhachhang: string) {
    this.rest.checkpost('nhomtin', 'xacnhandagui', {
      idlienket: idlienket,
      idkhachhang: idkhachhang,
    }).then(resp => { }, () => {
      this.rest.storage.get('loichuongtrinh').then(danhsach => {
        if (!danhsach) danhsach = []
        danhsach.push({
          idlienket: idlienket,
          idkhachhang: idkhachhang
        })
        this.rest.storage.set('loichuongtrinh', danhsach)
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
    this.rest.checkpost('nhomtin', 'xacnhanthucong', {
      idlienket: this.rest.nhomtin.danhsachnhan[thutu].id,
      id: this.rest.nhomtin.id,
      mautin: this.rest.nhomtin.mautin
    }).then(resp => {
      this.rest.nhomtin.danhsachnhan = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
