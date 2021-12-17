import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public segment = '1'
  constructor(
    public rest: RestService,
    public time: TimeService,
    public modal: ModalController,
    public alert: AlertController,
    public platform: Platform
  ) { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'profile'
      if (!this.rest.profile.init) {
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'init', {
      key: this.rest.profile.key,
      page: this.rest.profile.page,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.list = resp.list
      this.rest.profile.serial = resp.serial
      this.rest.profile.sampletype = resp.type
      this.rest.profile.species = resp.species
      this.rest.profile.target = resp.target
      this.rest.profile.init = true
    }, () => {
      this.rest.defreeze()
    })
  }

  public info(index: number) {
    this.rest.temp = this.rest.profile.target[index]
    this.rest.router.navigateByUrl('/profile/detail')
  }

  public updateTarget(index: number) {
    this.rest.temp = this.rest.profile.target[index]
    this.rest.temp.act = 'target'
    this.rest.temp.module = this.rest.action
    this.rest.temp.key = this.rest.profile.key2
    this.rest.router.navigateByUrl('/profile/insert')
  }

  public async insertTarget() {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp = {
        act: 'target',
        module: this.rest.action,
        key: this.rest.profile.key2,
        id: 0,
        name: '',
        intro: '',
        unit: '',
        flag: '0 - 1',
        up: '',
        down: '',
        disease: '',
        aim: ''
      }
      this.rest.router.navigateByUrl('profile/insert')
    }
  }

  public async removeTarget(i: number) {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
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
      id: this.rest.profile.target[i].id,
      key: this.rest.profile.key2
    }).then(resp => {
      this.rest.defreeze()
      this.rest.notify('Đã xóa chỉ tiêu')
      this.rest.profile.target = resp.list
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

  public async updateSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'update', {
      id: this.rest.profile.target[index].id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.target[index].number = Number(this.rest.profile.target[index].number) + 1
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
      id: this.rest.profile.target[index].id,
      key: this.rest.profile.key
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.target[index].number = 0
    }, () => {
      this.rest.defreeze()
    })
  }

  public async print(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'printword', {
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

  public search() {
    this.rest.checkpost('target', 'search', {
      key: this.rest.profile.key
    }).then((resp) => {
      this.rest.profile.target = resp.list
    }, () => { })
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
    this.rest.checkpost('profile', 'remove', {
      id: id,
      key: this.rest.profile.key,
      page: this.rest.profile.page,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.page = 1
      this.rest.profile.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insert() {
    this.rest.temp = {
      act: 'profile',
      name: '',
      phone: '',
      address: '',
      petname: '',
      weight: '',
      age: '1',
      gender: '0',
      species: (this.rest.profile.species.length ? this.rest.profile.species[0].id : '0'),
      serial: this.rest.profile.serial,
      sampletype: (this.rest.profile.sampletype.length ? this.rest.profile.sampletype[0].id : '0'),
      samplenumber: this.rest.profile.serial,
      samplesymbol: this.rest.profile.serial,
      samplestatus: '1',
      symptom: '',
      target: this.temptarget(),
    }
    this.rest.navCtrl.navigateForward('profile/insert')
  }

  public async updateProfile(i: number) {
    let item = this.rest.profile.list[i]
    this.rest.temp = {
      act: 'profile',
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
      key: this.rest.profile.key,
      page: this.rest.profile.page,
      module: this.rest.action
    }
    this.rest.navCtrl.navigateForward('profile/insert')
  }

  public temptarget() {
    let target = {}
    this.rest.profile.target.forEach(item => {
      target[item.id] = ''
    })
    return target
  }

  public async detail(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'printword', {
      // action: 'profile-get',
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.id = id
      // this.rest.profile.data = resp.data
      this.rest.profile.print = resp.html
      this.rest.router.navigateByUrl('profile/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async loadData(event: any) {
    this.rest.profile.page++
    await this.rest.freeze('Đang tải dữ liệu...')
    this.getData().then(() => {
      event.target.complete()
    })
  }

  public async filter() {
    this.rest.profile.page = 1
    this.rest.profile.list = []
    await this.rest.freeze('Đang tải dữ liệu...')
    this.getData()
  }

  public async getData() {
    return new Promise(resolve => {
      this.rest.checkpost('profile', 'auto', {
        key: this.rest.profile.key,
        page: this.rest.profile.page,
        module: this.rest.action
      }).then(resp => {
        this.rest.defreeze()
        let temp = this.rest.profile.list.concat(resp.list)
        this.rest.profile.list = temp
        this.rest.profile.init = true
        resolve(true)
      }, () => {
        this.rest.defreeze()
        resolve(true)
      })
    })
  }
}
