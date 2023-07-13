import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-taichinhimport',
  templateUrl: './taichinhimport.page.html',
  styleUrls: ['./taichinhimport.page.scss'],
})
export class TaichinhimportPage implements OnInit {
  public tab = '0'
  public name = 'Chưa chọn file'
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
  public chicodinh = []
  public tonkho = {
    bandau: 0,
    thangnay: 0
  }
  public loaichivattu = []
  public thoigian = ''
  public error = []
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {    
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/taichinh')
    else {
      this.thoigian = this.time.datetoisodate(this.rest.home.today)
      this.khoitao()
    }
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'khoitaoimport', {
      thoigian: this.thoigian
    }).then(resp => {
      this.loaichivattu = resp.loaichivattu
      this.cauhinh = resp.cauhinh
      this.chicodinh = resp.chicodinh
      this.tonkho = resp.tonkho
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'khoitaoimport', {
      thoigian: this.thoigian
    }).then(resp => {
      this.cauhinh = resp.cauhinh
      this.chicodinh = resp.chicodinh
      this.tonkho = resp.tonkho
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'luucauhinh', {
      loai: this.tab,
      cauhinh: this.cauhinh[this.tab]
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luukhothangnay() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'luukhothangnay', {
      tonkho: this.tonkho,
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public nhapgiatri(thutu: number) {
    let tam = Number(this.chicodinh[thutu].giatri.toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.chicodinh[thutu].giatri = this.rest.comma(tam)
  }

  public async xoachicodinh(thutu: number) {
    let loaichi = this.chicodinh[thutu]
    if (loaichi.id > 0) {
      let alert = await this.alert.create({
        message: 'Xóa loại chi',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.xacnhanxoachicodinh(loaichi.id)
            }
          }
        ]
      });
  
      await alert.present();
    }
    else {
      this.chicodinh = this.chicodinh.filter((item, index) => {
        return index !== thutu
      })
    }
  }

  public async xacnhanxoachicodinh(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoachicodinh', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.chicodinh = resp.chicodinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luuchicodinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'luuchicodinh', {
      chicodinh: this.chicodinh
    }).then(resp => {
      this.rest.defreeze()
      this.chicodinh = resp.chicodinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public themchicodinh() {
    this.chicodinh.push({
      id: 0, loaichi: '', giatri: '0'
    })
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

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.thoigian = this.time.timetoisodate(thoigian.getTime())
  }

  public async xoaloaichi(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận loại chi này',
      buttons: [{
          text: 'Bỏ',
          role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoaloaichi(id)
        }
      }]
    })
    alert.present()
  }

  public async xacnhanxoaloaichi(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoaloaichivattu', {
      id: id
    }).then(resp => {
      this.loaichivattu = resp.loaichivattu
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themloaichi() {
    let alert = await this.alert.create({
      message: 'Nhập tên loại chi mới',
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
            this.xacnhanthemloaichi(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemloaichi(ten: string) {
    if (!ten.length) {
      this.rest.notify('Tên tầng trống!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themloaichivattu', {
      ten: ten
    }).then(resp => {
      this.rest.defreeze()
      this.loaichivattu = resp.loaichivattu
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailen() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'taichinh');
      body.append('action', 'import');
      body.append('loai', this.tab);
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.overtime) {
          this.rest.notify("Đã hết thời gian sử dụng")
          this.rest.root()
        }
        else if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          if (resp.messenger) this.rest.notify(resp.messenger)
          this.error = resp.error
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
}
