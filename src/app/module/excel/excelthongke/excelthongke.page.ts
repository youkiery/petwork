import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import Chart from 'chart.js/auto';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-excelthongke',
  templateUrl: './excelthongke.page.html',
  styleUrls: ['./excelthongke.page.scss'],
})
export class ExcelthongkePage implements OnInit {
  public bieudongay: any;
  public bieudothu: any;
  public bieudogio: any;
  public data = {
    ngay: {
      datasets: []
    },
    thu: {
      datasets: []
    },
    gio: {
      datasets: []
    },
  }
  public thoigian = ''
  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else {
      this.thoigian = this.time.datetoisodate(this.rest.home.today)
      this.khoitao()
    }
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaothongkespa', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      this.data = resp.data
      this.createChart()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'khoitaothongkespa', {
      thoigian: this.thoigian
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.data = resp.data
      this.createChart()
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public createChart() {
    if (this.bieudongay) this.bieudongay.destroy();
    this.bieudongay = new Chart("bieudongay", {
      type: 'line', 
      data: this.data.ngay
    })

    if (this.bieudothu) this.bieudothu.destroy();
    this.bieudothu = new Chart("bieudothu", {
      type: 'line', 
      data: this.data.thu
    })

    if (this.bieudogio) this.bieudogio.destroy();
    this.bieudogio = new Chart("bieudogio", {
      type: 'line', 
      data: this.data.gio
    })
  }

  public chonngay(songay: number) {
    let ngay = this.time.isodatetodate(this.thoigian).split('/')
    let thoigian = new Date(Number(ngay[2]), Number(ngay[1]) - 1 + songay, Number(ngay[0]))
    this.thoigian = this.time.timetoisodate(thoigian.getTime())
  }
}
