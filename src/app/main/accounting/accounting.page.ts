import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage {
  public prv = ''
  public name = 'Chưa chọn file Excel Kiot'
  public name2 = 'Chưa chọn file Excel ngân hàng'
  public list = []
  public init = false
  public kiotinput: any[] = [{
    file: 0,
    name: ''
  }]
  public bankinput: any = 0
  public current = 0
  public ibank = [
    '/assets/icon/gbank.png',
    '/assets/icon/bank.png'
  ]
  public ikiot = [
    '/assets/icon/gkiot.png',
    '/assets/icon/kiot.png'
  ]
  @ViewChild('kiot') kiot: ElementRef;
  @ViewChild('bank') bank: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    this.rest.action = 'accounting'
    this.rest.ready().then(() => {
      if (!this.rest.accounting.datetime.length) this.rest.accounting.datetime =  this.time.datetoisodate(this.rest.home.today)
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
      this.kiotinput = resp.input
    }, () => {
      this.rest.defreeze()
    })
  }

  public async selectbank() {
    this.bank.nativeElement.click()
  }

  public async selectkiot(index:number) {
    this.current = index
    this.kiot.nativeElement.click()
  }

  public async insertbranch() {
    this.kiotinput.push({
      name: '',
      file: 0
    })
  }

  public async removebranch(i: number) {
    let temp = this.kiotinput.filter((item, index) => {
      return index !== i
    })
    this.kiotinput = temp
  }

  public kiotchange() {
    let file = this.kiot
    const filelist: FileList = file.nativeElement.files
    if (filelist.length) this.kiotinput[this.current].file = filelist[0]
    else this.kiotinput[this.current].file = 0
    this.kiot.nativeElement.value = ''
  }

  public bankchange() {
    let file = this.bank
    const filelist: FileList = file.nativeElement.files
    if (filelist.length) this.bankinput = filelist[0]
    else this.bankinput[this.current] = 0
    this.bank.nativeElement.value = ''
  }

  public async savenote() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'note', {
      id: this.rest.accounting.id,
      content: this.rest.accounting.checkout,
      time: this.rest.accounting.datetime
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.accounting.init = false
      this.rest.notify('Đã lưu')
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

  public old() {
    this.rest.navCtrl.navigateForward('/accounting/old')
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
    let filecheck = 0
    let namecheck = 0
    
    this.kiotinput.forEach((input, index) => {
      if (!input.file) filecheck = index + 1
      if (!input.name.length) namecheck = index + 1
    })
    if (this.kiotinput.length == 1) namecheck = 0
    if (filecheck) this.rest.notify('Chưa chọn file excel chi nhánh số '+ filecheck)
    else if (namecheck) this.rest.notify('Chưa nhập mã chi nhánh chi nhánh số '+ namecheck)
    else if (!this.bankinput) this.rest.notify('Chưa chọn file excel Ngân hàng')
    else {
      let body = new FormData();
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('bank', this.bankinput);
      this.kiotinput.forEach((input, index) => {
        body.append('kiot['+index+']', input.file);
        body.append('input['+index+']', input.name);
      })
      body.append('session', this.rest.session);
      body.append('type', 'checkout');
      body.append('action', 'excel');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.accounting.datetime);
      body.append('kiot[money]', this.rest.accounting.kiot.money);
      body.append('kiot[content]', this.rest.accounting.kiot.content);
      body.append('kiot[time]', this.rest.accounting.kiot.time);
      body.append('vietcom[money]', this.rest.accounting.vietcom.money);
      body.append('vietcom[content]', this.rest.accounting.vietcom.content);
      body.append('vietcom[time]', this.rest.accounting.vietcom.time);

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          this.rest.accounting.id = resp.id
          this.rest.accounting.checkout = resp.data
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }

}
