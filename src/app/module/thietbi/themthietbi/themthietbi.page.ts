import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-themthietbi',
  templateUrl: './themthietbi.page.html',
  styleUrls: ['./themthietbi.page.scss'],
})
export class ThemthietbiPage implements OnInit {
  public max = 960
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/thietbi')
  }

  public async them() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('thietbi', 'them', this.rest.temp).then(resp => {
      this.rest.thietbi.danhsach = resp.danhsach
      this.locthietbi()
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public locthietbi() {
    let danhsachtam = []
    let tukhoa = this.rest.alias(this.rest.thietbi.tukhoa)
    this.rest.thietbi.danhsach.forEach(thietbi => {
      if (thietbi.alias.indexOf(tukhoa) >= 0) danhsachtam.push(thietbi)
    })
    this.rest.thietbi.danhsachtam = danhsachtam
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
            this.rest.temp.hinhanh = canvas.toDataURL('image/jpeg');
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
      if (this.rest.temp.hinhanh.length < 200) resolve(true)
      else {
        this.uploadImage(this.rest.temp.hinhanh).then((url) => {
          this.rest.temp.hinhanh = url
          resolve(true)
        })
      }
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
