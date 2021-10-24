import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  public prv = ''
  public input: any = {}
  public list = []
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card',
    2: 'stl-card yellow',
  }
  public name = 'Chưa chọn file'
  public toggle = false
  public selected = {}
  public segment = "0"
  public option = []
  public option2 = []
  public page = 1
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public time: TimeService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    if (!this.rest.action) this.rest.root()
    if (this.rest.temp && this.rest.temp.prv && this.rest.temp.prv.length) this.rest.action = this.rest.temp.prv
    this.rest.home.doctor.forEach((item, index) => {
      this.option.push({
        name: 'userid',
        type: 'radio',
        label: item.name,
        value: item.userid,
        checked: (this.rest.home.userid == item.userid ? true : false)
      })
    });
  }

  public async docs() {
    let option = []
    this.rest.home.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.vaccine.docs.indexOf(item.userid) >= 0 ? true : false)
      })
    })
    const alert = await this.alert.create({
      header: 'Lọc nhân viên',
      inputs: option,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (e) => {
            let cover = []
            let docs = []
            e.forEach((index: number) => {
              cover.push(this.rest.home.doctor[index].name)
              docs.push(this.rest.home.doctor[index].userid)
            });
            
            this.rest.vaccine.docs = docs
            this.rest.vaccine.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public moreTemp(event: any) {
    this.page ++
    event.target.complete()
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('vaccine', 'tempauto', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs
    }).then(resp => {
      this.rest.defreeze()
      this.page = 1
      this.selected = {}
      this.toggle = false
      this.rest.vaccine.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public selectbox(id: number) {
    if (this.toggle) {
      this.selected[id] = !this.selected[id]
    }
  }

  public getselectedid() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        list.push(this.rest.vaccine.temp[this.segment][key].id)
      }
    }
    return list
  }

  public getselectedindex() {
    let list = []
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        list.push(key)
      }
    }
    return list
  }

  public async transferAll() {
    let list = this.getselectedid()
    if (!list.length) this.rest.notify('Chưa chọn danh sách')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận chuyển phiếu nhắc',
        subHeader: 'Tất cả phiếu nhắc được chọn sẽ được chuyển cho nhân viên dưới đây: ',
        inputs: this.option,
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (uid) => {
              if (!uid) this.rest.notify('Chưa chọn danh sách')
              else this.transferAllSubmit(list, uid)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async transferAllSubmit(list: any, uid: number) {
    await this.rest.freeze('Đang xóa loại nhắc...')
    this.rest.checkpost('vaccine', 'transfer', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
      list: list,
      uid: uid
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.rest.vaccine.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeAll() {
    let list = this.getselectedid()
    if (!list.length) this.rest.notify('Chưa chọn danh sách')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận xóa lịch nhắc',
        subHeader: 'Sau khi xác nhận lịch nhắc sẽ biến mất',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.removeAllSubmit(list)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async removeAllSubmit(list: any) {
    await this.rest.freeze('Đang xóa loại nhắc...')
    this.rest.checkpost('vaccine', 'removeall', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
      list: list,
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.rest.vaccine.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doneAll() {
    let list = []
    let index = this.getselectedindex()
    index.forEach(item => {
      let citem = this.rest.vaccine.temp[this.segment][item]
      if (!(!citem.name.length || !citem.phone.length || !this.time.isisodate(this.time.datetoisodate(citem.cometime)) || !this.time.isisodate(this.time.datetoisodate(citem.calltime)))) {
        list.push(citem.id)
      }
    });
    if (!list.length) this.rest.notify('Phiếu nhập thông tin lỗi')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận tất cả phiếu nhắc?',
        subHeader: 'Sau khi xác nhận, danh sách sẽ được chuyển vào lịch nhắc',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.doneAllSubmit(list)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async doneAllSubmit(list: any) {
    await this.rest.freeze('Đang xác nhận...')
    this.rest.checkpost('vaccine', 'doneall', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
      list: list
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.temp = resp.list
      this.selected = {}

      if (resp.old.length) {
        this.rest.temp.ov = {}
        this.rest.temp.list = resp.old
        this.rest.action = 'vaccine'
        this.rest.temp.prv = 'temp'
        this.rest.navCtrl.navigateForward('/vaccine/recall')
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    this.rest.action = 'vaccine'
    let item = JSON.parse(JSON.stringify(this.rest.vaccine.temp[this.segment][index])) 
    if (!item.calltime) item.calltime = this.time.timetoisodate(this.time.datetotime(item.cometime) + 60 * 60 * 24 * 21 * 1000)
    else item.calltime = this.time.datetoisodate(item.calltime)
    item.cometime = this.time.datetoisodate(item.cometime)
    this.rest.temp = {
      prv: 'temp',
      docs: this.rest.vaccine.docs,
      time: this.rest.vaccine.time,
      id: item.id,
      petname: item.petname,
      name: item.name,
      phone: item.phone,
      address: item.address,
      typeid: item.typeid,
      cometime: item.cometime,
      calltime: item.calltime,
      note: item.note,
    }

    this.rest.router.navigateByUrl('/modal/insert')
  }

  public updateType(index: number) {
    this.prv = 'type'
    this.rest.action = 'insert-type'
    this.input = {
      id: this.rest.vaccine.type[index].id,
      name: this.rest.vaccine.type[index].name,
      code: this.rest.vaccine.type[index].code
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
      this.rest.vaccine.type = resp.list
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
      this.rest.vaccine.type = resp.list
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
      this.rest.vaccine.type = resp.list
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

      this.rest.vaccine.docs.forEach((item: any) => {
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
          this.rest.vaccine.temp = resp.list
          this.change('temp')
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

  public async remove(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa lịch nhắc',
      subHeader: 'Sau khi xác nhận lịch nhắc sẽ biến mất',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(index)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'removetemp', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
      id: this.rest.vaccine.temp[this.segment][index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.temp = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let data = this.rest.vaccine.temp[this.segment][index]

    if (!data.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!data.phone.length) this.rest.notify('Chưa nhập số điện thoại')
    else if (!this.time.isisodate(this.time.datetoisodate(data.cometime))) this.rest.notify('Chưa nhập ngày đến')
    else if (!this.time.isisodate(this.time.datetoisodate(data.calltime))) this.rest.notify('Chưa nhập ngày nhắc lại')
    else {
      const alert = await this.alert.create({
        header: 'Xác nhận thêm lịch nhắc',
        subHeader: 'Sau khi xác nhận lịch nhắc sẽ hiển thị trên danh sách nhắc gọi',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.doneSubmit(data.id)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async doneSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine', 'confirm', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
      id: id,
      temp: 1
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.toggle = false
      this.rest.vaccine.temp = resp.temp
      if (resp.old.length) {
        this.rest.temp.list = resp.old
        this.rest.action = 'vaccine'
        this.rest.temp.prv = 'temp'
        this.rest.temp.ov = resp.ov
        this.rest.temp.ov = JSON.parse(JSON.stringify(this.rest.temp))
        this.rest.navCtrl.navigateForward('/vaccine/recall')
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(type: string = 'type') {
    this.rest.action = type
  }

  public back() {
    this.rest.action = this.prv
  }

  public async reloadTemp(event: any) {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('vaccine', 'tempauto', {
      time: this.rest.vaccine.time,
      docs: this.rest.vaccine.docs,
    }).then(resp => {
      this.rest.defreeze()
      this.selected = {}
      this.toggle = false
      this.rest.vaccine.temp = resp.list
      event.target.complete();
      this.page = 1
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reloadType(event: any) {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('vaccine', 'typeauto', {}).then(resp => {
      this.rest.defreeze()
      this.rest.vaccine.type = resp.list
      event.target.complete();
    }, () => {
      this.rest.defreeze()
    })
  }

  public cleardocs() {
    this.rest.vaccine.docs = []
    this.rest.vaccine.docscover = ''
    this.filter()
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
