import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manualinsert',
  templateUrl: './manualinsert.page.html',
  styleUrls: ['./manualinsert.page.scss'],
})
export class ManualinsertPage implements OnInit {

  public module = [{
    code: 'vaccine', name: 'Quản lý vaccine'
  },
  {
    code: 'usg', name: 'Quản lý siêu âm'
  },
  {
    code: 'spa', name: 'Lịch spa'
  },
  {
    code: 'item', name: 'Quản lý hàng hóa'
  }]
  public max = 640
  public count = 0
  public total = 0
  public done = 0
  public index = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('manual')
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    await this.uploader()
    this.rest.checkpost('manual', 'save', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.manual.data = resp.list
      this.search()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async uploader() {
    return new Promise((resolve) => {
      this.rest.temp.list.forEach((item: any, index: number) => {
        if (item.type == 1 && item.content.substr(0, 5) == 'data:') {
          this.total ++
          this.uploadImage(item.content).then((image) => {
            this.rest.temp.list[index].content = image
            this.count ++
          })
        }
      });
      setInterval(() => {
        if (this.total == this.count) resolve('')
      }, 300)
    })
  }

  public search() {
    let temp = []
    let key = this.rest.alias(this.rest.manual.key)
    this.rest.manual.data.forEach((data, index) => {
      if (this.deepsearch(key, data.module) || this.deepsearch(key, data.title)) temp.push(index)
    })
    this.rest.manual.list = temp
  }

  public deepsearch(keyword: string, content: string) {
    content = this.rest.alias(content)
    if (content.search(keyword) >= 0) return true 
    return false
  }

  public insert(type: number) {
    this.rest.temp.list.push({
      type: type,
      content: ''
    })
    if (type == 1) this.upload(this.rest.temp.list.length - 1)
  }

  public upload(index: number) {
    this.index = index
    this.pwaphoto.nativeElement.click();
  }

  public remove(i: number) {
    let temp = this.rest.temp.list.filter((item: any, index: number) => {
      return i != index
    })
    this.rest.temp.list = temp
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
            this.rest.temp.list[this.index].content = canvas.toDataURL('image/jpeg');
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
}

