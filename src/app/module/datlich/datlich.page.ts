import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-datlich',
  templateUrl: './datlich.page.html',
  styleUrls: ['./datlich.page.scss'],
})
export class DatlichPage implements OnInit {
  public loaidatlich = ["SPA", "Điều trị"]
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
      this.rest.action = 'datlich'
      if (!this.rest.datlich.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('datlich', 'khoitao', {
      tukhoa: this.rest.datlich.tukhoa
    }).then(resp => {
      this.rest.defreeze()
      this.rest.datlich.khoitao = true
      this.rest.datlich.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public chuyenspa(thutu: number) {
    // chuyển thông tin sang model spa, thêm vào spa
    let datlich = this.rest.datlich.danhsach[thutu]
    if (!this.rest.spa.init) {
      let firstDay = this.time.datetotime(this.rest.home.today);
      let lastDay = this.time.datetotime(this.rest.home.today);
      this.rest.spa.search.start = this.time.timetoisodate(firstDay)
      this.rest.spa.search.end = this.time.timetoisodate(lastDay)
    }
    this.rest.temp = {
      id: 0,
      name: datlich.tenkhach,
      phone: datlich.dienthoai,
      name2: '',
      phone2: '',
      note: datlich.ghichu,
      tinhcach: '',
      weight: 0,
      treat: 0,
      image: [],
      option: this.rest.home.default['spa'],
      filter: this.rest.spa.search,
      did: 1,
      khonglam: 0,
      number: 1,
      datlich: datlich.id
    }
    setTimeout(() => {
      this.rest.navCtrl.navigateForward('/spa')
      setTimeout(() => {
        this.rest.navCtrl.navigateForward('/spa/insert')
      }, 100)
    }, 100)
    this.rest.back()
  }

  public henngay(thutu: number) {
    // chuyển sang modal chọn ngày
    let datlich = this.rest.datlich.danhsach[thutu]
    this.rest.temp = {
      id: datlich.id,
      loai: datlich.loai,
      ngayhen: this.time.datetoisodate(datlich.thoigian),
    }
    this.rest.navCtrl.navigateForward("/datlich/henngay")
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
    let datlich = this.rest.datlich.danhsach[thutu]
    this.rest.checkpost('datlich', 'khongden', {
      id: datlich.id,
      loai: datlich.loai,
      tukhoa: this.rest.datlich.tukhoa
    }).then(resp => {
      this.rest.defreeze()
      this.rest.datlich.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
