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
      this.rest.action = 'physical'
      if (!this.rest.physical.init) {
        this.init()
      }
    })
  }

  public async init() {
    await this.rest.freeze('Đang lấy danh sách...')
    this.rest.checkpost('physical', 'init', {
      key: this.rest.physical.key,
      page: this.rest.physical.page,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.list = resp.list
      this.rest.physical.import = resp.import
      this.rest.physical.serial = resp.serial
      this.rest.physical.sampletype = resp.type
      this.rest.physical.species = resp.species
      this.rest.physical.target = resp.target
      this.rest.physical.init = true
    }, () => {
      this.rest.defreeze()
    })
  }

  public info(index: number) {
    this.rest.temp = this.rest.physical.target[index]
    this.rest.router.navigateByUrl('/physical/detail')
  }

  public updateTarget(index: number) {
    this.rest.temp = this.rest.physical.target[index]
    this.rest.temp.act = 'target'
    this.rest.temp.module = this.rest.action
    this.rest.temp.key = this.rest.physical.key2
    this.rest.router.navigateByUrl('/physical/insert')
  }

  public import() {
    this.rest.temp = { name: 0, note: '' }
    this.rest.temp.act = 'import'
    this.rest.router.navigateByUrl('/physical/insert')
  }

  public async insertTarget() {
    if (this.rest.config.physical < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp = {
        act: 'target',
        module: this.rest.action,
        key: this.rest.physical.key2,
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
      this.rest.router.navigateByUrl('physical/insert')
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
    await this.rest.freeze('Đang xóa chỉ tiêu...')
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

  public async updateSubmit(index: number) {
    await this.rest.freeze('Cập nhật...')
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
    await this.rest.freeze('Cài lại...')
    this.rest.checkpost('target', 'res', {
      id: this.rest.physical.target[index].id,
      key: this.rest.physical.key
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.target[index].number = 0
    }, () => {
      this.rest.defreeze()
    })
  }

  public async print(id: number) {
    await this.rest.freeze('Đang tải bản in...')
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

  public search() {
    this.rest.checkpost('target', 'search', {
      key: this.rest.physical.key
    }).then((resp) => {
      this.rest.physical.target = resp.list
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
    await this.rest.freeze('Đang xóa...')
    this.rest.checkpost('physical', 'remove', {
      id: id,
      key: this.rest.physical.key,
      page: this.rest.physical.page,
      module: this.rest.action
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.page = 1
      this.rest.physical.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
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
      species: (this.rest.physical.species.length ? this.rest.physical.species[0].id : '0'),
      serial: this.rest.physical.serial,
      sampletype: (this.rest.physical.sampletype.length ? this.rest.physical.sampletype[0].id : '0'),
      samplenumber: this.rest.physical.serial,
      samplesymbol: this.rest.physical.serial,
      samplestatus: '1',
      symptom: '',
      target: this.temptarget(),
    }
    this.rest.navCtrl.navigateForward('physical/insert')
  }

  public temptarget() {
    let target = {}
    this.rest.physical.target.forEach(item => {
      target[item.id] = ''
    })
    return target
  }

  public async detail(id: number) {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.checkpost('physical', 'printword', {
      // action: 'physical-get',
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.id = id
      // this.rest.physical.data = resp.data
      this.rest.physical.print = resp.html
      this.rest.router.navigateByUrl('physical/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async loadData(event: any) {
    this.rest.physical.page++
    await this.rest.freeze('Đang lấy danh sách...')
    this.getData().then(() => {
      event.target.complete()
    })
  }

  public async filter() {
    this.rest.physical.page = 1
    this.rest.physical.list = []
    await this.rest.freeze('Đang lấy danh sách...')
    this.getData()
  }

  public async getData() {
    return new Promise(resolve => {
      this.rest.checkpost('physical', 'auto', {
        key: this.rest.physical.key,
        page: this.rest.physical.page,
        module: this.rest.action
      }).then(resp => {
        this.rest.defreeze()
        let temp = this.rest.physical.list.concat(resp.list)
        this.rest.physical.list = temp
        this.rest.physical.init = true
        resolve(true)
      }, () => {
        this.rest.defreeze()
        resolve(true)
      })
    })
  }
}
