import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisinsert',
  templateUrl: './hisinsert.page.html',
  styleUrls: ['./hisinsert.page.scss'],
})
export class HisinsertPage implements OnInit {
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public list = []
  public init = false
  constructor(
    public rest: RestService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit() { }
  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('his')
    else this.rest.ready().then(() => {
      if (!this.rest.temp.temp && !this.rest.temp.id && !this.init) {
        this.init = true
        this.suggest()
      }
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('modal/pet')
  }

  public async checkConfirmSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.confirmSubmit()
    }
  }

  public async confirm() {
    this.count = 0
    await this.rest.freeze('Đang tải dữ liệu...')

    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.confirmSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkConfirmSubmit()
        })
      }
      else this.checkConfirmSubmit()
    });
  }

  public async confirmSubmit() {
    this.rest.checkpost('his', 'confirm', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.his.manager = resp.list
      this.rest.navCtrl.navigateBack('his/manager')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async checkinsertSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.insertSubmit()
    }
  }

  public async insert() {
    this.count = 0
    await this.rest.freeze('Đang tải dữ liệu...')

    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.insertSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkinsertSubmit()
        })
      }
      else this.checkinsertSubmit()
    });
  }

  public async insertSubmit() {
    this.rest.checkpost('his', 'insert', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
      this.rest.his.count = resp.count
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async checkupdateSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.updateSubmit()
    }
  }

  public async update() {
    this.count = 0
    await this.rest.freeze('Đang tải dữ liệu...')

    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.updateSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkupdateSubmit()
        })
      }
      else this.checkupdateSubmit()
    });
  }

  public async updateSubmit() {
    this.rest.checkpost('his', 'update', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.detail = resp.data[0]
      this.rest.his.list[this.rest.id] = resp.data[0]
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async checkInsertDetailSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.insertDetailSubmit()
    }
  }

  public async insertDetail() {
    this.count = 0
    await this.rest.freeze('Đang tải dữ liệu...')
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.insertDetailSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkInsertDetailSubmit()
        })
      }
      else this.insertDetailSubmit()
    });
  }

  public radioGroupChange() {
    console.log(this.rest.temp.pos);
    
  }

  public async insertDetailSubmit() {
    this.rest.checkpost('his', 'detail', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.detail = resp.data[0]
      this.rest.his.list[this.rest.id] = resp.data[0]
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
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


  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = 'images/' + new Date().getTime() + '.jpg';
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


  public remove(i: number) {
    this.rest.temp.image = this.rest.temp.image.filter((item: any, index: number) => {
      return index !== i
    })
  }
}
