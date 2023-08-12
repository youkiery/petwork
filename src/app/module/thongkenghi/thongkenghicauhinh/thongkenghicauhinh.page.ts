import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-thongkenghicauhinh',
  templateUrl: './thongkenghicauhinh.page.html',
  styleUrls: ['./thongkenghicauhinh.page.scss'],
})
export class ThongkenghicauhinhPage implements OnInit {
  public name = 'Chưa chọn file'
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/thongkenghi')
  }

  public file() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files
    
    if (fileList.length) this.name = fileList[0].name
    else this.name = "Chưa chọn file"
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
      body.append('type', 'thongkenghi');
      body.append('action', 'tailen');
      body.append('version', this.rest.version.toString());

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
          this.rest.notify(resp.messenger)
          setTimeout(() => {
            this.rest.back()
          }, 1000);
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
}
