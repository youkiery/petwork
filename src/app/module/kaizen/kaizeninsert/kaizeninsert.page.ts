import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kaizeninsert',
  templateUrl: './kaizeninsert.page.html',
  styleUrls: ['./kaizeninsert.page.scss'],
})
export class KaizeninsertPage {
  public max = 960
  public count = 0
  public name = 0
  public rev = ['hinhanhdongdoi', 'hinhanhtugiac', 'image']
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/kaizen')
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    let action = 'insert'
    if (this.rest.temp.id) action = 'edit'
    this.rest.checkpost('kaizen', action, this.rest.temp).then(data => {
      this.rest.kaizen.list = data['list']
      this.rest.badge.init = false
      this.rest.defreeze()
      this.rest.back()
    }, (e) => {
      this.rest.defreeze()
    })
  }

  public upload(name: number) {
    this.name = name
    this.pwaphoto.nativeElement.click();
  }

  public async remove(index: number, name: number) {
    let alert = await this.alert.create({
      message: 'Xóa hình ảnh?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(index, name)
          }
        }
      ]
    });
    await alert.present();
  }

  public removeSubmit(i: number, name: number) {
    this.rest.temp[this.rev[name]] = this.rest.temp[this.rev[name]].filter((item: any, index: number) => {
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
            this.rest.temp[this.rev[this.name]].push(canvas.toDataURL('image/jpeg'));
            this.pwaphoto.nativeElement.value = null
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
      let count = this.rest.temp.image.length + this.rest.temp.hinhanhdongdoi.length + this.rest.temp.hinhanhtugiac.length
      if (count == 0) resolve(true)
      this.rev.forEach(name => {
        this.rest.temp[name].forEach((item, index) => {
          if (item.length < 200) {
            count--
            if (count == 0) resolve(true)
          }
          else {
            this.uploadImage(item).then((url) => {
              this.rest.temp[name][index] = url
              count--
              if (count == 0) resolve(true)
            })
          }
        });
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
