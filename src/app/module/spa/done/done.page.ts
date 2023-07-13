import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage {
  public max = 960
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;

  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa')   
    if (this.rest.temp.manager) this.statisticSubmit()
  }

  public async done() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('spa', 'report', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.init = false
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async statisticSubmit() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'statistic', {
      filter: this.rest.spa.search,
      keyword: this.rest.spa.keyword2,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async rate(id: number, point: number = 0) {
    if (this.rest.config.spa > 1) {
      let alert = await this.alert.create({
        message: 'Đánh giá ' + point + ' sao cho nhân viên?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.rateSubmit(id, point)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async rateSubmit(id: number, point: number = 0) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'statrate', {
      id: id,
      rate: point,
      keyword: this.rest.spa.keyword2,
      filter: this.rest.spa.search,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
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
          count--
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item).then((url) => {
            this.rest.temp.image[index] = url
            count--
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
