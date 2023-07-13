import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-loinhuandoanhthu',
  templateUrl: './loinhuandoanhthu.page.html',
  styleUrls: ['./loinhuandoanhthu.page.scss'],
})
export class LoinhuandoanhthuPage implements OnInit {
  public tiendo = 0
  public danhsachchotlich = []
  public doanhthu = {
    nhanvien: '',
    doanhthu: ''
  }
  public cauhinh = {
    0: {
      loaichi: '',
      tienchi: '',
      thoigian: '',
      ghichu: '',
    },
    1: {
      dienthoai: '',
      khachhang: '',
      tienno: '',
    },
    2: {
      nhacungcap: '',
      noidung: '',
      thanhtoan: '',
      noncc: '',
      thoigian: '',
      danhaphang: '',
      dathanhtoan: ''
    }
  }
  public tonkho = {
    bandau: '0',
    thangnay: '0'
  }
  public tungay = ''
  public denngay = ''
  public name = ''
  public error = ''
  public bankinput: any = [0, 0]
  public current = 0
  public ibank = [
    '/assets/icon/gbank.png',
    '/assets/icon/bank.png'
  ]
  public thoigian = ''
  public danhsach = []
  public thongke = {
    luongnhanvien: '0',
    tietkiem: '0',
    thucnhan: '0',
    cophan: '0',
  }
  @ViewChild('bank') bank: ElementRef;
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/loinhuan')
    else {
      this.thoigian = this.time.datetoisodate(this.rest.home.today)
      this.layngaychot()
    }
  }

  public async layngaychot() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'layngaychot', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.tungay = this.time.datetoisodate(resp.tungay)
      this.denngay = this.time.datetoisodate(resp.denngay)
    }, () => {
      this.rest.defreeze()
    })
  }

  public buocsau() {
    switch (this.tiendo) {
      case 0:
        // chọn ngày chốt lương
        this.khoitao()
        break;
      case 1:
        // lưu dữ liệu chốt lịch nghỉ
        this.chotlichnghi()
        // this.tiendo ++
        break;
      case 2:
        // lưu dữ liệu doanh số nhân viên
        this.luudoanhso()
        // this.tiendo ++
        break;
      case 3:
        // import chi thường xuyên
        this.tailen('0')
        // this.tiendo ++
        break;
      case 4:
        // import nhà cung cấp
        this.tailen('2')
        // this.tiendo ++
        break;
      case 5:
        // import khách nợ
        this.tailen('1')
        // this.tiendo ++
        break;
      case 6:
        // nhập tổng kho
        // lấy thống kê lương xem trước
        this.luukhothangnay()
        // this.tiendo ++
        break;
        case 7:
          // xác nhận chốt lương
          // thêm bản chi cố định hằng tháng
          this.rest.back()
          this.rest.back()
          this.rest.navCtrl.navigateForward('/taichinh')
          this.rest.taichinh.khoitao = false
          this.rest.loinhuan.khoitao = false
        break;
    }
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.thoigian = this.time.timetoisodate(thoigian.getTime())
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'khoitaotinhluong', {
      thoigian: this.thoigian,
      tungay: this.tungay,
      denngay: this.denngay,
    }).then(resp => {
      this.rest.defreeze()
      this.danhsachchotlich = resp.danhsachchotlich
      this.cauhinh = resp.cauhinh
      this.doanhthu = resp.doanhthu
      this.tonkho = resp.tonkho
      this.tiendo ++
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chotlichnghi() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'chotlichnghi', {
      thoigian: this.thoigian,
      danhsach: this.danhsachchotlich
    }).then(resp => {
      this.rest.defreeze()
      this.tiendo ++
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async luudoanhso() {
    let body = new FormData();
    if (!this.bankinput[0] || !this.bankinput[1]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('shop', this.bankinput[0]);
      body.append('benhvien', this.bankinput[1]);
      body.append('session', this.rest.session);
      body.append('type', 'loinhuan');
      body.append('action', 'tinhluong');
      body.append('thoigian', this.thoigian);
      body.append('version', this.rest.version.toString());

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          this.tiendo ++
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
  
  public async tailen(loai: string) {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'taichinh');
      body.append('thoigian', this.thoigian);
      body.append('action', 'import');
      body.append('loai', loai);
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          if (resp.messenger) this.rest.notify(resp.messenger)
          this.tiendo ++
          this.name = ''
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }

  public async luucauhinh(tab: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'luucauhinh', {
      loai: tab,
      cauhinh: this.cauhinh[tab]
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luucauhinhdoanhthu() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'luucauhinhdoanhthu', {
      cauhinh: this.doanhthu
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luukhothangnay() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'luukhothangnay', {
      tonkho: this.tonkho,
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
      this.thongke = resp.thongke
      this.tiendo ++
    }, () => {
      this.rest.defreeze()
    })
  }
 
  public async chonexcel(thutu: number) {
    this.current = thutu
    this.bank.nativeElement.click()
  }

  public thaydoiexcel() {
    let file = this.bank
    const filelist: FileList = file.nativeElement.files
    if (filelist.length) this.bankinput[this.current] = filelist[0]
    else this.bankinput[this.current] = 0
    this.bank.nativeElement.value = ''
  }

  public nhaptien(bien: string) {
    let tam = Number(this.tonkho[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.tonkho[bien] = this.rest.comma(tam)
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public file() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) this.name = fileList[0].name
    else this.name = 'Chưa chọn file'
  }

  public clear() {
    this.pwaphoto.nativeElement.value = ''
    this.name = ''
  }
}
