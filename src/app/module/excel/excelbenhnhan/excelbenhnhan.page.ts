import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelbenhnhan',
  templateUrl: './excelbenhnhan.page.html',
  styleUrls: ['./excelbenhnhan.page.scss'],
})
export class ExcelbenhnhanPage implements OnInit {
  public loaidichvu = []
  public loainhac = []
  public loaicong = []
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'khoitaoloai', {}).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.loaidichvu
      this.loainhac = resp.loainhac
      this.loaicong = resp.loaicong
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'khoitaoloai', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.loaidichvu = resp.loaidichvu
      this.loainhac = resp.loainhac
      this.loaicong = resp.loaicong
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  
  public async toggleDefault(id: number, alt: string) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('his', 'toggletype', {
      id: id,
      alt: alt,
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updatehis(index: number) {
    let alert = await this.alert.create({
      message: 'Cập nhật dịch vụ',
      inputs: [
        { name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: this.loaidichvu[index].tendanhmuc },
        { name: 'time', type: 'text', 'placeholder': 'Thời gian dự kiến', value: this.loaidichvu[index].thoigian }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updatehisSubmit(this.loaidichvu[index].id, e.name, e.time)
          }
        }
      ]
    });

    await alert.present();
  }
  public async updatehisSubmit(id: number, name: string, time: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'updatetype', {
      id: id,
      name: name,
      time: time
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removehis(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa dịch vụ his',
      buttons: [
        { text: 'Trở về', role: 'cancel', },
        {
          text: 'Xác nhận',
          handler: (e) => {
            this.removehisSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removehisSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uphis(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    let loaihis1 = this.loaidichvu[thutu]
    let loaihis2 = this.loaidichvu[thutu - 1]
    this.rest.checkpost('his', 'uptype', {
      id1: loaihis1.id,
      id2: loaihis2.id,
      vitri1: loaihis1.vitri,
      vitri2: loaihis2.vitri,
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async downhis(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    let loaihis1 = this.loaidichvu[thutu]
    let loaihis2 = this.loaidichvu[thutu + 1]
    this.rest.checkpost('his', 'downtype', {
      id1: loaihis1.id,
      id2: loaihis2.id,
      vitri1: loaihis1.vitri,
      vitri2: loaihis2.vitri,
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async inserthis() {
    let alert = await this.alert.create({
      message: 'Thêm dịch vụ his',
      inputs: [
        { name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: '' },
        { name: 'time', type: 'number', 'placeholder': 'Thời gian dự kiến (phút)', value: '0'}
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.inserthisSubmit(e.name, e.time)
          }
        }
      ]
    });

    await alert.present();
  }

  public async inserthisSubmit(name: string, time: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'inserttype', {
      name: name,
      time: time
    }).then(resp => {
      this.rest.defreeze()
      this.loaidichvu = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themloai(thutu: number = -1) {
    let loai = {id: 0, code: ''}
    if (thutu >= 0) loai = this.loainhac[thutu]
    
    let alert = await this.alert.create({
      message: 'Nhập mã import',
      inputs: [
        { name: 'code', type: 'text', 'placeholder': 'Mã import', value: loai.code},
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemloai(loai.id, e.code)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoaloai(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'xoaloai', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.loainhac = resp.loainhac
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemloai(id: number, code: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'themloai', {
      id: id,
      code: code,
    }).then(resp => {
      this.loainhac = resp.loainhac
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async themloaicong(thutu: number = -1) {
    let loai = {id: 0, name: '', code: '', price: ''}
    if (thutu >= 0) loai = this.loaicong[thutu]
    
    let alert = await this.alert.create({
      message: 'Nhập mã import',
      inputs: [
        { name: 'code', type: 'text', 'placeholder': 'Mã import', value: loai.code},
        { name: 'name', type: 'text', 'placeholder': 'Tên loại công', value: loai.name},
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanthemloaicong(loai.id, e.code, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoaloaicong(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'xoaloaicong', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.loaicong = resp.loaicong
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemloaicong(id: number, code: string, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'themloaicong', {
      id: id,
      code: code,
      name: name,
    }).then(resp => {
      this.loaicong = resp.loaicong
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
