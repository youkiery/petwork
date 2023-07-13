import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelconfig',
  templateUrl: './excelconfig.page.html',
  styleUrls: ['./excelconfig.page.scss'],
})
export class ExcelconfigPage {
  public max = 960
  public data: any = {
    title: '',
    logo: '',
    temp: '',
  }

  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else {
      this.data = JSON.parse(JSON.stringify(this.rest.site))
      this.data.temp = ''
    }
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('admin', 'config', {
      config: this.data
    }).then((resp) => {
      this.rest.defreeze()      
      this.rest.site = this.data
    }, () => {
      this.rest.defreeze()
    })
  }

  public async getform(form: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'getform', {
      form: form
    }).then((resp) => {
      this.rest.defreeze()      
      this.rest.temp = {
        form: form,
        html: resp.html
      }
      this.rest.navCtrl.navigateForward('/excel/configform')
    }, () => {
      this.rest.defreeze()
    })
  }

  public picklogo() {
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
            let data = canvas.toDataURL('image/png');
            this.data.temp = data
            if (this.data.logo.length) this.data.logo = data
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
      if (this.data.temp.length < 200) resolve(true)
      else {
        this.uploadImage(this.data.logo).then((url) => {
          this.data.logo = url
          resolve(true)
        })
      }
    });
  }

  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
      let fileRef = this.storage.ref(path);
      let base64 = image.substr(image.indexOf(',') + 1);
      let metadata = {
        contentType: 'image/png',
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
