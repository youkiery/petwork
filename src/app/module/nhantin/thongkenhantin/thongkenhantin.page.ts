import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-thongkenhantin',
  templateUrl: './thongkenhantin.page.html',
  styleUrls: ['./thongkenhantin.page.scss'],
})
export class ThongkenhantinPage implements OnInit {
  public bieudo: any;
  public sieuam = 0
  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhantin')
      else 
      if (!this.rest.nhantin.khoitaothongke) {
        this.rest.nhantin.batdau = this.rest.home.month.start
        this.rest.nhantin.ketthuc = this.rest.home.month.end
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaothongke', {
      batdau: this.rest.nhantin.batdau,
      ketthuc: this.rest.nhantin.ketthuc,
      loctheonhom: this.loctheonhom(),
      sieuam: this.sieuam,
      khoitao: this.rest.nhantin.khoitaothongke
    }).then(resp => {
      this.rest.defreeze()
      this.rest.nhantin.thongke = resp.dulieu
      this.rest.nhantin.chonngay = resp.chonngay
      this.rest.nhantin.khoitaothongke = true
      this.taobieudo()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaothongke', {
      batdau: this.rest.nhantin.batdau,
      ketthuc: this.rest.nhantin.ketthuc,
      loctheonhom: this.loctheonhom(),
      sieuam: this.sieuam,
      khoitao: this.rest.nhantin.khoitaothongke
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.nhantin.thongke = resp.dulieu
      this.rest.nhantin.chonngay = resp.chonngay
      this.rest.nhantin.khoitaothongke = true
      this.taobieudo()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }
  
  public taobieudo() {
    if (this.bieudo) this.bieudo.destroy();
    let thongke = this.rest.nhantin.thongke
    this.bieudo = new Chart("bieudo", {
      type: 'bar',
      data: {
        labels: ["Tổng", "SMS", "GD","ZNS", "Khác"],
        datasets: [{
          label: "Tổng",
          data: [thongke.tongkhach, thongke.loainhan[0], thongke.loainhan[1], thongke.loainhan[2], thongke.loainhan[3]],
          backgroundColor: 'lightgreen',
        },
        {
          label: "Quay lại",
          data: [thongke.danhsachden.length, thongke.quaylai[0], thongke.quaylai[1], thongke.quaylai[2], thongke.quaylai[3]],
          backgroundColor: 'lightblue',
        }],
      }
    })
  }

  public loctheonhom() {
    var danhsach = []    
    this.rest.nhantin.thongke.nhomnhantin.forEach((nhom, thutu) => {
      if (nhom.tick > 0) danhsach.push(nhom.id)
    })
    return danhsach.join(',')
  }

  public chonnhom(thutu: number) {
    this.rest.nhantin.thongke.nhomnhantin[thutu].tick = Number(!Number(this.rest.nhantin.thongke.nhomnhantin[thutu].tick))
    this.sieuam = 0
    this.khoitao()    
  }

  public chonsieuam() {
    this.rest.nhantin.thongke.nhomnhantin.forEach((nhom, thutu) => {
      this.rest.nhantin.thongke.nhomnhantin[thutu].tick = Number(this.sieuam)
    })
    this.sieuam = Number(!this.sieuam)
    this.khoitao()    
  }

  public chonngay(batdau: string, ketthuc: string) {
    this.rest.nhantin.batdau = batdau
    this.rest.nhantin.ketthuc = ketthuc
  }
}
