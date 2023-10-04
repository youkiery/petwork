import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-xetnghiem',
  templateUrl: './xetnghiem.page.html',
  styleUrls: ['./xetnghiem.page.scss'],
})
export class XetnghiemPage implements OnInit {
  public mau = [
    'success',
    'secondary',
    'secondary',
  ]
  public loai = ["Toàn bộ", "Sinh lý", "Sinh hoá"]
  public xetnghiem = ["Sinh lý", "Sinh hoá"]
  public nrev = [1, 2, 0]
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit(): void { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'xetnghiem'
      if (!this.rest.xetnghiem.khoitao) {
        this.rest.xetnghiem.timkiem.batdau = this.time.timetoisodate(this.time.datetotime(this.rest.home.today) - 60 * 60 * 24 * 5 * 1000)
        this.rest.xetnghiem.timkiem.ketthuc = this.time.datetoisodate(this.rest.home.today)
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'khoitaoxetnghiem', {
      timkiem: this.rest.xetnghiem.timkiem,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.khoitao = true
      this.rest.xetnghiem.danhsach = resp.danhsach
      // this.rest.xetnghiem.danhsachcan = resp.danhsachcan
      this.rest.xetnghiem.chitieugiong = resp.chitieugiong
      this.rest.xetnghiem.danhsachchitieu = resp.danhsachchitieu
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'khoitaoxetnghiem', {
      timkiem: this.rest.xetnghiem.timkiem,
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.xetnghiem.khoitao = true
      this.rest.xetnghiem.danhsach = resp.danhsach
      // this.rest.xetnghiem.danhsachcan = resp.danhsachcan
      this.rest.xetnghiem.chitieugiong = resp.chitieugiong
      this.rest.xetnghiem.danhsachchitieu = resp.danhsachchitieu
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public doiloai() {
    this.rest.xetnghiem.timkiem.loai = this.nrev[this.rest.xetnghiem.timkiem.loai]
  }

  public chitietuchitieu(xetnghiem: number, thutu: number) {
    this.rest.temp = this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu]
    this.rest.navCtrl.navigateForward('/xetnghiem/chitiet')
  }

  public capnhatchitieu(xetnghiem: number, thutu: number) {
    this.rest.temp = this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu]
    this.rest.navCtrl.navigateForward('/xetnghiem/themchitieu')
  }

  public async themchitieu(xetnghiem: number) {
    this.rest.temp = {
      id: 0,
      ten: "",
      xetnghiem: xetnghiem,
      gioithieu: '',
      donvi: '',
      flag: '',
      len: '',
      xuong: '',
      benh: '',
      dieutri: ''
    }
    this.rest.navCtrl.navigateForward('/xetnghiem/themchitieu')
  }

  public async xoachitieu(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xoá chỉ tiêu',
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        cssClass: 'danger',
        handler: () => {
          this.xacnhanxoachitieu(id)
        }
      }]
    })
    await alert.present();
  }

  public async xacnhanxoachitieu(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'xoachitieu', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.danhsachchitieu = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dichuyen(xetnghiem: number, thutu: number, tanggiam: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'dichuyenchitieu', {
      ida: this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu].id,
      vitria: this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu].vitri,
      idb: this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu - tanggiam].id,
      vitrib: this.rest.xetnghiem.danhsachchitieu[xetnghiem][thutu - tanggiam].vitri,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.danhsachchitieu = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public themgiong(xetnghiem: number) {
    let danhsachchitieu = []
    this.rest.xetnghiem.danhsachchitieu[xetnghiem].forEach(chitieu => {
      danhsachchitieu.push({
        id: chitieu.id,
        ten: chitieu.ten,
        donvi: chitieu.donvi,
      })
    });
    this.rest.temp = {
      id: 0,
      ten: "",
      chitieu: danhsachchitieu
    }
    this.rest.navCtrl.navigateForward("/xetnghiem/themgiong")
  }

  public capnhatgiong(xetnghiem: number, thutu: number) {
    this.rest.temp = this.rest.xetnghiem.chitieugiong[xetnghiem][thutu]
    this.rest.navCtrl.navigateForward("/xetnghiem/themgiong")
  }

  public async inxetnghiem(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      let html = resp.html
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(html);
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoaxetnghiem(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Hồ sơ sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.xacnhanxoaxetnghiem(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoaxetnghiem(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'xoaxetnghiem', {
      id: id,
      timkiem: this.rest.xetnghiem.timkiem,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.danhsach = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  // public async xetnghiem(i: number) {
  //   let item = this.rest.xetnghiem.danhsachcan[i]
  //   this.rest.temp = {
  //     act: 'xetnghiem',
  //     xrayid: item.id,
  //     name: item.name,
  //     phone: item.phone,
  //     address: item.address,
  //     petname: item.petname,
  //     weight: item.weight,
  //     age: item.age,
  //     gender: item.gender,
  //     species: item.species,
  //     samplestatus: '1',
  //     symptom: '',
  //     doctor: this.rest.home.userid,
  //     filter: this.rest.xetnghiem.timkiem,
  //     image: []
  //   }
  //   this.rest.navCtrl.navigateForward('/xetnghiem/insert')
  // }

  public async themxetnghiem(xetnghiem: number = 0) {
    if (!this.rest.xetnghiem.chitieugiong[xetnghiem].length) return this.rest.notify("Xin hãy thêm 1 profile chỉ tiêu trước khi thêm")
    let giong = 0
    let idgiong = this.rest.xetnghiem.chitieugiong[xetnghiem][giong].id
    let chitieu = this.rest.xetnghiem.chitieugiong[xetnghiem][giong].chitieu
    chitieu.forEach((item, index) => {
      chitieu[index]["giatri"] = ""
    });
    this.rest.temp = {
      xetnghiem: xetnghiem,
      id: 0,
      name: '',
      phone: '',
      address: '',
      tenthucung: '',
      cannang: '1',
      tuoi: '1',
      gioitinh: '0',
      giong: giong,
      idgiong: idgiong,
      trieuchung: '',
      chitieu: chitieu,
      timkiem: this.rest.xetnghiem.timkiem,
      hinhanh: []
    }
    
    this.rest.navCtrl.navigateForward('/xetnghiem/them')
  }

  public async capnhatxetnghiem(i: number) {
    let xetnghiem = this.rest.xetnghiem.danhsach[i]
    let giong = 0
    this.rest.xetnghiem.chitieugiong.forEach((chitieugiong, index) => {
      if (chitieugiong.id == xetnghiem.idgiong) index = giong
    });

    let chitieu = this.rest.xetnghiem.chitieugiong[xetnghiem.xetnghiem][giong].chitieu
    chitieu.forEach((item, index) => {
      chitieu[index]["giatri"] = ""
      if (xetnghiem.chitieu[item.id]) chitieu[index]["giatri"] = xetnghiem.chitieu[item.id]
    })

    this.rest.temp = {
      id: xetnghiem.id,
      name: xetnghiem.khachhang,
      phone: xetnghiem.dienthoai,
      address: xetnghiem.diachi,
      tenthucung: xetnghiem.tenthucung,
      cannang: xetnghiem.cannang,
      tuoi: xetnghiem.tuoi,
      gioitinh: xetnghiem.gioitinh,
      giong: giong,
      idgiong: xetnghiem.idgiong,
      trieuchung: xetnghiem.trieuchung,
      chitieu: chitieu,
      hinhanh: xetnghiem.hinhanh,
      xetnghiem: xetnghiem.xetnghiem,
      timkiem: this.rest.xetnghiem.timkiem,
    }

    this.rest.navCtrl.navigateForward('/xetnghiem/them')
  }

  // public tempxetnghiem() {
  //   let xetnghiem = {}
  //   this.rest.xetnghiem.xetnghiem.forEach(item => {
  //     xetnghiem[item.id] = ''
  //   })
  //   return xetnghiem
  // }

  public async chitietxetnghiem(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = {
        id: id,
        tailieu: resp.html
      }
      this.rest.navCtrl.navigateForward('/xetnghiem/in')
    }, () => {
      this.rest.defreeze()
    })
  }

  // public async removeneed(id: number) {
  //   const alert = await this.alert.create({
  //     header: 'Xác nhận xóa yêu cầu xét nghiệm',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: () => {
  //           this.removeneedSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeneedSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('xetnghiem', 'removeneed', {
  //     id: id,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.xetnghiem.need = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
