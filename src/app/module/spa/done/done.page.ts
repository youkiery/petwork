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
export class DonePage implements OnInit {
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;

  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.root()      
    })
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public remove(i: number) {
    this.rest.temp.image = this.rest.temp.image.filter((item: any, index: number) => {
      return index !== i
    })
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      await this.rest.freeze('Đang tải...')
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

  public async checkInsertSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.doneSubmit()
    }
  }

  public async done() {
    this.count = 0
    await this.rest.freeze('Đang tải ảnh...')

    if (!this.rest.temp.image.length) this.doneSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkInsertSubmit()
        })
      }
      else this.checkInsertSubmit()
    });
  }

  public async doneSubmit() {
    this.rest.checkpost('spa', 'report', this.rest.temp).then((resp) => {
      this.rest.defreeze()
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async statisticSubmit() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa', 'statistic', {
      from: this.time.isodatetodate(this.rest.spa.from),
      end: this.time.isodatetodate(this.rest.spa.end),
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
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa', 'statrate', {
      id: id,
      rate: point,
      from: this.time.isodatetodate(this.rest.spa.from),
      end: this.time.isodatetodate(this.rest.spa.end),
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
}
