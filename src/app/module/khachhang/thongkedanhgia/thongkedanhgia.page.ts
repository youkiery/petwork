import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-thongkedanhgia',
  templateUrl: './thongkedanhgia.page.html',
  styleUrls: ['./thongkedanhgia.page.scss'],
})
export class ThongkedanhgiaPage implements OnInit {
  public thoigian = {
    batdau: "",
    ketthuc: ""
  }
  public bieudongay: any;
  public bieudothu: any;
  public bieudogio: any;
  public dulieu = {
    danhgia: {
      datasets: []
    },
    nhanvien: {
      datasets: []
    },
  }
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
    else {
      this.thoigian = {
        batdau: this.rest.home.month.start,
        ketthuc: this.rest.home.month.end,
      }
      this.khoitao()
    }
  }
  
  public createChart() {
    if (this.bieudongay) this.bieudongay.destroy();
    this.bieudongay = new Chart("bieudongay", {
      type: 'line',
      data: this.dulieu.danhgia
    })

    if (this.bieudothu) this.bieudothu.destroy();
    this.bieudothu = new Chart("bieudothu", {
      type: 'bar',
      data: this.dulieu.nhanvien
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaothongke', this.thoigian).then(resp => {
      this.rest.defreeze()
      this.dulieu = resp.dulieu
      this.createChart()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('khachhang', 'khoitaothongke', this.thoigian).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.dulieu = resp.dulieu
      this.createChart()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }
}
