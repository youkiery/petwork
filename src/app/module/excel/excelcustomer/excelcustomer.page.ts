import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelcustomer',
  templateUrl: './excelcustomer.page.html',
  styleUrls: ['./excelcustomer.page.scss'],
})
export class ExcelcustomerPage {
  public prv = ''
  public name = 'Chưa chọn file Excel'
  public name2 = 'Chưa chọn file Excel ngân hàng'
  public code = ''
  public input: any = {}
  public list = []
  public segment = '0'
  public recycle = {
    option: {
      vaccine: true,
      usg: true
    },
    doctor: {}
  }
  public kiot = {
    content: 'G2',
    time: 'B2',
    money: 'H2',
  }
  public vietcom = {
    money: 'D14',
    content: 'F14',
    time: 'B14',
  }
  public data = {
    on: 0,
    total: 0,
    vaccine: 0,
    insert: 0,
    error: []
  }
  public cell = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13", "H14", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12", "I13", "I14", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12", "K13", "K14", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14"]
  public total = {
    kiot: '0', vietcom: '0'
  }
  public date = ''
  public checkout = {
    on: 0,
    kiot: [], vietcom: [], pair: []
  }
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else if (!this.rest.excel.init) this.manageInit()
  }

  public async manageInit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'customercell', {}).then(resp => {
      this.rest.defreeze()
      this.rest.excel.config = resp.data
      this.rest.excel.init = true
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'customersave', this.rest.excel.config).then((resp) => {
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public file() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files

    if (fileList.length) this.name = fileList[0].name
    else this.name = 'Chưa chọn file'
  }

  public async uploadcustomer() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'admin');
      body.append('action', 'customer');
      body.append('name', this.rest.excel.config.name);
      body.append('phone', this.rest.excel.config.phone);
      body.append('address', this.rest.excel.config.address);
      body.append('version', this.rest.version.toString());

      this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
        this.rest.defreeze()
        if (resp.nogin) {
          this.rest.notify("Phiên đăng nhập hết hạn")
          this.rest.logout()
        }
        else {
          this.data = resp.data
          if (resp.messenger.length) this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }
}
