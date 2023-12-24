import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisinsert',
  templateUrl: './hisinsert.page.html',
  styleUrls: ['./hisinsert.page.scss'],
})
export class HisinsertPage {
  public max = 960
  public count = 0
  public txt = [
    {name: 'xquang', value: 'X quang'},
    {name: 'sinhly', value: 'Sinh lý'},
    {name: 'sinhhoa', value: 'Sinh hóa'},
    {name: 'sieuam', value: 'Siêu âm'},
    {name: 'nuoctieu', value: 'Nước tiểu'}
  ]
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

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else this.rest.ready().then(() => {
      if (!this.rest.temp.temp && !this.rest.temp.id && !this.init) {
        this.init = true
        this.suggest()
      }
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('/modal/suggest')
  }

  public async insert() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      await this.uploadAllImage()
      this.rest.checkpost('his', 'insert', this.rest.temp).then((resp) => {
        this.rest.defreeze()
        this.rest.his.segment = this.rest.temp.pos
        this.rest.his.list = resp.list
        this.recount()
        this.rest.other.init = true
        this.rest.xetnghiem.khoitao = true
        this.rest.badge.init = false
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async update() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      await this.uploadAllImage()
      this.rest.checkpost('his', 'update', this.rest.temp).then((resp) => {
        this.rest.defreeze()
        this.rest.his.segment = this.rest.temp.pos
        this.rest.his.list = resp.list
        this.recount()
        this.rest.other.init = true
        this.rest.xetnghiem.khoitao = true
        this.rest.badge.init = false
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async insertDetail() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang tải dữ liệu...')
      await this.uploadAllImage()
      this.rest.checkpost('his', 'detail', this.rest.temp).then((resp) => {
        this.rest.defreeze()
        this.recount()
        this.rest.other.init = true
        this.rest.xetnghiem.khoitao = true
        this.rest.badge.init = false
        this.rest.back()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public insertexam() {
    this.rest.navCtrl.navigateForward('/his/exam')
  }

  public removeexam(i: number) {
    this.rest.temp.exam = this.rest.temp.exam.filter((item: any, index: number) => {
      return index !== i
    })
  }

  public checknum(num: number) {
    return typeof(num) == 'number'
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

  public recount() {
    let count = 0
    let treat = [0, 0]
    let pose = [0, 0]

    this.rest.his.list.forEach(item => {
      treat[item.pos] ++
      if (item.sc.length) {
        count ++
        pose[item.pos] ++
      }
    })
    this.rest.his.count = count
    this.rest.his.treat = treat
    this.rest.his.pose = pose
  }
}
