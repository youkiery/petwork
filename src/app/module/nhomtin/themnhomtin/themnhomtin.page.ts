import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-themnhomtin',
  templateUrl: './themnhomtin.page.html',
  styleUrls: ['./themnhomtin.page.scss'],
})
export class ThemnhomtinPage implements OnInit {
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  public name = ''
  public mautin = ''
  public tennhom = ''
  public lich = "0"
  public loai = "0"
  public loainhac = []
  public tab = 'vaccine'
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhomtin')
    else {
      this.tennhom = this.rest.temp.tennhom
      this.mautin = this.rest.temp.mautin
    }
  }

  public dientruong(truong: string) {
    this.mautin += truong
  }

  public chonfile() {
    this.pwaphoto.nativeElement.click();
  }

  public tenfile() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) fileList[0].name
    else this.name = 'Chưa chọn file'
  }

  public laydulieu() {
    let dulieu = { 'vaccine': [], 'usg': [], 'spa': [], 'treat': [] }
    for (const key in this.rest.temp.dulieu) {
      if (Object.prototype.hasOwnProperty.call(this.rest.temp.dulieu, key)) {
        this.rest.temp.dulieu[key].forEach((thongtin: any) => {
          if (thongtin.checker) dulieu[key].push(thongtin.id)
        })
      }
    }
    return dulieu
  }

  public async xacnhan() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    await this.rest.freeze('Đang tải dữ liệu...')
    body.append('file', fileList[0]);
    body.append('mautin', this.mautin.replace(/\n/g, '<br>'));
    body.append('id', this.rest.temp.id);
    body.append('tennhom', this.tennhom);
    body.append('session', this.rest.session);
    body.append('type', 'nhomtin');
    body.append('action', 'themnhomtin');
    body.append('version', this.rest.version.toString());

    let dulieu = this.laydulieu()
    let chuyendoi = {'vaccine': 0, 'usg': 1, 'spa': 2, 'treat': 3}
    for (const key in dulieu) {
      if (Object.prototype.hasOwnProperty.call(dulieu, key)) {
        dulieu[key].forEach((id: any) => {
          body.append('dulieu['+ chuyendoi[key] +'][]', id);
        })
      }
    }

    this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
      this.rest.defreeze()
      if (resp.nogin) {
        this.rest.notify("Phiên đăng nhập hết hạn")
        this.rest.logout()
      }
      else {
        if (resp.messenger && resp.messenger.length) this.rest.notify(resp.messenger)
        this.rest.nhomtin.danhsach = resp.danhsach
        this.rest.back()
      }
    }, (error) => {
      this.rest.defreeze()
    })
  }
}
