import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  public option = [{ name: "wash_dog", value: "Tắm chó", check: false }, { name: "wash_cat", value: "Tắm mèo", check: false }, { name: "wash_white", value: "Tắm trắng", check: false }, { name: "cut_fur", value: "Cắt lông", check: false }, { name: "shave_foot", value: "Cạo lông chân", check: false }, { name: "shave_fur", value: "Cạo ông", check: false }, { name: "cut_claw", value: "Cắt, dũa móng", check: false }, { name: "cut_curly", value: "Cắt lông rối", check: false }, { name: "wash_ear", value: "Vệ sinh tai", check: false }, { name: "wash_mouth", value: "Vệ sinh răng miệng", check: false }, { name: "paint_footear", value: "Nhuộm chân, tai", check: false }, { name: "paint_all", value: "Nhuộm toàn thân", check: false }, { name: "pin_ear", value: "Bấm lỗ tai", check: false }, { name: "cut_ear", value: "Cắt lông tai", check: false }, { name: "dismell", value: "Vắt tuyết hôi", check: false }]
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
    if (this.rest.temp.id) {
      this.option = this.rest.temp.option
    }
  }

  public suggest() {
    this.rest.router.navigateByUrl('/modal/suggest')
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

  public async checkSaveSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.insertSubmit()
    }
  }

  public async checkUpdateSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.updateSubmit()
    }
  }

  public async insert() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.insertSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkSaveSubmit()
        })
      }
      else this.checkSaveSubmit()
    });
  }

  public async update() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.insertSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkUpdateSubmit()
        })
      }
      else this.checkUpdateSubmit()
    });
  }

  public checkOption() {
    let option = {}
    this.option.forEach(item => {
      option[item.name] = Number(item.check)
    });
    return option
  }

  public async insertSubmit() {
    this.rest.temp.option = this.checkOption()
    this.rest.checkpost('spa', 'insert', this.rest.temp).then(response => {
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateSubmit() {
    this.rest.temp.option = this.checkOption()
    this.rest.checkpost('spa', 'update', this.rest.temp).then(response => {
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async drugInsert() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.image.length) this.drugInsertSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkDrugInsertSubmit()
        })
      }
      else this.checkDrugInsertSubmit()
    });
  }
  
  public async drugUpdate() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.image.length) this.drugUpdateSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkDrugUpdateSubmit()
        })
      }
      else this.checkDrugUpdateSubmit()
    });
  }

  public async checkDrugInsertSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.drugInsertSubmit()
    }
  }
  
  public async checkDrugUpdateSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.drugUpdateSubmit()
    }
  }

  public async drugInsertSubmit() {
    await this.rest.freeze('Thêm thuốc...')
    this.rest.temp.name = this.rest.data.drug.filter.name
    this.rest.temp.effect = this.rest.data.drug.filter.effect

    this.rest.checkpost('drug', 'insert', this.rest.temp).then((response) => {
      this.rest.data.drug.list = response.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async drugUpdateSubmit() {
    await this.rest.freeze('Cập nhật thông tin...')
    this.rest.temp.name = this.rest.data.drug.filter.name
    this.rest.temp.effect = this.rest.data.drug.filter.effect
    this.rest.checkpost('drug', 'update', this.rest.temp).then((response) => {
      this.rest.data.drug.list = response.list
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
