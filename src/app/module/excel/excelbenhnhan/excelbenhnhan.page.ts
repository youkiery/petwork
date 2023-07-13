import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelbenhnhan',
  templateUrl: './excelbenhnhan.page.html',
  styleUrls: ['./excelbenhnhan.page.scss'],
})
export class ExcelbenhnhanPage implements OnInit {
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
      this.loainhac = resp.loainhac
      this.loaicong = resp.loaicong
    }, () => {
      this.rest.defreeze()
      event.target.complete();
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
