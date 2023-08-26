import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-nhomtin',
  templateUrl: './nhomtin.page.html',
  styleUrls: ['./nhomtin.page.scss'],
})
export class NhomtinPage implements OnInit {
  public tukhoa = ''
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.storage.get('loichuongtrinh').then(danhsach => {
        this.xacnhandanhsachloi(danhsach).then(res => {
          if (!this.rest.nhomtin.khoitao) {
            this.khoitao()
          }
        })
      })
      this.rest.action = 'nhomtin'
    })
  }

  public async xacnhandanhsachloi(danhsach: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    return new Promise(resolve => {
      if (danhsach && danhsach.length) {
        this.rest.checkpost('nhomtin', 'xacnhandanhsachloi', {
          danhsach: danhsach
        }).then(resp => {
          this.rest.storage.set('loichuongtrinh', [])
          this.khoitao()
          this.rest.defreeze()
        }, () => {
          this.rest.defreeze()
        })
      }
      else {
        this.rest.defreeze()
        resolve(1)
      }
    })

  }

  public async khoitao() {
    if (!this.rest.nhomtin.khoitao) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('nhomtin', 'khoitao', {}).then(resp => {
        this.rest.defreeze()
        this.rest.nhomtin.khoitao = true
        this.rest.nhomtin.danhsach = resp.danhsach
        this.rest.nhomtin.cauhinhnhantin = resp.cauhinh
        this.rest.nhomtin.cauhinhloai = resp.cauhinhloai
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('nhomtin', 'khoitao', {}).then(resp => {
      this.rest.nhomtin.khoitao = true
      this.rest.nhomtin.danhsach = resp.danhsach
      this.rest.nhomtin.cauhinhnhantin = resp.cauhinh
      event.target.complete();
      this.rest.defreeze()
    }, () => {
      event.target.complete();
      this.rest.defreeze()
    })
  }

  public themnhomtin() {
    this.rest.temp = {
      id: 0,
      tennhom: '',
      mautin: '',
      dulieu: JSON.parse(JSON.stringify(this.rest.nhomtin.cauhinhloai))
    }
    this.rest.navCtrl.navigateForward('/nhomtin/them')
  }

  public async capnhat(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let nhantin = this.rest.nhomtin.danhsach[thutu]
    this.rest.checkpost('nhomtin', 'laydulieunhomtin', {
      id: nhantin.id,
      mautin: nhantin.mautin
    }).then(resp => {
      this.rest.temp = {
        id: nhantin.id,
        tennhom: nhantin.tennhom,
        mautin: nhantin.mautin.replace(/<br>/g, '\n'),
        dulieu: resp.dulieu
      }
      this.rest.navCtrl.navigateForward('/nhomtin/them')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async chitiet(thutu: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let nhomtin = this.rest.nhomtin.danhsach[thutu]
    this.rest.checkpost('nhomtin', 'chitiet', {
      id: nhomtin.id,
      mautin: nhomtin.mautin
    }).then(resp => {
      this.rest.defreeze()
      this.rest.nhomtin.danhsachnhan = resp.danhsach
      this.rest.nhomtin.tennhom = nhomtin.tennhom
      this.rest.nhomtin.id = nhomtin.id
      this.rest.nhomtin.mautin = nhomtin.mautin
      this.rest.navCtrl.navigateForward('/nhomtin/chitiet')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async timkiem() {
    if (this.tukhoa.length < 3) {
      this.rest.notify('Nhập ít nhất 3 ký tự')
      return 0
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('nhomtin', 'timkiem', {
      tukhoa: this.tukhoa
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.danhsach
      this.rest.navCtrl.navigateForward('/nhomtin/tim')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhanxoa(id: number) {
    const alert = await this.alert.create({
      header: 'Xóa chiến dịch nhắn tin',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.xoa(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async xoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('nhomtin', 'xoanhomtin', {
      id: id,
    }).then(resp => {
      this.rest.nhomtin.danhsach = resp.danhsach
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
