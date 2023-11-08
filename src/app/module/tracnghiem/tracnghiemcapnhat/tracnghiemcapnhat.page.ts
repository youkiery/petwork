import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemcapnhat',
  templateUrl: './tracnghiemcapnhat.page.html',
  styleUrls: ['./tracnghiemcapnhat.page.scss'],
})
export class TracnghiemcapnhatPage implements OnInit {
  public name = 'Chưa chọn file Excel'
  @ViewChild('pwaphoto') pwaphoto: ElementRef;

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public themcauhoi() {
    this.rest.temp.cauhoi.push({
      id: 0,
      noidung: "",
      danhsach: [
        { id: 0, noidung: "", dapan: 1 },
        { id: 0, noidung: "", dapan: 0 },
        { id: 0, noidung: "", dapan: 0 },
        { id: 0, noidung: "", dapan: 0 },
      ]
    })
  }

  public xoacauhoi(thutu: number) {
    this.rest.temp.cauhoi = this.rest.temp.cauhoi.filter((cauhoi, index) => {
      return thutu !== index
    })
    if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public async capnhatchuyenmuc() {
    if (this.rest.temp.socau < 1 && this.rest.temp.thoigian < 1) return this.rest.notify("Số câu và thời gian làm bài > 0 phút")
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('tracnghiem', 'capnhatchuyenmuc', {
      dulieu: this.rest.temp
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public chonfile() {
    this.pwaphoto.nativeElement.click();
  }

  public async thaydoifile() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files
    if (!fileList[0]) return this.rest.notify('Chưa chọn file excel')
    let body = new FormData();
    await this.rest.freeze('Đang tải dữ liệu...')
    body.append('file', fileList[0]);
    body.append('session', this.rest.session);
    body.append('type', 'tracnghiem');
    body.append('action', 'tailendanhsach');
    body.append('version', this.rest.version.toString());

    this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
      this.rest.defreeze()
      if (resp.nogin) {
        this.rest.notify("Phiên đăng nhập hết hạn")
        this.rest.logout()
      }
      else {
        resp.cauhoi.forEach(cauhoi => {
          this.rest.temp.cauhoi.push(cauhoi)
        });
        this.rest.notify(resp.messenger)
      }
    }, (error) => {
      this.rest.defreeze()
    })
  }

  public taifilemau() {
    window.open(this.rest.include + "/file-mau-import-cau-hoi-trac-nghiem.xlsx")
  }
}
