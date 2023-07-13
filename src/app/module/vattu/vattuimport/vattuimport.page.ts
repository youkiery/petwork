import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vattuimport',
  templateUrl: './vattuimport.page.html',
  styleUrls: ['./vattuimport.page.scss'],
})
export class VattuimportPage implements OnInit {
  public name = 'Chưa chọn file Excel'
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vattu')
  }

  public chonfile() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) {
      this.name = fileList[0].name
    }
    else this.name = 'Chưa chọn file'
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public async tailen() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'vattu');
      body.append('action', 'import');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);
      var loctang = this.danhsachloctang()
      loctang.forEach(tang => {
        body.append('loctang[]', tang);
      });

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.overtime) {
          this.rest.notify("Đã hết thời gian sử dụng")
          this.rest.root()
        }
        else if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          if (resp.messenger) this.rest.notify(resp.messenger)
          this.rest.vattu.dulieu = resp.dulieu
          this.lochanghoa()
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
  
  public lochanghoa() {
    let danhsachtam = []
    let tukhoa = this.rest.alias(this.rest.vattu.tukhoa)
    this.rest.vattu.dulieu.danhsach.forEach(vattu => {
      if (this.rest.alias(vattu.ten).indexOf(tukhoa) >= 0) danhsachtam.push(vattu)
    })
    this.rest.vattu.danhsachtam = danhsachtam
  }

  public download() {
    window.open(this.rest.base + 'include/file-mau-import-vat-tu.xlsx', "_blank");
  }

  public danhsachloctang() {
    var danhsach = []
    for (const key in this.rest.vattu.loctang) {
      if (Object.prototype.hasOwnProperty.call(this.rest.vattu.loctang, key)) {
        danhsach.push(key)
      }
    }
    if (danhsach.length) return danhsach
    return ['']
  }
}
