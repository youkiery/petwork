import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattuthongke',
  templateUrl: './vattuthongke.page.html',
  styleUrls: ['./vattuthongke.page.scss'],
})
export class VattuthongkePage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
  }

  // public hienthiloctang() {
  //   var loctang = []
  //   this.rest.vattu.loctang.forEach(tang => {
  //     loctang.push(tang.ten)
  //   })
  //   return loctang.join(', ')
  // }

  // public chontang() {
  //   let thuoctang = {}
  //   this.rest.vattu.loctang.forEach(tang => {
  //     thuoctang[tang.id] = 1
  //   })
  //   this.rest.temp = {
  //     thuoctang: thuoctang,
  //     thongke: true
  //   }
  //   this.rest.navCtrl.navigateForward('/vattu/chontang')
  // }

  // public danhsachloctang() {
  //   var danhsach = []
  //   this.rest.vattu.loctang.forEach(tang => {
  //     danhsach.push(tang.id)
  //   })
  //   return danhsach    
  // }

  // public async khoitao() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('vattu', 'khoitaothongke', {
  //     loctang: this.danhsachloctang()
  //   }).then(resp => {
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vattu', 'khoitaothongke', {
      loctang: this.rest.vattu.loctang
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

}
