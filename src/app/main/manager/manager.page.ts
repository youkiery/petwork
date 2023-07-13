import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage {
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
  public cell = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13","C14","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","D14","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12","E13","E14","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14","H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13","H14","I1","I2","I3","I4","I5","I6","I7","I8","I9","I10","I11","I12","I13","I14","J1","J2","J3","J4","J5","J6","J7","J8","J9","J10","J11","J12","J13","J14","K1","K2","K3","K4","K5","K6","K7","K8","K9","K10","K11","K12","K13","K14","L1","L2","L3","L4","L5","L6","L7","L8","L9","L10","L11","L12","L13","L14"]
  public total = {
    kiot: '0', vietcom: '0'
  }
  public date = ''
  public checkout = {
    on: 0,
    kiot: [], vietcom: [], pair: []
  }
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  @ViewChild('pwaphoto2') pwaphoto2: ElementRef;
  @ViewChild('pwaphoto3') pwaphoto3: ElementRef;
  @ViewChild('pwaphoto4') pwaphoto4: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/user')   
    else if (this.rest.action == 'vaccine') this.manageInit()
    else {
      this.date = this.time.timetoisodate(new Date().getTime() - 60 * 60 * 24 * 365 * 1000)
    }
  }

  public async manageInit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'vaccine', {}).then(resp => {
      this.rest.defreeze()
      this.code = resp.code
    }, () => {
      this.rest.defreeze()
    })
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'savevaccine', {
      comma: this.code
    }).then(() => {
      this.rest.defreeze()
      this.rest.notify('Đã lưu')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async recycleVaccine() {
    let temp = this.parse()
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'recycle', temp).then(() => {
      this.rest.defreeze()
      this.rest.notify('Đã chuyển dữ liệu')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reduceVaccine() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'reduce', {
      date: this.time.isodatetotime(this.date) / 1000
    }).then(() => {
      this.rest.defreeze()
      this.rest.notify('Đã chuyển dữ liệu')
    }, () => {
      this.rest.defreeze()
    })
  }

  public parse() {
    let temp = {
      option: [],
      doctor: []
    }

    for (const key in this.recycle.option) {
      if (Object.prototype.hasOwnProperty.call(this.recycle.option, key)) {
        const element = this.recycle.option[key];
        if (element) temp.option.push(key)
      }
    }
    for (const key in this.recycle.doctor) {
      if (Object.prototype.hasOwnProperty.call(this.recycle.doctor, key)) {
        const element = this.recycle.doctor[key];
        if (element) temp.doctor.push(key)
      }
    }
    return temp
  }

  public async refreshSpa(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'spa', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async refreshType(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'type', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.home.type = resp.list
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async refreshUsg(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'usg', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.home.usgcode = resp.list
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }


  public async toggleDefault(id: number, alt: string) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'toggletype', {
      id: id,
      alt: alt,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async upspa(id: number, id2: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'uptype', {
      id: id,
      id2: id2,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async downspa(id: number, id2: number) {
    await this.rest.freeze('Đang tải dữ liệu')
    this.rest.checkpost('spa', 'downtype', {
      id: id,
      id2: id2,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertSpa() {
    let alert = await this.alert.create({
      message: 'Thêm dịch vụ Spa',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: ''}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertSpaSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async updateSpa(index: number) {
    let alert = await this.alert.create({
      message: 'Cập nhật dịch vụ Spa',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Tên dịch vụ', value: this.rest.home.spa[index].name}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updateSpaSubmit(this.rest.home.spa[index].id, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertSpaSubmit(name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'inserttype', {
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateSpaSubmit(id: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'updatetype', {
      id: id,
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeSpa(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa dịch vụ Spa',
      buttons: [
        { text: 'Trở về', role: 'cancel', },
        {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSpaSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSpaSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async insertUsg() {
    let alert = await this.alert.create({
      message: 'Thêm mã siêu âm',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Mã siêu âm', value: ''}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertUsgSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertUsgSubmit(name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'inserttype', {
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.usgcode = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateUsg(index: number) {
    let alert = await this.alert.create({
      message: 'Cập nhật mã siêu âm',
      inputs: [{ name: 'name', type: 'text', 'placeholder': 'Mã siêu âm', value: this.rest.home.usgcode[index].name}],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.updateUsgSubmit(this.rest.home.usgcode[index].id, e.name)
          }
        }
      ]
    });

    await alert.present();
  }

  public async updateUsgSubmit(id: number, name: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'updatetype', {
      id: id,
      name: name,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.usgcode = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeusg(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa mã siêu âm',
      buttons: [
        { text: 'Trở về', role: 'cancel', },
        {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeUsgSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeUsgSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.usgcode = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public updateType(index: number) {
    this.prv = 'type'
    this.rest.action = 'insert-type'
    this.input = {
      id: this.rest.home.type[index].id,
      name: this.rest.home.type[index].name,
      code: this.rest.home.type[index].code
    }
  }

  public async insertType() {
    this.prv = 'type'
    this.rest.action = 'insert-type'
    this.input = {
      id: 0,
      name: '',
      code: ''
    }
  }

  public async removeTypeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'remove', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.type = resp.list
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateTypeSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'updatetype', {
      id: this.input.id,
      code: this.input.code,
      name: this.input.name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.type = resp.list
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertTypeSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'inserttype', {
      code: this.input.code,
      name: this.input.name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.type = resp.list
      this.rest.action = 'type'
    }, () => {
      this.rest.defreeze()
    })
  }

  public select(userid: number, username: string, name: string) {
    this.input.userid = userid
    this.input.username = username
    this.input.name = name
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

  public async uploadVaccine() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'vaccine');
      body.append('action', 'excel');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);

      this.rest.home.default.docs.forEach((item: any) => {
        body.append('docs[]', item)
      })

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
          this.data = resp.data
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }

  public async uploadItem() {
    const fileList: FileList = this.pwaphoto2.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'item');
      body.append('action', 'excel');
      body.append('version', this.rest.version.toString());
      body.append('time', this.rest.vaccine.time);

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
          this.data = resp.data
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
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
      body.append('kiot[money]', this.kiot.money);
      body.append('kiot[content]', this.kiot.content);
      body.append('kiot[time]', this.kiot.time);
      body.append('vietcom[money]', this.vietcom.money);
      body.append('vietcom[content]', this.vietcom.content);
      body.append('vietcom[time]', this.vietcom.time);

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
          this.total = resp.total
          this.checkout = resp.data
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
