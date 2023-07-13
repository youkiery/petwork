import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-thietbi',
  templateUrl: './thietbi.page.html',
  styleUrls: ['./thietbi.page.scss'],
})
export class ThietbiPage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'thietbi'
      if (!this.rest.thietbi.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('thietbi', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      this.rest.thietbi.khoitao = true
      this.rest.thietbi.danhsach = resp.danhsach
      this.locthietbi()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('thietbi', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.thietbi.khoitao = true
      this.rest.thietbi.danhsach = resp.danhsach
      this.locthietbi()
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public locthietbi() {
    let danhsachtam = []
    let tukhoa = this.rest.alias(this.rest.thietbi.tukhoa)
    this.rest.thietbi.danhsach.forEach(thietbi => {
      if (thietbi.alias.indexOf(tukhoa) >= 0) danhsachtam.push(thietbi)
    })
    this.rest.thietbi.danhsachtam = danhsachtam
  }

  public themthietbi() {
    this.rest.temp = {
      id: 0,
      ten: "",
      hinhanh: "",
      congdung: "",
      link: ""
    }
    this.rest.navCtrl.navigateForward('/thietbi/them')
  }

  public capnhatthietbi(i: number) {
    let thietbi = this.rest.thietbi.danhsachtam[i]
    this.rest.temp = {
      id: thietbi.id,
      ten: thietbi.ten,
      hinhanh: thietbi.hinhanh,
      congdung: thietbi.congdung,
      link: thietbi.link,
    }
    this.rest.navCtrl.navigateForward('/thietbi/them')
  }
    
  public async xoathietbi(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa thiết bị này?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoathietbi(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public chuyenhuong(link: string) {
    window.open(link)
  }

  public async xacnhanxoathietbi(id: number = 0) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thietbi', 'xoathietbi', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.taichinh.danhsach = resp.danhsach
      this.locthietbi()
    }, () => {
      this.rest.defreeze()
    })
  }
}
