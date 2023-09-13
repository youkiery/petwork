import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tailieu',
  templateUrl: './tailieu.page.html',
  styleUrls: ['./tailieu.page.scss'],
})
export class TailieuPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'tailieu'
      if (!this.rest.tailieu.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tailieu', 'khoitao', {
      timkiem: this.rest.tailieu.timkiem
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tailieu.khoitao = true
      this.rest.tailieu.danhmuc = resp.danhmuc
      this.rest.tailieu.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tailieu', 'khoitao', {
      timkiem: this.rest.tailieu.timkiem
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.tailieu.khoitao = true
      this.rest.tailieu.danhmuc = resp.danhmuc
      this.rest.tailieu.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
  
  public async xoatailieu(id: number) {
    let alert = await this.alert.create({
      message: 'Xoá tài liệu?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoatailieu(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoatailieu(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tailieu', 'xoatailieu', {
      id: id,
      timkiem: this.rest.tailieu.timkiem
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.tailieu.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public themtailieu() {
    this.rest.temp = {
      id: 0,
      tentailieu: "",
      iddanhmuc: "0",
      gioithieu: "",
      link: "",
      timkiem: this.rest.tailieu.timkiem
    }
    this.rest.navCtrl.navigateForward("/tailieu/them")
  }

  public download(url: string) {
    window.open(url)
  }

  public capnhattailieu(thutu: number) {
    let tailieu = this.rest.tailieu.danhsach[thutu]
    
    this.rest.temp = {
      id: tailieu.id,
      tentailieu: tailieu.tentailieu,
      iddanhmuc: tailieu.iddanhmuc,
      gioithieu: tailieu.gioithieu,
      link: tailieu.link,
      timkiem: this.rest.tailieu.timkiem
    }
    this.rest.navCtrl.navigateForward("/tailieu/them")
  }

  public danhmuc() {
    this.rest.navCtrl.navigateForward("/tailieu/danhmuc")
  }
}
