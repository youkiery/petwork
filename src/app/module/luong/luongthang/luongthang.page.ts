import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongthang',
  templateUrl: './luongthang.page.html',
  styleUrls: ['./luongthang.page.scss'],
})
export class LuongthangPage {
  public current = 0
  public bankinput: any = 0
  public ibank = [
    '/assets/icon/gbank.png',
    '/assets/icon/bank.png'
  ]
  public toggle = false
  public toggle2 = false
  @ViewChild('bank') bank: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
    else if (!this.rest.luong.khoitaoluongthang) this.khoitao()
    else if (!this.rest.luong.dulieu.id) this.tailaingaynghi()
    if (this.rest.luong.dulieu.id) this.toggle = true
  }

  public async khoitao() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'khoitaoluongthang', {}).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.khoitaoluongthang = true
      this.rest.luong.khoitaonhanvien = true
      this.rest.luong.excel = phanhoi.excel
      this.rest.luong.nhanvien = phanhoi.danhsachnhanvien
      if (!this.rest.luong.dulieu.id) this.tailaingaynghi()
    }, () => {
      this.rest.defreeze()
    })
  }

  public tailaingaynghi() {
    this.bankinput = null
    let ngaynghi = []
    this.rest.luong.nhanvien.forEach((nhanvien: any) => {
      ngaynghi.push({
        tennhanvien: nhanvien.ten,
        ngaynghi: 0
      })
    })
    this.rest.luong.dulieu.ngaynghi = ngaynghi
  }

  public change(i: number) {
    let tam = Number(this.rest.luong.thuchi[i].tienchi.replace(/,/g, ''))
    if (!tam) tam = 0
    this.rest.luong.thuchi[i].tienchi = this.rest.comma(tam.toString())
  }

  public xoathuchi(i: number) {
    this.rest.luong.dulieu.thuchi = this.rest.luong.dulieu.thuchi.filter((thuchi, thutu) => {
      return i != thutu
    })
  }

  public themthuchi() {
    this.rest.luong.dulieu.thuchi.push({
      loaichi: '',
      tienchi: 0
    })
  }

  public async luuexcel() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'luuexcel', {
      excel: this.rest.luong.excel
    }).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.excel = phanhoi.excel
    }, () => {
      this.rest.defreeze()
    })
  }
    
  public nhaptien(i: number) {
    let tam = Number(this.rest.luong.dulieu.thuchi[i].tienchi.toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.luong.dulieu.thuchi[i].tienchi = this.rest.comma(tam)
  }

  public thaydoiexcel() {
    let file = this.bank
    const filelist: FileList = file.nativeElement.files
    if (filelist.length) this.bankinput = filelist[0]
    else this.bankinput[this.current] = 0
    this.bank.nativeElement.value = ''
  }
  
  public async chonexcel() {
    this.bank.nativeElement.click()
  }

  public async chotluong() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'chotluongthang', this.rest.luong.dulieu).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.danhsach = phanhoi.danhsach
      this.rest.luong.chitiet = phanhoi.chitiet
      setTimeout(() => {
        this.rest.navCtrl.navigateForward('/luong/chitiet')
      }, 500);
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async luungaynghi() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'luungaynghi', this.rest.luong.dulieu).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.danhsach = phanhoi.danhsach
      this.rest.luong.dulieu = phanhoi.dulieu
    }, () => {
      this.rest.defreeze()
    })
  }

  public capnhat(i: number) {
    let nhanvien = this.rest.luong.nhanvien[i]
    
    this.rest.temp = {
      id: this.rest.luong.dulieu.id,
      userid: nhanvien.userid,
      tile: nhanvien.tile,
      phucap: nhanvien.phucap,
      phucap2: nhanvien.phucap2,
    }
    this.rest.navCtrl.navigateForward('/luong/capnhatnhanvien')
  }

  public async upload() {
    if (!this.bankinput) this.rest.notify('Chưa chọn file excel')
    else {
      let body = new FormData();
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('salary', this.bankinput);
      body.append('session', this.rest.session);
      body.append('type', 'luong');
      body.append('action', 'excelluongthang');
      body.append('version', this.rest.version.toString());
      body.append('id', this.rest.luong.dulieu.id.toString());
      body.append('thoigian', this.rest.luong.dulieu.thoigian);
      body.append('excel[nhanvien]', this.rest.luong.excel.nhanvien);
      body.append('excel[doanhthu]', this.rest.luong.excel.doanhthu);
      body.append('excel[loinhuan]', this.rest.luong.excel.loinhuan);

      this.rest.luong.dulieu.ngaynghi.forEach(ngaynghi => {
        body.append('ngaynghi['+ ngaynghi.tennhanvien +']', ngaynghi.ngaynghi);
      });

      if (!this.rest.luong.dulieu.thuchi.length) {
        body.append('thuchi[0][loaichi]', '');
        body.append('thuchi[0][tienchi]', '0');
      }
      else {
        this.rest.luong.dulieu.thuchi.forEach((thuchi, index) => {
          body.append('thuchi['+index+'][tienchi]', thuchi.tienchi);
          body.append('thuchi['+index+'][loaichi]', thuchi.loaichi);
        });
      }  
      this.rest.http.post(this.rest.baseurl, body).toPromise().then((phanhoi: any) => {
        this.rest.defreeze()
        if (phanhoi.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          this.rest.luong.danhsach = phanhoi.danhsach
          this.rest.luong.dulieu = phanhoi.dulieu
          this.rest.notify(phanhoi.tinnhan)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
}
