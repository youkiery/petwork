import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-excelloaivaccine',
  templateUrl: './excelloaivaccine.page.html',
  styleUrls: ['./excelloaivaccine.page.scss'],
})
export class ExcelloaivaccinePage implements OnInit {
  public ngay = 0
  public date = ''
  public userid = 0
  public segment = '0'
  public loainhac = []
  public nhomloai = []
  public cauhinh = []
  public recycle = {
    option: {
      vaccine: true,
      usg: true,
      his: true,
    },
    doctor: {}    
  }
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else {
      this.date = this.time.timetoisodate(new Date().getTime() - 60 * 60 * 24 * 365 * 1000)
      this.khoitao()
    } 
  }

  public themcauhinh() {
    let nhom = []
    this.nhomloai.forEach(dulieu => {
      nhom.push({
        id: dulieu.id,
        name: dulieu.name,
        checked: false
      })
    });
    this.rest.temp = {
      ngay: 0,
      nhom: nhom
    }
    this.rest.navCtrl.navigateForward('/excel/themcauhinh')
  }

  public capnhatcauhinh(thutu: number) {
    let cauhinh = this.cauhinh[thutu]
    let nhom = []
    this.nhomloai.forEach(dulieu => {
      nhom.push({
        id: dulieu.id,
        name: dulieu.name,
        checked: cauhinh.danhsach.filter((chitiet, thutuchitiet) => {
          return chitiet == dulieu.name
        }).length
      })
      
    });
    this.rest.temp = {
      ngaytruoc: cauhinh.ngay,
      ngay: cauhinh.ngay,
      nhom: nhom
    }
    this.rest.navCtrl.navigateForward('/excel/themcauhinh')
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'khoitaoloai', {}).then(resp => {
      this.rest.defreeze()
      this.loainhac = resp.loainhac
      this.nhomloai = resp.nhomloai
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'khoitaoloai', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.loainhac = resp.loainhac
      this.nhomloai = resp.nhomloai
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }
  
  public async luucauhinh() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'luucauhinhvaccine', {
      ngay: this.ngay
    }).then(resp => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async chonnhom(idnhom: string, idloai: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'chonnhomloai', {
      idnhom: idnhom,
      idloai: idloai,
    }).then(resp => {
      this.loainhac = resp.loainhac
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themloai(thutu: number = -1) {
    let loai = {id: 0, name: '', code: ''}
    if (thutu >= 0) loai = this.loainhac[thutu]
    
    let alert = await this.alert.create({
      message: 'Nhập mã vaccine',
      inputs: [
        { name: 'code', type: 'text', 'placeholder': 'Mã vaccine', value: loai.code},
        { name: 'name', type: 'text', 'placeholder': 'Tên loại', value: loai.name}
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemloai(loai.id, e.code, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoaloai(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa loại vaccine',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xoaloai(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoaloai(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'xoaloai', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.loainhac = resp.loainhac
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanxoacauhinh(ngay: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa cấu hình vaccine',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xoacauhinh(ngay)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoacauhinh(ngay: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'xoacauhinh', {
      ngay: ngay,
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemloai(id: number, code: string, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'themloai', {
      id: id,
      code: code,
      name: name,
    }).then(resp => {
      this.loainhac = resp.loainhac
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themnhomloai(thutu: number = -1) {
    let loai = {id: 0, name: '' }
    if (thutu >= 0) loai = this.nhomloai[thutu]
    let alert = await this.alert.create({
      message: 'Nhập tên nhóm',
      inputs: [
        { name: 'name', type: 'text', 'placeholder': 'Tên loại', value: loai.name}
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemnhomloai(loai.id, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoanhomloai(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'xoanhomloai', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.nhomloai = resp.nhomloai
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemnhomloai(id: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'themnhomloai', {
      id: id,
      name: name,
    }).then(resp => {
      this.nhomloai = resp.nhomloai
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chuyendulieuvaccine() {
    let temp = this.parse()
    if (!temp.doctor.length) {
      this.rest.notify('Xin hãy chọn ít nhất 1 nhân viên')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'chuyendulieuvaccine', temp).then(() => {
      this.userid = 0
      this.rest.defreeze()
      this.rest.notify('Đã chuyển dữ liệu')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoadulieuvaccine() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'xoadulieuvaccine', {
      date: this.time.isodatetotime(this.date) / 1000
    }).then(() => {
      this.rest.defreeze()
      this.rest.notify('Đã chuyển dữ liệu')
    }, () => {
      this.rest.defreeze()
    })
  }

  public parse() {
    let temp = {
      option: [],
      doctor: []
    }

    for (const key in this.recycle.option) {
      if (Object.prototype.hasOwnProperty.call(this.recycle.option, key)) {
        const element = this.recycle.option[key];
        if (element) temp.option.push(key)
      }
    }
    for (const key in this.recycle.doctor) {
      if (Object.prototype.hasOwnProperty.call(this.recycle.doctor, key)) {
        const element = this.recycle.doctor[key];
        if (element) temp.doctor.push(key)
      }
    }
    return temp
  }
}
