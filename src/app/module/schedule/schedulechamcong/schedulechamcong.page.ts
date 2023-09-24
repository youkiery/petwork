import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-schedulechamcong',
  templateUrl: './schedulechamcong.page.html',
  styleUrls: ['./schedulechamcong.page.scss'],
})
export class SchedulechamcongPage implements OnInit {
  public mau = [
    "green",
    "gray",
    "yellow",
    "orange",
    "red"
  ]
  public dachon:any = {}
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'thongkenghi'
      if (!this.rest.thongkenghi.khoitao) {
        this.rest.thongkenghi.tungay = this.rest.home.month.start
        this.rest.thongkenghi.denngay = this.rest.home.month.end
        this.khoitao() 
      }
    })
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitao', {
      tungay: this.rest.thongkenghi.tungay,
      denngay: this.rest.thongkenghi.denngay
    }).then(resp => {
      this.rest.defreeze()
      this.rest.thongkenghi.khoitao = true
      this.rest.thongkenghi.danhsach = resp.danhsach
      this.rest.thongkenghi.danhsachngay = resp.danhsachngay
      this.dachon = resp.dachon
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitao', {
      tungay: this.rest.thongkenghi.tungay,
      denngay: this.rest.thongkenghi.denngay
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.thongkenghi.khoitao = true
      this.rest.thongkenghi.danhsach = resp.danhsach
      this.rest.thongkenghi.danhsachngay = resp.danhsachngay
      this.dachon = resp.dachon
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  // public chonclass(i, ngay, idnhanvien) {
  //   var dulieu = this.rest.thongkenghi.danhsach[i].dulieu
  //   console.log(dulieu);
    
  //   return (dulieu && dulieu.length ? (this.mau[dulieu[0]]) : 'red') + (this.dachon[idnhanvien] && this.dachon[idnhanvien][ngay] ? 'dachon' : '')
  // }
  
  public async xacnhandachon() {
    const alert = await this.alert.create({
      header: 'Xác nhận những mục đã chọn',
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhandachonok()
        }
        }
      ]
    });
    await alert.present();
  }

  public async xacnhandachonok() {
    await this.rest.freeze('Đang tải dữ liệu...')

    this.rest.checkpost('thongkenghi', 'xacnhandachon', {
      tungay: this.rest.thongkenghi.tungay,
      denngay: this.rest.thongkenghi.denngay,
      dulieu: this.dachon
    }).then(resp => {
      this.rest.defreeze()
      this.dachon = resp.dachon
      this.rest.thongkenghi.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public chondanhsach(idnhanvien, ngay) {
    if (!this.dachon[idnhanvien]) this.dachon[idnhanvien] = {}
    if (!this.dachon[idnhanvien][ngay]) this.dachon[idnhanvien][ngay] = 1
    else this.dachon[idnhanvien][ngay] = 0
  }

  public cauhinh() {
    this.rest.navCtrl.navigateForward("/schedule/cauhinh")
  }
  
  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.rest.thongkenghi.tungay).split('/')
    let tungay = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    let denngay = new Date(Number(ngay[2]), Number(ngay[1]) + songay, 1)
    this.rest.thongkenghi.tungay = this.time.timetoisodate(tungay.getTime())
    this.rest.thongkenghi.denngay = this.time.timetoisodate(denngay.getTime() - 1)
    this.khoitao()
  }
}
