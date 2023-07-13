import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workinsert',
  templateUrl: './workinsert.page.html',
  styleUrls: ['./workinsert.page.scss'],
})
export class WorkinsertPage {
  public selected = 0
  public excel = ['/assets/icon/excel-off.png', '/assets/icon/excel-on.png']
  public follow = ''
  public max = 960
  public count = 0
  public ngaylaplai = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }

  
  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
  }

  public themdanhmuc() {
    let list = []
    this.rest.work.nhanvien.forEach((nhanvien: any) => {
      list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })
    this.rest.detail = {
      work: true,
      name: '',
      list: list
    }
    this.rest.navCtrl.navigateForward('/work/departinsert')
  }

  // public async select(i: number) {
  //   this.selected = i
  //   this.file.nativeElement.click()
  // }

  // public filechange() {
  //   let file = this.file
  //   const filelist: FileList = file.nativeElement.files
  //   if (filelist.length) this.rest.temp.file[this.selected] = filelist[0]
  //   else this.rest.temp.file[this.selected] = 0
  //   this.file.nativeElement.value = ''
  // }

  // public remove(i: number) {
  //   this.rest.temp.file = this.rest.temp.file.filter((item: any, index: number) => {
  //     return i !== index
  //   })
  // }

  // public insert() {
  //   this.rest.temp.file.push(0)
  // }

  public chonnhanvien(loai: string) {
    this.rest.action = loai
    this.rest.navCtrl.navigateForward('/work/insertfollow')        
  }

  public async insert() {
    if (this.rest.temp.repeat && this.rest.temp.repeat.type == '1') {
      // kiếm tra nếu là theo tuần thì phải chọn ít nhất 1
      let all = 0
      this.rest.temp.repeat.list.forEach((repeat: number) => {
        if (repeat) all ++
      });
      if (!all) return this.rest.notify('Xin hãy chọn ít nhất 1 ngày trong tuần')
    }
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('work', 'themcongviec', this.rest.temp).then(resp => {
    this.rest.defreeze()
      if (this.rest.temp.laplai) this.rest.work.danhsachlaplai = resp.laplai
      this.rest.work.khoitao = [false, false]
      this.rest.work.khoitao[this.rest.work.chedo] = true
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
      if (this.rest.temp.chitiet) this.rest.detail = resp.chitiet
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
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
