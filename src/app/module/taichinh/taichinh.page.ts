import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-taichinh',
  templateUrl: './taichinh.page.html',
  styleUrls: ['./taichinh.page.scss'],
})
export class TaichinhPage implements OnInit {
  public toggle = false
  public toggletype = false
  public max = 960
  public thutu = 0
  public hienchi = { 0: false, 1: false, 2: false, 3: {} }
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'schedule'
      if (!this.rest.taichinh.khoitao) {
        this.rest.taichinh.thoigian = this.time.datetoisodate(this.rest.home.today)
      }
    })
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'khoitao', {
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.taichinh.danhsach = resp.danhsach
      this.rest.taichinh.danhsachchi = resp.danhsachchi
      this.rest.taichinh.danhsachloaichi = resp.danhsachloaichi
      this.rest.taichinh.danhsachnhacungcap = resp.danhsachnhacungcap
      this.rest.taichinh.danhsachncc = resp.danhsachncc
      this.rest.taichinh.thongke = resp.thongke
      this.rest.taichinh.danhsachtang = resp.danhsachtang
      this.rest.taichinh.khoitao = true
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'khoitao', {
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.taichinh.danhsach = resp.danhsach
      this.rest.taichinh.danhsachchi = resp.danhsachchi
      this.rest.taichinh.danhsachloaichi = resp.danhsachloaichi
      this.rest.taichinh.danhsachnhacungcap = resp.danhsachnhacungcap
      this.rest.taichinh.danhsachncc = resp.danhsachncc
      this.rest.taichinh.thongke = resp.thongke
      this.rest.taichinh.danhsachtang = resp.danhsachtang
      this.rest.taichinh.khoitao = true
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public chitiet(loai: number, thutu: number = 0) {
    if (loai == 3) {
      this.hienchi[0] = false
      this.hienchi[1] = false
      this.hienchi[2] = false
      if (this.hienchi[3][thutu] == true) this.hienchi[3][thutu] = false
      else {
        for (const key in this.hienchi[3]) {
          if (Object.prototype.hasOwnProperty.call(this.hienchi[3], key)) {
            this.hienchi[3][key] = false
          }
        }
        this.hienchi[3][thutu] = true
      }
    }
    else {
      if (this.hienchi[loai]) this.hienchi[loai] = false
      else {
        this.hienchi[0] = false
        this.hienchi[1] = false
        this.hienchi[2] = false
        this.hienchi[loai] = true
      }
    }
  }

  public thaydoiloaichi(thutu: number) {
    this.thutu = thutu
    this.rest.temp.dulieu[3].idloaichi = (this.rest.taichinh.danhsachloaichi[thutu].danhsach.length ? this.rest.taichinh.danhsachloaichi[thutu].danhsach[0].id.toString() : '0')
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.taichinh.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.rest.taichinh.thoigian = this.time.timetoisodate(thoigian.getTime())
  }
  
  public async xacnhanxoathu(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa mục thu này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xoathu(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoathu(id: number = 0) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoathu', {
      id: id,
      thoigian: this.rest.taichinh.thoigian
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.taichinh.danhsach = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
    }, () => {
      this.rest.defreeze()
    })
  }

  public capnhatthu(thutu: number) {
    let thuchi = this.rest.taichinh.danhsach[thutu]
    this.rest.temp = {
      id: thuchi.id,
      thoigian: this.time.datetoisodate(thuchi.thoigian),
      tienmat: this.rest.comma(thuchi.tienmat),
      nganhang: this.rest.comma(thuchi.nganhang),
      hinhanh: thuchi.hinhanh
    }
    this.toggle = true
    this.rest.taichinh.tab = '0'
    this.content.scrollToTop(0);
  }

  public themthu() {
    this.rest.temp = {
      id: 0,
      thoigian: this.time.datetoisodate(this.rest.home.today),
      tienmat: 0,
      nganhang: 0,
      hinhanh: []
    }
    this.toggle = true
    this.rest.taichinh.tab = '0'
    this.content.scrollToTop(0);
    // this.insert = true
  }

  public them() {
    switch (this.rest.taichinh.tab) {
      case '0':
        this.themthu()
        break;
      case '1':
        this.themchi()
        break;
      case '2':
        this.themncc()
        break;
    }
  }

  public capnhatnoncc(thutu: number) {
    let noncc = this.rest.taichinh.danhsachncc[thutu]
    this.rest.temp = {
      id: noncc.id,
      idnhacungcap: noncc.idnhacungcap,
      noidung: noncc.noidung,
      giatri: noncc.giatri,
      thoigian: this.time.datetoisodate(noncc.thoigian),
      ghichu: noncc.ghichu,
    }
    this.toggle = true
    this.rest.taichinh.tab = '0'
    this.content.scrollToTop(0);
  }

  public themncc() {
    this.rest.temp = {
      id: 0,
      idnhacungcap: (this.rest.taichinh.danhsachnhacungcap.length ? this.rest.taichinh.danhsachnhacungcap[0].id.toString() : 0),
      noidung: '',
      giatri: '0',
      thoigian: this.time.datetoisodate(this.rest.home.today),
      ghichu: ''
    }
    this.rest.taichinh.tab = '2'
    this.toggle = true
    this.content.scrollToTop(0);
  }

  public async xoanoncc(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa nợ nhà cung cấp?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xacnhanxoanoncc(id)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoanoncc(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoanoncc', {
      id: id,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.taichinh.danhsachncc = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
    }, () => {
      this.rest.defreeze()
    })
  }

  public themchi() {
    this.rest.temp = {
      id: 0,
      thoigian: this.time.datetoisodate(this.rest.home.today),
      loaichi: '0', // 0 = chi cố định, -1 = chi tài sản, -2 = chi nhà cung cấp, > 0 = chi theo nhóm
      dulieu: [
        { loaichi: '', giatri: '0' },
        { ten: '', donvi: '', soluong: '1', giatri: '0', danhdau: {}, ghichu: '' },
        { idnhacungcap: (this.rest.taichinh.danhsachnhacungcap.length ? this.rest.taichinh.danhsachnhacungcap[0].id.toString() : 0), noidung: '', giatri: '0', thoigian: this.time.datetoisodate(this.rest.home.today), ghichu: '' },
        { idloaichi: 0, giatri: '0', ghichu: '' }
      ],
    }
    this.rest.taichinh.tab = '1'
    this.toggle = true
    this.content.scrollToTop(0);
  }

  public import() {
    this.rest.navCtrl.navigateForward('/taichinh/import')
  }

  public xoaanh(i: number) {
    this.rest.temp.hinhanh = this.rest.temp.hinhanh.filter((item: any, index: number) => {
      return index !== i
    })
  }
  
  public nhaptien(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }

  public nhapdulieuchi(bien: string, thutu: number) {
    let tam = Number(this.rest.temp.dulieu[thutu][bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp.dulieu[thutu][bien] = this.rest.comma(tam)
  }

  public async xoatang(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa tầng',
      buttons: [{
          text: 'Bỏ',
          role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoatang(id)
        }
      }]
    })
    alert.present()
  }

  public async xacnhanxoatang(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoatang', {
      id: id
    }).then(resp => {
      this.rest.taichinh.danhsachtang = resp.danhsachtang
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
    this.rest.checkpost('taichinh', 'themtang', {
      ten: ten
    }).then(resp => {
      this.rest.defreeze()
      this.rest.taichinh.danhsachtang = resp.danhsachtang
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemthu() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('taichinh', 'themthu', this.rest.temp).then(resp => {
      this.rest.taichinh.danhsach = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
      this.rest.taichinh.tab = '0'
      this.toggle = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      await this.rest.freeze('Đang tải dữ liệu...')
      for (let i = 0; i < fileList.length; i++) {
        await this.firstFileToBase64(fileList[i]).then((result: string) => {
          let image = new Image();
          image.src = result
          image.onload = () => {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let rate = 1
            if (image.width > this.max || image.height > this.max) {
              if (image.width > image.height) rate = image.width / this.max
              else rate = image.height / this.max
            }
            let newWidth = image.width / rate
            let newHeight = image.height / rate
            canvas.width = newWidth
            canvas.height = newHeight
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
            this.rest.temp.hinhanh.push(canvas.toDataURL('image/jpeg'));
          }
        }, (err: any) => { });
      }
      this.rest.defreeze()
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  public async uploadAllImage() {
    return new Promise((resolve) => {
      let count = this.rest.temp.hinhanh.length
      if (count == 0) resolve(true)
      this.rest.temp.hinhanh.forEach((item, index) => {
        if (item.length < 200) {
          count--
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item).then((url) => {
            this.rest.temp.hinhanh[index] = url
            count--
            if (count == 0) resolve(true)
          })
        }
      });
    })
  }

  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
      let fileRef = this.storage.ref(path);
      let base64 = image.substr(image.indexOf(',') + 1);
      let metadata = {
        contentType: 'image/jpeg',
      };

      fileRef.putString(base64, 'base64', metadata).then((response) => {
        fileRef.getDownloadURL().subscribe(url => {
          resolve(url)
        })
      }, (error) => {
        resolve('')
      })
    })
  }

    
  public async xacnhanthemchi() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themchi', {
      dulieu: this.rest.temp,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.taichinh.danhsachchi = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
      this.rest.taichinh.tab = '1' 
      this.toggle = false
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async themloaichi() {
    let alert = await this.alert.create({
      message: 'Nhập loại chi',
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
      this.rest.notify('Nhập loại chi!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themloaichi', {
      ten: ten,
      nhomchi: this.rest.temp.loaichi
    }).then(resp => {
      this.rest.taichinh.danhsachloaichi = resp.danhsach
      this.rest.temp.idloaichi = resp.danhsach[resp.danhsach.length - 1].id
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public kiemtrachikhac(loaichi: string) {
    if (Number(loaichi) > 0) return true
    return false
  }

  public nhaptienncc(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }

  public async xacnhanthemnoncc() {
    if (!this.rest.temp.idnhacungcap) {
      this.rest.notify('Chọn 1 nhà cung cấp!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themnonhacungcap', {
      dulieu: this.rest.temp,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.taichinh.danhsachncc = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
      this.rest.taichinh.tab = '2'
      this.toggle = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themnhacungcap() {
    let alert = await this.alert.create({
      message: 'Nhập loại chi',
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
            this.xacnhanthemnhacungcap(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemnhacungcap(ten: string) {
    if (!ten.length) {
      this.rest.notify('Nhập tên nhà cung cấp!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themnhacungcap', {
      ten: ten
    }).then(resp => {
      this.rest.taichinh.danhsachnhacungcap = resp.danhsach
      this.rest.temp.idnhacungcap = resp.danhsach[resp.danhsach.length - 1].id.toString()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoaloaichi(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa loại chi',
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
    this.rest.checkpost('taichinh', 'xoaloaichi', {
      id: id,
    }).then(resp => {
      this.rest.taichinh.danhsachloaichi = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoanhomchi(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa nhóm chi',
      buttons: [{
          text: 'Bỏ',
          role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoanhomchi(id)
        }
      }]
    })
    alert.present()
  }
  
  public async xacnhanxoanhomchi(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoanhomchi', {
      id: id
    }).then(resp => {
      this.rest.taichinh.danhsachloaichi = resp.danhsach
      this.rest.temp.loaichi = resp.danhsach[resp.danhsach.length - 1].id
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themnhomchi() {
    let alert = await this.alert.create({
      message: 'Nhập nhóm chi',
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
            this.xacnhanthemnhomchi(e.ten)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanthemnhomchi(ten: string) {
    if (!ten.length) {
      this.rest.notify('Nhập loại chi!!!')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'themnhomchi', {
      ten: ten
    }).then(resp => {
      this.rest.taichinh.danhsachloaichi = resp.danhsach
      this.rest.temp.loaichi = resp.danhsach[resp.danhsach.length - 1].id
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoanhacungcap(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa nhà cung cấp',
      buttons: [{
          text: 'Bỏ',
          role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoanhacungcap(id)
        }
      }]
    })
    alert.present()
  }
  
  public async xacnhanxoanhacungcap(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoanhacungcap', {
      id: id
    }).then(resp => {
      this.rest.taichinh.danhsachnhacungcap = resp.danhsach
      this.rest.temp.idnhacungcap = (this.rest.taichinh.danhsachnhacungcap.length ? this.rest.taichinh.danhsachnhacungcap[0].id.toString() : 0),
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public capnhatchicodinh(i: number) {
    let chicodinh = this.rest.taichinh.danhsachchi[0].danhsach[i]
    this.themchi()
    this.rest.temp.id = chicodinh.id
    this.rest.temp.loaichi = '0'
    this.rest.temp.dulieu[0] = {
      loaichi: chicodinh.loaichi,
      giatri: this.rest.comma(chicodinh.giatri)
    }
    //   { loaichi: '', giatri: '0' },
  }

  public capnhatvattu(i: number) {
    let chivattu = this.rest.taichinh.danhsachchi[1].danhsach[i]
    this.themchi()
    this.rest.temp.id = chivattu.id
    this.rest.temp.thoigian = this.time.datetoisodate(chivattu.thoigian)
    this.rest.temp.loaichi = '-1'
    let danhdau = {}
    this.rest.vattu.danhsachtang.forEach((tang => {
      if (this.rest.temp.thuoctang[tang.id]) danhdau[tang.id] = true
      else danhdau[tang.id] = false
    }))

    this.rest.temp.dulieu[1] = { 
      ten: chivattu.ten,
      donvi: chivattu.donvi,
      soluong: this.rest.comma(chivattu.soluong),
      giatri: this.rest.comma(chivattu.giatri),
      danhdau: danhdau,
      ghichu: chivattu.ghichu,
    }
  }

  public capnhatchincc(i: number) {
    let chincc = this.rest.taichinh.danhsachchi[2].danhsach[i]
    this.themchi()
    this.rest.temp.id = chincc.id
    this.rest.temp.thoigian = this.time.datetoisodate(chincc.thoigian)
    this.rest.temp.loaichi = '-2'
    this.rest.temp.dulieu[2] = {
      idnhacungcap: chincc.idnhacungcap,
      noidung: chincc.noidung,
      giatri: this.rest.comma(chincc.giatri),
      ghichu: chincc.ghichu,
    }
  }

  public capnhatchi(i: number, idnhom: number) {
    let chi = this.rest.taichinh.danhsachchi[3][i]
    this.themchi()
    this.rest.temp.id = chi.id
    this.rest.temp.thoigian = this.time.datetoisodate(chi.thoigian)
    this.rest.temp.loaichi = idnhom
    this.rest.temp.dulieu[3] = {
      idloaichi: chi.idloaichi,
      giatri: this.rest.comma(chi.giatri),
      ghichu: chi.ghichu
    }
    // id: 0,
    // thoigian: this.time.datetoisodate(this.rest.home.today),
    // loaichi: '0', // 0 = chi cố định, -1 = chi tài sản, -2 = chi nhà cung cấp, > 0 = chi theo nhóm
    // dulieu: [
    //   { loaichi: '', giatri: '0' },
    //   { ten: '', donvi: '', soluong: '1', giatri: '0', danhdau: {}, ghichu: '' },
    //   { idnhacungcap: (this.rest.taichinh.danhsachnhacungcap.length ? this.rest.taichinh.danhsachnhacungcap[0].id.toString() : 0), noidung: '', giatri: '0', thoigian: this.time.datetoisodate(this.rest.home.today), ghichu: '' },
    //   { idloaichi: 0, giatri: '0', ghichu: '' }
    // ],
  }

  public async xoachi(id: number, loaichi: number) {
    let alert = await this.alert.create({
      message: 'Xóa mục chi này?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.xacnhanxoa(id, loaichi)
          }
        }
      ]
    })
    alert.present()
  }

  public async xacnhanxoa(id: number, loaichi: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('taichinh', 'xoachi', {
      id: id,
      loaichi: loaichi,
      thoigian: this.rest.taichinh.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.rest.taichinh.danhsachchi = resp.danhsach
      this.rest.taichinh.thongke = resp.thongke
    }, () => {
      this.rest.defreeze()
    })
  }
}
