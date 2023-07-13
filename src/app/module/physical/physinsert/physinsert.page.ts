import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-physinsert',
  templateUrl: './physinsert.page.html',
  styleUrls: ['./physinsert.page.scss'],
})
export class PhysinsertPage {
  public header = {
    'sampletype': 'Nhập tên Loại mẫu',
    'species': 'Nhập tên Loại thú cưng'
  }
  public serial = 0
  public count = 0
  public max = 2048
  @ViewChild('pwaphoto') pwaphoto: ElementRef
  constructor(
    public rest: RestService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }


  public change() {
    let temp = this.rest.temp.name.replace(/,/g, '')
    this.rest.temp.name = this.rest.comma(temp)
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/physical')
    else if (!this.rest.physical.sampletype.length) this.init()
  }

  public async init() {
    this.rest.checkpost('physical', 'initsample', {}).then(resp => {
      this.rest.defreeze()
      this.rest.physical.sampletype = resp.sample
      this.rest.physical.target = resp.target
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertImport() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'import', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.segment = '3'
      this.rest.physical.import = resp.import
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateTarget() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'updateinfo', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.segment = '2'
      this.rest.physical.target = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertTarget() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('target', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.segment = '2'
      this.rest.physical.target = resp.list
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async insert() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('physical', 'insert', this.rest.temp).then(resp => {
      this.rest.defreeze()
      if (!this.rest.temp.his) {
        this.rest.physical.segment = '1'
        this.rest.physical.s = '2'
        this.rest.physical.need = resp.need
        this.rest.physical.list = resp.list
      }
      this.rest.physical.serial = resp.serial
      this.rest.his.init = false
      this.rest.badge.init = false
      this.rest.back()
    }, () => { 
      this.rest.defreeze()
    })
  }

  public async updatephysical() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('physical', 'updatephysical', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.physical.segment = '1'
      this.rest.physical.s = '2'
      this.rest.physical.list = resp.list
      this.rest.his.init = false
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
    await this.rest.freeze('Đang tải dữ liệu...')
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

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public async remove(index: number) {
    let alert = await this.alert.create({
      message: 'Xóa hình ảnh?',
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

  public removeSubmit(i: number) {
    this.rest.temp.image = this.rest.temp.image.filter((item: any, index: number) => {
      return index !== i
    })
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      await this.rest.freeze('Đang tải dữ liệu...')
      for (let i = 0; i < fileList.length; i++) {
        await this.firstFileToBase64(fileList[i]).then((result: string) => {
          let image = new Image();
          image.src = result
          image.onload = () => {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let rate = 1
            if (image.width > this.max || image.height > this.max) {
              if (image.width > image.height) rate = image.width / this.max
              else rate = image.height / this.max
            }
            let newWidth = image.width / rate
            let newHeight = image.height / rate
            canvas.width = newWidth
            canvas.height = newHeight
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
            this.rest.temp.image.push(canvas.toDataURL('image/jpeg'));
          }
        }, (err: any) => { });
      }
      this.rest.defreeze()
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  public async uploadAllImage() {
    return new Promise((resolve) => {
      let count = this.rest.temp.image.length
      if (count == 0) resolve(true)
      this.rest.temp.image.forEach((item, index) => {
        if (item.length < 200) {
          count --
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item).then((url) => {
            this.rest.temp.image[index] = url
            count --
            if (count == 0) resolve(true)
          })
        }
      });
    })
  }

  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
      let fileRef = this.storage.ref(path);
      let base64 = image.substr(image.indexOf(',') + 1);
      let metadata = {
        contentType: 'image/jpeg',
      };

      fileRef.putString(base64, 'base64', metadata).then((response) => {
        fileRef.getDownloadURL().subscribe(url => {
          resolve(url)
        })
      }, (error) => {
        resolve('')
      })
    })
  }
}
