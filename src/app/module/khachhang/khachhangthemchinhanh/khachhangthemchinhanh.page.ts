import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-khachhangthemchinhanh',
  templateUrl: './khachhangthemchinhanh.page.html',
  styleUrls: ['./khachhangthemchinhanh.page.scss'],
})
export class KhachhangthemchinhanhPage implements OnInit {
  public option = []
  public weight = ['< 2kg', '2 - 4kg', '4 - 10kg', '10 - 15kg', '15 - 25kg', '25 - 35kg', '35 - 50kg', '> 50kg']
  public init = false
  public treat = false
  public max = 960
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/khachhang')
  }

  public async them() {
    if (!this.rest.temp.tenchinhanh.length) this.rest.notify('Chưa nhập tên khách hàng')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      await this.uploadImage()
      this.rest.checkpost('khachhang', 'themchinhanh', this.rest.temp).then(resp => {
        this.rest.defreeze()
        this.rest.khachhang.chinhanh = resp.danhsach
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
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
            this.rest.temp.image = canvas.toDataURL('image/jpeg')
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

  public uploadImage() {
    return new Promise((resolve) => {
      if (this.rest.temp.image.length < 200) {
        resolve("")
      }
      else {
        const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
        let fileRef = this.storage.ref(path);
        let base64 = this.rest.temp.image.substr(this.rest.temp.image.indexOf(',') + 1);
        let metadata = {
          contentType: 'image/jpeg',
        };

        fileRef.putString(base64, 'base64', metadata).then((response) => {
          fileRef.getDownloadURL().subscribe(url => {
            this.rest.temp.image = url
            resolve('')
          })
        }, (error) => {
          resolve('')
        })
      }
    })
  }
}