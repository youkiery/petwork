import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  public prv = ''
  public name = 'Chưa chọn file Excel Kiot'
  public name2 = 'Chưa chọn file Excel ngân hàng'
  public input: any = {}
  public list = []
  public init = false
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  @ViewChild('pwaphoto2') pwaphoto2: ElementRef;
  @ViewChild('pwaphoto3') pwaphoto3: ElementRef;
  @ViewChild('pwaphoto4') pwaphoto4: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.action = 'accounting'
    this.rest.ready().then(() => {
      if (!this.init) this.initiaze()
    })
  }

  public async initiaze() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'init', { }).then((resp) => {
      this.rest.defreeze()
      this.init = true
      this.rest.accounting.kiot = resp.data.kiot
      this.rest.accounting.vietcom = resp.data.vietcom
    }, () => {
      this.rest.defreeze()
    })
  }

  public select(type: string, name: string) {
    this.rest.temp = {
      type: type,
      name: name,
      value: this.rest.accounting[type][name]
    }
    this.rest.navCtrl.navigateForward('/accounting/select')
  }

  public upload(number: number) {
    switch (number) {
      case 1:
        this.pwaphoto.nativeElement.click();
        break;
      case 2:
        this.pwaphoto2.nativeElement.click();    
        break;
      case 3:
        this.pwaphoto3.nativeElement.click();
        break;
      case 4:
        this.pwaphoto4.nativeElement.click();
        break;
    }
  }

  public old() {
    this.rest.navCtrl.navigateForward('accounting/old')
  }

  public async save(type: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'save', {
      module: type,
      data: this.rest.accounting[type]
    }).then((resp) => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uploadCheckout() {
    const fileList: FileList = this.pwaphoto3.nativeElement.files;
    const fileList2: FileList = this.pwaphoto4.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else if (!fileList2[0]) this.rest.notify('Chưa chọn file excel Ngân hàng')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('file2', fileList2[0]);
      body.append('session', this.rest.session);
      body.append('type', 'checkout');
      body.append('action', 'excel');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);
      body.append('kiot[money]', this.rest.accounting.kiot.money);
      body.append('kiot[content]', this.rest.accounting.kiot.content);
      body.append('kiot[time]', this.rest.accounting.kiot.time);
      body.append('vietcom[money]', this.rest.accounting.vietcom.money);
      body.append('vietcom[content]', this.rest.accounting.vietcom.content);
      body.append('vietcom[time]', this.rest.accounting.vietcom.time);

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
          this.rest.accounting.total = resp.total
          this.rest.accounting.checkout = resp.data
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }

  public file(number: number) {
    let file = this.pwaphoto
    switch (number) {
      case 2:
        file = this.pwaphoto2
        break;
      case 3:
        file = this.pwaphoto3
        break;
      case 4:
        file = this.pwaphoto4
        break;
    }
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) {
      if (number < 4) this.name = fileList[0].name
      else this.name2 = fileList[0].name
    }
    else this.name = 'Chưa chọn file'
  }
}
