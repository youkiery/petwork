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
      if (this.rest.tracnghiem.bailam.nopbai == 1) this.hienthidiem()
      else {
        this.hienthithoigian()
        this.interval = setInterval(() => {
          this.hienthithoigian()
        }, 1000)
      }
    }
  }

  public hienthithoigian() {
    let chenhlech = this.rest.tracnghiem.bailam.han - new Date().getTime() / 1000
    let phut = Math.floor(chenhlech / 60)
    let giay = Math.floor(chenhlech - phut * 60);
    this.thoigian = "Thời gian còn lại: "+ this.rest.dienso(phut) + ":"+ this.rest.dienso(giay)
    if (chenhlech <= 0) this.hienthidiem()
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

  public hienthidapan(thutucauhoi: number, thutucautraloi: number) {
    let luachon = this.rest.tracnghiem.bailam.danhsach[thutucauhoi].luachon
    if (this.quahan) {
      let cautraloi = this.rest.tracnghiem.bailam.danhsach[thutucauhoi].cautraloi[thutucautraloi]
      if (cautraloi.dapan == 1) return "dung"
      else if (luachon == thutucautraloi) return "sai"
    }

    if (luachon == thutucautraloi) return "dachon"
    return ""
  }

  public async chondapan(thutucauhoi: number, thutucautraloi: number) {
    if (!this.quahan) {
      let cautraloi = this.rest.tracnghiem.bailam.danhsach[thutucauhoi].cautraloi[thutucautraloi]
      this.rest.tracnghiem.bailam.danhsach[thutucauhoi].luachon = thutucautraloi
      this.rest.checkpost('tracnghiem', 'chondapan', {
        idbaithi: this.rest.tracnghiem.bailam.idbaithi,
        idcauhoi: cautraloi.idcauhoi, 
        idcautraloi: cautraloi.id,
      }).then(resp => {
        // this.rest.tracnghiem.dethi = resp.danhsach
      }, () => {})
    }
  }

  public async nopbai() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('tracnghiem', 'nopbai', {
      idbaithi: this.rest.tracnghiem.bailam.idbaithi,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.khoitaodethi = false
      this.hienthidiem()
    }, () => {
      this.rest.defreeze()
    })
  }
}
