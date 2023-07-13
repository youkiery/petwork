import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-workdetail',
  templateUrl: './workdetail.page.html',
  styleUrls: ['./workdetail.page.scss'],
})
export class WorkdetailPage {
  public khoitaobinhluan = false
  public selected = 0
  public excel = ['/assets/icon/excel-off.png', '/assets/icon/excel-on.png']
  public follow = ''
  public max = 960
  public count = 0
  public ngaylaplai = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
  public id = 0
  public chat = ''
  public trangthai = [
    '/assets/icon/untick.png',
    '/assets/icon/underreview.png',
    '/assets/icon/tick.png',
  ]
  public chuyentrangthai = [
    'Chuyển công việc sang mục kiểm tra',
    'Chuyển công việc sang hoàn thành',
  ]
  public image = []
  public binhluan = []
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/work')
    else if (!this.khoitaobinhluan) this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'laybinhluan', {
      id: this.rest.detail.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.khoitaobinhluan = true
      this.binhluan = resp.binhluan
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'laybinhluan', {
      id: this.rest.detail.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.binhluan = resp.binhluan
      event.target.complete()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'laythongtin', {
      id: this.rest.detail.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      this.rest.temp.chitiet = 1
      delete this.rest.temp.repeat
      this.rest.temp.chedo = this.rest.work.chedo,
      this.rest.temp.filter = this.rest.work.filter,
      this.rest.navCtrl.navigateForward('/work/insert')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa() {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa công việc',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoa()
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'xoa', {
      id: this.rest.detail.id,
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  // xác nhận 
  public async xacnhan() {
    let congviec = this.rest.detail
    if (congviec.status > 1) return 0 // đã hoàn thành không thay đổi
    else if (congviec.type == 0) {
      this.rest.notify('Nhân viên không có quyền xác nhận')
    }
    else if (congviec.type == 1 && congviec.status > 0) {
      this.rest.notify('Chỉ quản lý mới có quyền xác nhận')
    }
    else {
      let alert = await this.alert.create({
        message: this.chuyentrangthai[congviec.status],
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.xacnhanSubmit(congviec.id, congviec.status)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async xacnhanSubmit(id: number, status: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'chuyentrangthai', {
      id: id,
      status: status,
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.detail.status = resp.trangthai
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  // bình luận
  // sửa, xóa bình luận

  public async updatecomment(i: number) {
    this.chat = this.binhluan[i].comment
    this.image = this.binhluan[i].file
    this.id = this.binhluan[i].id
  }

  public async updatecommentSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'xoabinhluan', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.binhluan = resp.binhluan
    }, () => {
      this.rest.defreeze()
    })
  }

  public async deletecomment(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa bình luận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deletecommentSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deletecommentSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'xoabinhluan', {
      id: this.rest.detail.id,
      commentid: id
    }).then((resp) => {
      this.rest.defreeze()
      this.binhluan = resp.binhluan
    }, () => {
      this.rest.defreeze()
    })
  }

  public removeupdate() {
    this.id = 0
    this.image = []
    this.chat = ''
  }

  public async nhantin() {
    if (!this.chat.length && !this.image.length) return 0
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploadAllImage()
    this.rest.checkpost('work', 'nhantin', {
      chat: this.chat,
      image: this.image,
      id: this.rest.detail.id,
      commentid: this.id
    }).then(resp => {
      this.rest.defreeze()
      this.binhluan = resp.binhluan
      this.image = []
      this.chat = ''
      this.id = 0
    }, () => {
      this.rest.defreeze()
    })
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public async remove(i: number) {
    let alert = await this.alert.create({
      message: 'Xóa hình ảnh?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(i)
          }
        }
      ]
    });
    await alert.present();
  }

  public removeSubmit(i: number) {
    this.image = this.image.filter((item, index) => {
      return i !== index
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
            this.image.push(canvas.toDataURL('image/jpeg'))
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
      let count = this.image.length
      if (count == 0) resolve(true)
      this.image.forEach((item, index) => {
        if (item.length < 200) {
          count--
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item).then((url) => {
            this.image[index] = url
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
