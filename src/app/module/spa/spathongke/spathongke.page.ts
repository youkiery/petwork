import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-spathongke',
  templateUrl: './spathongke.page.html',
  styleUrls: ['./spathongke.page.scss'],
})
export class SpathongkePage implements OnInit {
  public dulieu = []
  public hienthi = '0' // 0 = toàn bộ, 1 = chỉ tháng này, 2 = chỉ tháng trước, 3 = chỉ tháng này và tháng trước
  public solan = 0
  public tongtien = 0
  public sapxep = '0'
  public thangnay = 0
  public thangtruoc = 0
  public vanbanhienthi = ['Toàn bộ', 'Chỉ tháng này', 'Chỉ tháng trước']
  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa')
    else if (!this.rest.spa.khoitaothongke) {
      this.rest.spa.thongke.dauthang = this.time.datetoisodate(this.rest.home.today)
      this.rest.spa.thongke.cuoithang = this.time.datetoisodate(this.rest.home.today)
      this.khoitao()
    }
  }

  public async khoitao() {
    if (this.kiemtrangaythongke()) return 0
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'thongke', {
      dauthang: this.rest.spa.thongke.dauthang,
      cuoithang: this.rest.spa.thongke.cuoithang,
      solan: this.solan,
      tongtien: this.tongtien,
      sapxep: this.sapxep
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.khoitaothongke = true
      this.rest.spa.dulieu = resp.thongke
      this.demthang()
    }, () => {
      this.rest.defreeze()
    })
  }

  public demthang() {
    this.thangnay = 0
    this.thangtruoc = 0
    this.rest.spa.dulieu.forEach(khachhang => {
      if (khachhang.tonglan > 0 && khachhang.thangtruoc.tonglan == 0) this.thangnay ++
      else if (khachhang.tonglan == 0 && khachhang.thangtruoc.tonglan > 0) this.thangtruoc ++
    });
  }

  // public async tailai(event: any) {
  //   if (this.kiemtrangaythongke()) return 0
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('spa', 'thongke', {
  //     dauthang: this.rest.spa.thongke.dauthang,
  //     cuoithang: this.rest.spa.thongke.cuoithang,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.spa.khoitaothongke = true
  //     this.rest.spa.dulieu = resp.thongke
  //     event.target.complete();
  //   }, () => {
  //     this.rest.defreeze()
  //     event.target.complete();
  //   })
  // }

  public nhaptien(bien: string) {
    let tam = Number(this[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this[bien] = this.rest.comma(tam)
  }

  public kiemtrangaythongke() {
    let dauthang = new Date(this.time.isodatetotime(this.rest.spa.thongke.dauthang))
    let cuoithang = new Date(this.time.isodatetotime(this.rest.spa.thongke.cuoithang))
    // đảo vị nếu thời gian đầu > thời gian cuối
    if (dauthang.getTime() > cuoithang.getTime()) {
      let thoigian = this.rest.spa.thongke.dauthang
      this.rest.spa.thongke.dauthang = this.rest.spa.thongke.cuoithang
      this.rest.spa.thongke.cuoithang = thoigian
      dauthang = new Date(this.time.isodatetotime(this.rest.spa.thongke.dauthang))
      cuoithang = new Date(this.time.isodatetotime(this.rest.spa.thongke.cuoithang))
    }
    let sothang = cuoithang.getMonth() - dauthang.getMonth()
    let sonam = cuoithang.getFullYear() - dauthang.getFullYear()

    if ((sonam * 12 + sothang) > 12) {
      this.rest.spa.dulieu = []
      this.rest.notify('Không được chọn thời gian quá 1 năm')
      return true
    }
    return false;
  }

  public async chitiet(idkhach: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'chitietdulieu', {
      idkhach: idkhach,
      dauthang: this.rest.spa.thongke.dauthang,
      cuoithang: this.rest.spa.thongke.cuoithang,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.chitiet
      this.rest.navCtrl.navigateForward('/spa/chitietthongke')
    }, () => {
      this.rest.defreeze()
    })
  }

  public nhantin() {
    let danhsach = []
    this.rest.spa.dulieu.forEach(khachhang => {
      console.log(this.hienthi, khachhang.tonglan, khachhang.thangtruoc.tonglan);
      
      if ((this.hienthi == '0' || (this.hienthi == '1' && khachhang.tonglan > 0 && khachhang.thangtruoc.tonglan == 0) || (this.hienthi == '2' && khachhang.tonglan == 0 && khachhang.thangtruoc.tonglan > 0))) danhsach.push(khachhang)
    })
    if (!danhsach.length) this.rest.notify('Danh sách trống!!!')
    else {
      this.rest.temp = danhsach
      this.rest.navCtrl.navigateForward('/spa/nhantin')
    }
  }
}
