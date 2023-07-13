import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spanhantin',
  templateUrl: './spanhantin.page.html',
  styleUrls: ['./spanhantin.page.scss'],
})
export class SpanhantinPage implements OnInit {
  public name = ''
  public mautin = ''
  public tennhom = ''
  public lich = "0"
  public loai = "0"
  public loainhac = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa')
  }

  public dientruong(truong: string) {
    this.mautin += truong
  }

  public async xacnhan() {
    await this.rest.freeze('Đang tải dữ liệu...')
    let danhsach = []
    this.rest.temp.forEach(khachhang => {
      danhsach.push(khachhang.idkhach)
    });
    this.rest.checkpost('spa', 'themchuongtrinh', {
      tennhom: this.tennhom,
      mautin: this.mautin,
      danhsach: danhsach
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.back()
      this.rest.back()
      this.rest.back()
      setTimeout(() => {
        this.rest.navCtrl.navigateForward('/nhomtin')
      }, 100);
    }, () => {
      this.rest.defreeze()
    })
  }
}
