import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemfile',
  templateUrl: './itemfile.page.html',
  styleUrls: ['./itemfile.page.scss'],
})
export class ItemfilePage implements OnInit {
  public name = 'Chưa chọn file Excel'
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hanghoa')
  }
  
  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public file() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) this.name = fileList[0].name
    else this.name = 'Chưa chọn file Excel'
  }

  public async uploadfile() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'item');
      body.append('action', 'filer');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
}
