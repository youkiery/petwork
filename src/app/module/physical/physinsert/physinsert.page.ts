import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-physinsert',
  templateUrl: './physinsert.page.html',
  styleUrls: ['./physinsert.page.scss'],
})
export class PhysinsertPage implements OnInit {
  public header = {
    'sampletype': 'Nhập tên Loại mẫu',
    'species': 'Nhập tên Loại thú cưng'
  }
  public serial = 0
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  public change() {
    let temp = this.rest.temp.name.replace(/,/g, '')
    this.rest.temp.name = this.rest.comma(temp)
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('physical')
  }

  public async insertImport() {
    await this.rest.freeze('Đang cập nhật...')
    this.rest.checkpost('physical', 'import', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.import = resp.import
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateTarget() {
    await this.rest.freeze('Đang cập nhật...')
    this.rest.checkpost('target', 'updateinfo', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.target = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertTarget() {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('target', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.target = resp.list
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async insert() {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('physical', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.page = 1
      this.rest.physical.serial = resp.serial
      let temp = [resp.data]
      temp = temp.concat(this.rest.physical.list)
      this.rest.physical.list = temp
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async updatephysical() {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('physical', 'updatephysical', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.list = resp.list
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async insertSelect(type: string = 'sampletype') {
    let alert = await this.alert.create({
      header: this.header[type],
      inputs: [
        {
          name: 'type',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: (e) => {
            this.insertSelectSubmit(type, e.type)
          }
        }
      ]
    })
    await alert.present()
  }

  public async insertSelectSubmit(type: string, typevalue: string) {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('physical', 'insertselect', {
      typename: type,
      typevalue: typevalue,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical[type] = resp.list
      this.rest.temp[type] = this.rest.physical[type][this.rest.physical[type].length - 1].id
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('/modal/suggest')
  }
}
