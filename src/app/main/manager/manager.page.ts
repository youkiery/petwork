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
  public name = ''
  public input: any = {}
  public list = []
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
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

  public async toggleDefault(id: number, value: string) {
    await this.rest.freeze('Đang cập nhật dữ liệu...')
    this.rest.checkpost('spa', 'toggletype', {
      id: id,
      value: value,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
      this.rest.home.default.spa = resp.default
    }, () => {
      this.rest.defreeze()
    })
  }

  public async upspa(id: number, id2: number) {
    await this.rest.freeze('Đang cập nhật dữ liệu...')
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
    await this.rest.freeze('Đang cập nhật dữ liệu...')
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
    await this.rest.freeze('Đang thêm dữ liệu...')
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
    await this.rest.freeze('Đang thêm dữ liệu...')
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
    await this.rest.freeze('Đang xóa dữ liệu...')
    this.rest.checkpost('spa', 'removetype', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.home.spa = resp.list
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
    await this.rest.freeze('Đang xóa loại nhắc...')
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
    await this.rest.freeze('Cập nhật loại nhắc...')
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
    await this.rest.freeze('Thêm loại nhắc...')
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
    await this.rest.freeze('Đang xóa loại nhắc...')
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
    await this.rest.freeze('Cập nhật bác sĩ...')
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
    await this.rest.freeze('Thêm bác sĩ...')
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
    await this.rest.freeze('Đang tìm kiếm...')
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

  
  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    if (!fileList[0]) this.rest.notify('Chưa chọn file excel')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      body.append('file', fileList[0]);
      body.append('session', this.rest.session);
      body.append('type', 'vaccine');
      body.append('action', 'excel');
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
          this.rest.notify(resp.messenger)
        }
      }, (error) => {
        this.rest.defreeze()
      })
    }
  }

  public file() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    if (fileList.length) this.name = fileList[0].name
    else this.name = 'Chưa chọn file'
  }

  public async reloadType(event: any) {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('vaccine', 'typeauto', {}).then(resp => {
      this.rest.defreeze()
      this.rest.home.type = resp.list
      event.target.complete();
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reloadDoctor(event: any) {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('vaccine', 'doctorauto', {}).then(resp => {
      this.rest.defreeze()
      this.rest.home.doctor = resp.list
      event.target.complete();
    }, () => {
      this.rest.defreeze()
    })
  }
}
