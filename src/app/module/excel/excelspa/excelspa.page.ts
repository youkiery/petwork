import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelspa',
  templateUrl: './excelspa.page.html',
  styleUrls: ['./excelspa.page.scss'],
})
export class ExcelspaPage implements OnInit {
  public loainhac = []
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
    this.rest.checkpost('admin', 'spa', {}).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.loainhac = resp.loainhac
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'spa', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.home.spa = resp.list
      this.loainhac = resp.loainhac
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async themloai(thutu: number = -1) {
    let loai = {id: 0, name: '', code: ''}
    if (thutu >= 0) loai = this.loainhac[thutu]
    
    let alert = await this.alert.create({
      message: 'Nhập mã spa',
      inputs: [
        { name: 'code', type: 'text', 'placeholder': 'mã spa', value: loai.code},
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

  public async xoaloai(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'xoaloai', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.loainhac = resp.loainhac
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanthemloai(id: number, code: string, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'themloai', {
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

  
  public async upspa(id: number, id2: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'uptype', {
      id: id,
      id2: id2,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async downspa(id: number, id2: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'downtype', {
      id: id,
      id2: id2,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertSpa() {
    let alert = await this.alert.create({
      message: 'Thêm dịch vụ Spa',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: ''}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertSpaSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async updateSpa(index: number) {
    let alert = await this.alert.create({
      message: 'Cập nhật dịch vụ Spa',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: this.rest.home.spa[index].name}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updateSpaSubmit(this.rest.home.spa[index].id, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertSpaSubmit(name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'inserttype', {
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateSpaSubmit(id: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'updatetype', {
      id: id,
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeSpa(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa dịch vụ Spa',
      buttons: [
        { text: 'Trở về', role: 'cancel', },
        {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSpaSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSpaSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async toggleDefault(id: number, alt: string) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'toggletype', {
      id: id,
      alt: alt,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

}
