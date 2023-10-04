import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xetnghiemthem',
  templateUrl: './xetnghiemthem.page.html',
  styleUrls: ['./xetnghiemthem.page.scss'],
})
export class XetnghiemthemPage implements OnInit {
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

  ngOnInit(): void { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/xetnghiem')
    console.log(this.rest.temp);
  }

  public thaydoigiong() {
    let chitieu = this.rest.xetnghiem.chitieugiong[this.rest.temp.xetnghiem][this.rest.temp.giong].chitieu
    chitieu.forEach((item, index) => {
      chitieu[index]["giatri"] = ""
    });
    this.rest.temp.idgiong = this.rest.xetnghiem.chitieugiong[this.rest.temp.xetnghiem][this.rest.temp.giong].id
    this.rest.temp.chitieu = chitieu
  }

  public async capnhatxetnghiem() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('xetnghiem', 'capnhatxetnghiem', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.tab = '2'
      this.rest.xetnghiem.danhsach = resp.danhsach
      this.rest.back()
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
    this.rest.temp.hinhanh = this.rest.temp.hinhanh.filter((item: any, index: number) => {
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
            this.rest.temp.hinhanh.push(canvas.toDataURL('image/jpeg'));
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
      let count = this.rest.temp.hinhanh.length
      if (count == 0) resolve(true)
      this.rest.temp.hinhanh.forEach((item, index) => {
        if (item.length < 200) {
          count --
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item).then((url) => {
            this.rest.temp.hinhanh[index] = url
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
