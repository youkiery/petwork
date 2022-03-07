import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kaizeninsert',
  templateUrl: './kaizeninsert.page.html',
  styleUrls: ['./kaizeninsert.page.scss'],
})
export class KaizeninsertPage implements OnInit {
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('kaizen')
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
      this.saveSubmit()
    }
  }

  public async save() {
    this.count = 0
    await this.rest.freeze('Đang tải dữ liệu...')
    if (!this.rest.temp.image.length) this.saveSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.checkSaveSubmit()
        })
      }
      else this.checkSaveSubmit()
    });
  }
  
  public async saveSubmit() {
    let action = 'insert'
    if (this.rest.temp.id) action = 'edit'
    this.rest.checkpost('kaizen', action, {
      data: this.rest.temp,
      filter: this.rest.kaizen.filter
    }).then(data => {
      this.rest.kaizen.list = data['list']
      this.rest.defreeze()
      this.rest.back()
    }, (e) => {
      this.rest.defreeze()
    })
  }
}