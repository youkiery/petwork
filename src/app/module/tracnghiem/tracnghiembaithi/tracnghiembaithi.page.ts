import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiembaithi',
  templateUrl: './tracnghiembaithi.page.html',
  styleUrls: ['./tracnghiembaithi.page.scss'],
})
export class TracnghiembaithiPage implements OnInit {
  public chuyendoi = ["A", "B", "C", "D"]
  public thoigian = ""
  public diemthi = ""
  public tongthoigian = 0
  public interval = null
  public quahan = false
  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else {
      this.tongthoigian = 20 * 60; // 20 phut
      let chenhlech = this.tongthoigian - (new Date().getTime() / 1000 - this.rest.tracnghiem.bailam.thoigian)
      let phut = Math.floor(chenhlech / 60)
      let giay = Math.floor(chenhlech - phut * 60);
      this.thoigian = "Thời gian còn lại: "+ this.rest.dienso(phut) + ":"+ this.rest.dienso(giay)
      if (chenhlech <= 0 || this.rest.tracnghiem.bailam.nopbai == 1) this.hienthidiem()
      else {
        this.interval = setInterval(() => {
          let chenhlech = this.tongthoigian - (new Date().getTime() / 1000 - this.rest.tracnghiem.bailam.thoigian)
          let phut = Math.floor(chenhlech / 60)
          let giay = Math.floor(chenhlech - phut * 60);
          this.thoigian = "Thời gian còn lại: "+ this.rest.dienso(phut) + ":"+ this.rest.dienso(giay)
          if (chenhlech <= 0) this.hienthidiem()
        }, 1000)
      }
    }
  }

  ionViewWillLeave() {
    clearInterval(this.interval)
  }

  public async hienthidiem() {
    clearInterval(this.interval)
    this.rest.checkpost('tracnghiem', 'xemdiem', {
      idbaithi: this.rest.tracnghiem.bailam.idbaithi,
    }).then(resp => {
      this.quahan = true
      this.diemthi = resp.diemthi
      this.rest.tracnghiem.bailam.nopbai = 1
    }, () => {})
  }

  public async chondapan(thutucauhoi: number, thutucautraloi: number) {
    let cautraloi = this.rest.tracnghiem.bailam.danhsach[thutucauhoi].cautraloi[thutucautraloi]
    
    this.rest.checkpost('tracnghiem', 'chondapan', {
      idbaithi: this.rest.tracnghiem.bailam.idbaithi,
      idcauhoi: cautraloi.idcauhoi, 
      idcautraloi: cautraloi.id,
    }).then(resp => {
      this.rest.tracnghiem.danhsach = resp.danhsach
    }, () => {})
  }

  public async nopbai() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tracnghiem', 'nopbai', {
      idbaithi: this.rest.tracnghiem.bailam.idbaithi,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitao = false
      this.hienthidiem()
    }, () => {
      this.rest.defreeze()
    })
  }
}
