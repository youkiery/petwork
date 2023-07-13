import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-themcauhinh',
  templateUrl: './themcauhinh.page.html',
  styleUrls: ['./themcauhinh.page.scss'],
})
export class ThemcauhinhPage implements OnInit {
  public mautin = ''
  public lich = "0"
  public loai = "0"
  public sukien = '0'
  public loainhac = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhantin')
    else this.khoitao()
  }

  public khoitao() {
    this.loainhac = []
    this.rest.nhantin.cauhinhnhantin.danhsachloai.forEach(loai => {
      this.loainhac.push({
        id: loai.id,
        name: loai.name,
        check: 0
      })
    })

    if (this.rest.temp.id) {
      this.rest.temp.loai.forEach(loai => {
        this.loainhac.forEach((loainhac, thutu) => {
          if (loai.id == loainhac.id) this.loainhac[thutu].check = 1
        });
      })
      this.mautin = this.rest.temp.mautin
      this.lich = this.rest.temp.lich.toString()
      this.loai = this.rest.temp.loainhac
      this.sukien = this.rest.temp.sukien
    }
  }

  public dientruong(truong: string) {
    this.mautin += truong
  }

  public chonnhanh(so: string) {
    this.lich = so
  }

  public async xacnhan() {
    var danhsachnhac = []
    if (this.loai == '0') {
      this.loainhac.forEach(loai => {
        if (loai.check) danhsachnhac.push(loai.id)
      })
      if (!danhsachnhac.length) {
        this.rest.notify('Hãy chọn ít nhất 1 loại nhắc')
        return 0
      }
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'luumautin', {
      id: this.rest.temp.id,
      nhom: danhsachnhac,
      mautin: this.mautin.replace(/\n/g, '<br>'),
      lich: this.lich,
      loainhac: this.loai,
      sukien: this.sukien
    }).then(resp => {
      this.rest.nhantin.cauhinhnhantin.danhsachloai = resp.danhsachloai
      this.rest.nhantin.cauhinhnhantin.mautin = resp.danhsach
      this.rest.back()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
