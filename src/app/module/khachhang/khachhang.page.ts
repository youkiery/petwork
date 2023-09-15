import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.page.html',
  styleUrls: ['./khachhang.page.scss'],
})
export class KhachhangPage implements OnInit {
  public loaikhachhang = ["SPA", "Điều trị"]
  public trangthai = ["Khách chưa đến", "Khách đã đến", "Khách huỷ đặt lịch"]
  public mautrangthai = ["black", "green", "red"]
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'khachhang'
      if (!this.rest.khachhang.khoitao) {
        this.rest.khachhang.tungay = this.time.datetoisodate(this.rest.home.today)
        this.rest.khachhang.denngay = this.time.datetoisodate(this.rest.home.today)
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitao', {
      tukhoa: this.rest.khachhang.tukhoa,
      tungay: this.rest.khachhang.tungay,
      denngay: this.rest.khachhang.denngay,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.khoitao = true
      this.rest.khachhang.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public chuyenspa(thutu: number) {
    let khachhang = this.rest.khachhang.danhsach[thutu]
    // nếu là điều trị thì hỏi xác nhận
    if (khachhang.loaikhachhang == 1) {
      this.xacnhanden(khachhang.id)
      return
    }

    // chuyển thông tin sang model spa, thêm vào spa
    if (!this.rest.spa.init) {
      let firstDay = this.time.datetotime(this.rest.home.today);
      let lastDay = this.time.datetotime(this.rest.home.today);
      this.rest.spa.search.start = this.time.timetoisodate(firstDay)
      this.rest.spa.search.end = this.time.timetoisodate(lastDay)
    }
    
    this.rest.temp = {
      id: 0,
      name: khachhang.tenkhach,
      phone: khachhang.dienthoai,
      name2: '',
      phone2: '',
      note: khachhang.ghichu,
      tinhcach: '',
      weight: 0,
      treat: 0,
      image: [],
      option: khachhang.iddichvu,
      filter: this.rest.spa.search,
      did: 1,
      khonglam: 0,
      number: 1,
      khachhang: khachhang.id,
      duser: khachhang.idnhanvien
    }
    setTimeout(() => {
      this.rest.navCtrl.navigateForward('/spa')
      setTimeout(() => {
        this.rest.navCtrl.navigateForward('/spa/insert')
      }, 100)
    }, 100)
    this.rest.back()
  }

  public async xuatfile() {
    await this.rest.freeze()
    this.rest.checkpost('khachhang', 'xuatfile', {
    }).then(resp => {
      this.rest.defreeze()
      window.open(resp.link)
    }, () => {
      this.rest.defreeze()
    })
  }

  public henngay(thutu: number) {
    // chuyển sang modal chọn ngày
    let khachhang = this.rest.khachhang.danhsach[thutu]
    this.rest.temp = {
      id: khachhang.id,
      loai: khachhang.loai,
      ngayhen: this.time.datetoisodate(khachhang.thoigian),
    }
    this.rest.navCtrl.navigateForward("/khachhang/henngay")
  }

  public homnay() {
    this.rest.navCtrl.navigateForward("/khachhang/homnay")
  }

  public danhgia() {
    this.rest.navCtrl.navigateForward("/khachhang/danhgia")
  }

  public async khongden(id: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận khách không đặt lịch nữa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhankhongden(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhankhongden(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let khachhang = this.rest.khachhang.danhsach[thutu]
    this.rest.checkpost('khachhang', 'khongden', {
      id: khachhang.id,
      loai: khachhang.loai,
      tukhoa: this.rest.khachhang.tukhoa,
      tungay: this.rest.khachhang.tungay,
      denngay: this.rest.khachhang.denngay,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.khachhang.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanden(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận khách đã đến?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhandaden(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhandaden(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'dadendieutri', {
      id: id
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.khachhang.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public chuyenmon() {
    this.rest.navCtrl.navigateForward("/khachhang/chuyenmon")
  }
}
