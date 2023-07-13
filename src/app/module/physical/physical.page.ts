import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-physical',
  templateUrl: './physical.page.html',
  styleUrls: ['./physical.page.scss'],
})
export class PhysicalPage {
  constructor(
    public rest: RestService,
    public time: TimeService,
    public modal: ModalController,
    public alert: AlertController,
    public platform: Platform
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'physical'
      if (!this.rest.physical.init) {
        this.rest.physical.filter.start = this.time.timetoisodate(this.time.datetotime(this.rest.home.today) - 60 * 60 * 24 * 5 * 1000)
        this.rest.physical.filter.end = this.time.datetoisodate(this.rest.home.today)
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'init', {
      filter: this.rest.physical.filter,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.list = resp.list
      this.rest.physical.import = resp.import
      this.rest.physical.serial = resp.serial
      this.rest.physical.sampletype = resp.type
      this.rest.physical.species = resp.species
      this.rest.physical.need = resp.need
      this.rest.physical.target = resp.target
      this.rest.physical.init = true
    }, () => {
      this.rest.defreeze()
    })
  }

  public info(index: number) {
    this.rest.temp = this.rest.physical.target[index]
    this.rest.navCtrl.navigateForward('/physical/detail')
  }

  public updateTarget(index: number) {
    this.rest.temp = this.rest.physical.target[index]
    this.rest.temp.act = 'target'
    this.rest.temp.module = this.rest.action
    this.rest.temp.key = this.rest.physical.key2
    this.rest.navCtrl.navigateForward('/physical/insert')
  }

  public import() {
    this.rest.temp = { name: '0', note: '' }
    this.rest.temp.act = 'import'
    this.rest.navCtrl.navigateForward('/physical/insert')
  }

  public async insertTarget() {
    if (this.rest.config.physical < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp = {
        act: 'target',
        module: this.rest.action,
        key: this.rest.physical.key2,
        id: 0,
        doctor: this.rest.home.userid,
        name: '',
        intro: '',
        unit: '',
        flag: '0 - 1',
        up: '',
        down: '',
        disease: '',
        aim: ''
      }
      this.rest.navCtrl.navigateForward('/physical/insert')
    }
  }

  public async removeTarget(i: number) {
    if (this.rest.config.physical < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
        header: 'Xóa chỉ tiêu',
        message: 'Sau khi xác nhận, chỉ tiêu sẽ bị xóa',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'danger',
            handler: () => {
              this.removeTargetSubmit(i)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async removeTargetSubmit(i: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'remove', {
      id: this.rest.physical.target[i].id,
      key: this.rest.physical.key2
    }).then(resp => {
      this.rest.defreeze()
      this.rest.notify('Đã xóa chỉ tiêu')
      this.rest.physical.target = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update(index: number) {
    const alert = await this.alert.create({
      header: 'Tăng số chỉ tiêu',
      message: 'Sau khi xác nhận, chỉ tiêu sẽ tăng thêm',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.updateSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public statistic() {
    this.rest.navCtrl.navigateForward('/physical/statis')
  }

  public async updateSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'update', {
      id: this.rest.physical.target[index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.target[index].number = Number(this.rest.physical.target[index].number) + 1
    }, () => {
      this.rest.defreeze()
    })
  }

  public async reset(index: number) {
    const alert = await this.alert.create({
      header: 'Cài lại chỉ tiêu',
      message: 'Sau khi xác nhận, chỉ tiêu bằng 0',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.resetSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async resetSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'res', {
      id: this.rest.physical.target[index].id,
      filter: this.rest.physical.filter,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.target[index].number = 0
    }, () => {
      this.rest.defreeze()
    })
  }

  public async print(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      let html = resp.html
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(html);
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Hồ sơ sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'remove', {
      id: id,
      filter: this.rest.physical.filter,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async exam(i: number) {
    let item = this.rest.physical.need[i]
    this.rest.temp = {
      act: 'physical',
      xrayid: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      petname: item.petname,
      doctor: this.rest.home.userid,
      weight: item.weight,
      age: item.age,
      gender: item.gender,
      species: item.species,
      serial: this.rest.physical.serial,
      sampletype: (this.rest.physical.sampletype.length ? this.rest.physical.sampletype[0].id : '0'),
      samplenumber: 1,
      samplesymbol: this.rest.physical.serial,
      samplestatus: '1',
      symptom: '',
      target: this.temptarget(),
      filter: this.rest.physical.filter,
      image: []
    }
    
    this.rest.navCtrl.navigateForward('/physical/insert')
  }

  public async insert() {
    this.rest.temp = {
      act: 'physical',
      name: '',
      phone: '',
      address: '',
      petname: '',
      weight: '',
      age: '1',
      gender: '0',
      species: '',
      serial: this.rest.physical.serial,
      sampletype: (this.rest.physical.sampletype.length ? this.rest.physical.sampletype[0].id : '0'),
      samplenumber: 1,
      samplesymbol: this.rest.physical.serial,
      samplestatus: '1',
      symptom: '',
      doctor: this.rest.home.userid,
      target: this.temptarget(),
      filter: this.rest.physical.filter,
      image: []
    }
    this.rest.navCtrl.navigateForward('/physical/insert')
  }
  
  public async updatePhysical(i: number) {
    let item = this.rest.physical.list[i]
    this.rest.temp = {
      act: 'physical',
      id: item.id,
      name: item.customer,
      phone: item.phone,
      address: item.address,
      petname: item.name,
      weight: item.weight,
      age: item.age,
      gender: item.gender,
      species: item.species,
      serial: item.serial,
      sampletype: item.sampletype,
      samplenumber: item.samplenumber,
      samplesymbol: item.samplesymbol,
      samplestatus: item.samplestatus,
      symptom: item.symptom,
      target: item.target,
      filter: this.rest.physical.filter,
      module: this.rest.action,
      doctor: this.rest.physical.list[i].doctorid,
      image: item.image
    }
    this.rest.navCtrl.navigateForward('/physical/insert')
  }

  public temptarget() {
    let target = {}
    this.rest.physical.target.forEach(item => {
      target[item.id] = ''
    })
    return target
  }

  public async detail(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'printword', {
      // action: 'physical-get',
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.id = id
      // this.rest.physical.data = resp.data
      this.rest.physical.print = resp.html
      this.rest.navCtrl.navigateForward('/physical/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeneed(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa yêu cầu xét nghiệm',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeneedSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeneedSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'removeneed', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.need = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
