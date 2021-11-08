import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisinsert',
  templateUrl: './hisinsert.page.html',
  styleUrls: ['./hisinsert.page.scss'],
})
export class HisinsertPage implements OnInit {
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public list = []
  public init = false
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) {}

  ngOnInit() { }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
    else this.rest.ready().then(() => {
      if (!this.rest.temp.id && !this.init) {
        this.init = true
        this.suggest()
      }
    })
  }

  public suggest() {
    this.rest.temp.param = 0
    this.rest.navCtrl.navigateForward('modal/suggest')
  }

  public async save() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    this.rest.temp.from = this.rest.his.from
    this.rest.temp.end = this.rest.his.end
    this.rest.checkpost('his', 'insert', this.rest.temp).then((resp) => {
      this.rest.his.list = resp.list
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update() {
    await this.rest.freeze('Đang cập nhật dữ liệu')
    this.rest.checkpost('his', 'update', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.detail = resp.data[0]
      this.rest.his.list[this.rest.id] = resp.data[0]
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertDetail() {
    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('his', 'detail', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.detail = resp.data[0]
      this.rest.his.list[this.rest.id] = resp.data[0]
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertPet() {
    const alert = await this.alert.create({
      message: 'Thêm thú cưng',
      inputs: [{
        name: 'name',
        label: 'Tên thú cưng',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertPetSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }
  
  public async insertPetSubmit(name: string) {
    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('his', 'pet', {
      name: name,
      customer: this.rest.temp.name,
      phone: this.rest.temp.phone,
    }).then((resp) => {
      this.rest.temp.pet = resp.petid.toString()
      this.rest.temp.petlist = resp.petlist
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
