import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manualinsert',
  templateUrl: './manualinsert.page.html',
  styleUrls: ['./manualinsert.page.scss'],
})
export class ManualinsertPage {
  public cate = {
    key: ['', 'user', 'admin', 'vaccine', 'usg', 'spa', 'schedule', 'item', 'cart', 'his', 'kaizen', 'drug', 'blood', 'bio', 'price', 'vehicle', 'transport'],
    name: ['Chọn danh mục', 'Người dùng', 'Quản lý', 'Quản lý vaccine', 'Quản lý siêu âm', 'Lịch spa', 'Đăng ký lịch', 'Quản lý hàng hóa', 'Bán hàng online', 'Lưu bệnh', 'Kaizen', 'Tra cứu thuốc', 'Xét nghiệm sinh lý', 'Xét nghiệm sinh hóa', 'Giá sỉ', 'Quản lý xe', 'Danh sách vận chuyển', ],
  }
  public module = [
    { code: 'user', name: 'Người dùng' },
    { code: 'admin', name: 'Quản lý' },
    { code: 'vaccine', name: 'Quản lý vaccine' },
    { code: 'usg', name: 'Quản lý siêu âm' },
    { code: 'spa', name: 'Lịch spa' },
    { code: 'schedule', name: 'Đăng ký lịch' },
    { code: 'item', name: 'Quản lý hàng hóa' },
    { code: 'cart', name: 'Bán hàng online' },
    { code: 'his', name: 'Lưu bệnh' },
    { code: 'kaizen', name: 'Kaizen' },
    { code: 'drug', name: 'Tra cứu thuốc' },
    { code: 'blood', name: 'Xét nghiệm sinh lý' },
    { code: 'bio', name: 'Xét nghiệm sinh hóa' },
    { code: 'price', name: 'Giá sỉ' },
    { code: 'vehicle', name: 'Quản lý xe' },
    { code: 'transport', name: 'Danh sách vận chuyển' },
  ]
  public max = 960
  public count = 0
  public total = 0
  public done = 0
  public index = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/manual')
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
      if ((this.rest.manual.cate == '' || this.rest.manual.cate == data.module) && this.deepsearch(key, data.title)) {
        if (!temp[data.module]) {
          let key = this.cate.key.indexOf(data.module)
          temp[data.module] = {
            name: this.cate.name[key],
            list: []
          }
        }
        temp[data.module].list.push(index)
      }
    })
    let list = [] 
    for (const key in temp) {
      if (Object.prototype.hasOwnProperty.call(temp, key)) {
        const data = temp[key];
        list.push(data)
      }
    }
    
    this.rest.manual.list = list
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

