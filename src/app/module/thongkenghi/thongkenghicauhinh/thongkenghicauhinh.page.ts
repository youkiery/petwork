import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-thongkenghicauhinh',
  templateUrl: './thongkenghicauhinh.page.html',
  styleUrls: ['./thongkenghicauhinh.page.scss'],
})
export class ThongkenghicauhinhPage implements OnInit {
  public name = 'Chưa chọn file'
  public cauhinh = []
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/thongkenghi')
    else this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitaocauhinh', {
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'khoitaocauhinh', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public themcatruc() {
    this.cauhinh.push({
      id: 0,
      giovao: "",
      giora: "",
    })
  }
  
  public async luucatruc() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('thongkenghi', 'luucatruc', {
      cauhinh: this.cauhinh
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoaca(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xoá ca trực',
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhanxoaca(id)
        }
        }
      ]
    });
    await alert.present();
  }

  public async xacnhanxoaca(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.cauhinh = this.cauhinh.filter(dulieu => {
      return dulieu.id !== id
    })

    this.rest.checkpost('thongkenghi', 'xoacatruc', {
      id: id,
      cauhinh: this.cauhinh
    }).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
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
