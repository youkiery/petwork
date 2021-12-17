import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  public prv = ''
  public name = 'Chưa chọn file Excel'
  public name2 = 'Chưa chọn file Excel ngân hàng'
  public input: any = {}
  public list = []
  public data = {
    on: 0,
    total: 0,
    vaccine: 0,
    insert: 0,
    error: []
  }
  public total = {
    kiot: '0', vietcom: '0'
  }
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
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('user')   
  }

  public async refreshSpa(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'spa', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.home.spa = resp.list
    }, () => {
      this.rest.defreeze()
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

  public updateDoctor(index: number) {
    this.prv = 'doctor'
    this.rest.action = 'insert-doctor'
    this.input = {
      id: this.rest.home.doctor[index].id,
      userid: this.rest.home.doctor[index].userid,
      username: this.rest.home.doctor[index].username,
      name: this.rest.home.doctor[index].name
    }
  }

  public async insertDoctor() {
    this.prv = 'doctor'
    this.rest.action = 'insert-doctor'
    this.input = {
      userid: 0,
      username: '',
      name: ''
    }
  }

  public async removeDoctorSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'removedoctor', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.doctor = resp.list
      this.rest.action = 'doctor'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateDoctorSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'updatedoctor', {
      id: this.input.id,
      user: this.input.userid,
      name: this.input.name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.doctor = resp.list
      this.rest.action = 'doctor'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertDoctorSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'insertdoctor', {
      user: this.input.userid,
      name: this.input.name
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.doctor = resp.list
      this.rest.action = 'doctor'
    }, () => {
      this.rest.defreeze()
    })
  }

  public async searchDoctor() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'searchdoctor', {
      keyword: this.input.username
    }).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
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

  public async reloadType(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('vaccine', 'typeauto', {}).then(resp => {
      this.rest.defreeze()
      this.rest.home.type = resp.list
      event.target.complete();
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reloadDoctor(event: any) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('vaccine', 'doctorauto', {}).then(resp => {
      this.rest.defreeze()
      this.rest.home.doctor = resp.list
      event.target.complete();
    }, () => {
      this.rest.defreeze()
    })
  }
}
