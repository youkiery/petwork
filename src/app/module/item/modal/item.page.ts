import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {
  public key = ''
  public max = 960
  public count = 0
  public init = false
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }


  // ionViewWillEnter() {
  //   if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/item')
  //   else {
  //     if (this.rest.temp.action == 'purchase' && !this.init) this.purchaseInit()
  //     if (this.rest.temp.action == 'transfer' && !this.init) this.transferInit()
  //     if (this.rest.temp.action == 'expired' && !this.init) this.expiredInit()
  //     if (this.rest.temp.action == 'position' && !this.init) this.positionInit()
  //   }
  // }
  
  // public async positionInit() {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   this.rest.checkpost('item', 'position_init', {}).then(resp => {
  //     this.rest.defreeze()
  //     this.init = true
  //     this.rest.temp.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async purchaseInit() {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   this.rest.checkpost('item', 'purchase_init', {}).then(resp => {
  //     this.rest.defreeze()
  //     this.init = true
  //     this.rest.temp.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async transferInit() {
  //     await this.rest.freeze('Đang tải dữ liệu......')
  //     this.rest.checkpost('item', 'transfer_init', {}).then(resp => {
  //       this.rest.defreeze()
  //       this.init = true
  //       this.rest.temp.list = resp.list
  //     }, () => {
  //       this.rest.defreeze()
  //     })
  // }

  // public async expiredInit() {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   this.rest.checkpost('item', 'expired_init', {}).then(resp => {
  //     this.rest.defreeze()
  //     this.init = true
  //     this.rest.temp.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async updatePosition(i: number) {
  //   this.rest.temp.prv = i
  //   this.rest.temp.id = this.rest.temp.list[i].id
  //   this.rest.temp.pos = this.rest.temp.list[i].name
  //   this.rest.temp.image = [this.rest.temp.list[i].image]
  //   this.rest.navCtrl.navigateForward('/modal/upload')
  // }

  // public removeItemPos(i: number) {
  //   this.rest.temp.position = this.rest.temp.position.filter((item: any, index: number) => {
  //     return i !== index
  //   })
  // }

  // public insertItemPos() {
  //   this.rest.navCtrl.navigateForward('/item/pos')
  // }

  // public removeItemSource(i: number) {
  //   this.rest.temp.source = this.rest.temp.source.filter((item: any, index: number) => {
  //     return i !== index
  //   })
  // }

  // public insertItemSource() {
  //   this.rest.navCtrl.navigateForward('/item/source')
  // }
  
  // public insertPos(i: number) {
  //   this.rest.temp.prv = i
  //   this.rest.temp.name = this.rest.temp.list[i].name
  //   this.rest.temp.old = []
  //   this.rest.temp.selected = []
  //   this.rest.navCtrl.navigateForward('/modal/insert')
  // }

  // public async insertPosition() {
  //   this.rest.temp.pos = ''
  //   this.rest.temp.image = []
  //   this.rest.navCtrl.navigateForward('/modal/upload')
  // }

  // public view(posid: number) {
  //   this.rest.temp = this.rest.item.image[posid]
  //   this.rest.navCtrl.navigateForward('/modal/detail')
  // }

  // public async removePosition(index: number) {
  //   const alert = await this.alert.create({
  //     message: 'Sau khi xác nhận vị trí sẽ biến mất vĩnh viễn',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.removePositionSbumit(index)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removePositionSbumit(index: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'position_remove', {
  //     id: this.rest.temp.list[index].id,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.temp.list = this.rest.temp.list.filter((item: any, i: number) => {
  //       return i !== index
  //     })
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public posback() {
  //   this.rest.temp.action = 'position'
  // }

  // public async done(id: number) {
  //   const alert = await this.alert.create({
  //     message: 'Hàng hóa đã hết số lượng, xóa khỏi danh sách?',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.doneSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async doneSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'expire_done', {
  //     id: id,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.temp.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async insertItem() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   await this.uploadAllImage()
    
  //   if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên hàng hóa')
  //   else if (!this.rest.temp.code.length) this.rest.notify('Chưa nhập mã hàng hóa')
  //   else {
  //     let temp = JSON.parse(JSON.stringify(this.rest.temp))
  //     temp.keyword = this.rest.item.keyword    
  //     this.rest.checkpost('item', 'insert', temp).then(resp => {
  //       this.rest.defreeze()
  //       this.rest.item.list = resp.list
  //       this.filter()
  //       this.rest.back()
  //     }, () => {
  //       this.rest.defreeze()
  //     })
  //   }
  // }

  // public async updateItem() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên hàng hóa')
  //   else if (!this.rest.temp.code.length) this.rest.notify('Chưa nhập mã hàng hóa')
  //   else {
  //     this.rest.checkpost('item', 'update', this.rest.temp).then(resp => {
  //       this.rest.defreeze()      
  //       this.rest.item.list[this.rest.temp.index] = resp.data
  //       this.filter()
  //       this.rest.back()
  //     }, () => {
  //       this.rest.defreeze()
  //     })  
  //   }
  // }

  // public suggest() {
  //   this.rest.navCtrl.navigateForward('/modal/suggest')
  // }

  // public async insertExpire() {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   let temp = JSON.parse(JSON.stringify(this.rest.temp))
  //   this.rest.checkpost('item', 'expire', temp).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.list[this.rest.temp.index].expired = resp.data
  //     this.rest.back()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public suggestItem() {
  //   this.rest.temp.list = this.rest.item.all.filter((item: any) => {
  //     return item.name.search(this.rest.temp.keyword) >= 0 || item.code.search(this.rest.temp.keyword) >= 0
  //   })
  // }

  // public async removePos(index: number, itemindex: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'repos', {
  //     posid: this.rest.temp.list[index].position[itemindex].posid,
  //     itemid: this.rest.temp.list[index].position[itemindex].itemid,
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.temp.list[index].position = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async insertCat() {
  //   const alert = await this.alert.create({
  //     message: 'Nhập tên danh mục',
  //     inputs: [
  //       {
  //         label: 'Danh mục',
  //         name: 'cat',
  //         value: ''
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.insertCatSubmit(e.cat)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async insertCatSubmit(cat: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('item', 'incat', {
  //     cat: cat
  //   }).then((resp) => {
  //     this.rest.defreeze()
  //     this.rest.item.catlist = resp.catlist
  //     this.rest.temp.cat = resp.cat.toString()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
  
  // public async filter() {
  //   let key = this.rest.alias(this.rest.item.keyword)
  //   let temp = []
  //   this.rest.item.list.filter((item: any, index) => {
  //     if (item.alias.search(key) >= 0) temp.push(index)
  //   })
  //   this.rest.item.i = temp
  // }

  // public upload() {
  //   this.pwaphoto.nativeElement.click();
  // }

  // public async remove(index: number) {
  //   let alert = await this.alert.create({
  //     message: 'Xóa hình ảnh?',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.removeSubmit(index)
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // public removeSubmit(i: number) {
  //   this.rest.temp.image = this.rest.temp.image.filter((item: any, index: number) => {
  //     return index !== i
  //   })
  // }

  // public async uploadPWA() {
  //   const fileList: FileList = this.pwaphoto.nativeElement.files;
  //   if (fileList && fileList.length > 0) {
  //     await this.rest.freeze('Đang tải dữ liệu...')
  //     for (let i = 0; i < fileList.length; i++) {
  //       await this.firstFileToBase64(fileList[i]).then((result: string) => {
  //         let image = new Image();
  //         image.src = result
  //         image.onload = () => {
  //           let canvas = document.createElement('canvas')
  //           let context = canvas.getContext('2d')
  //           let rate = 1
  //           if (image.width > this.max || image.height > this.max) {
  //             if (image.width > image.height) rate = image.width / this.max
  //             else rate = image.height / this.max
  //           }
  //           let newWidth = image.width / rate
  //           let newHeight = image.height / rate
  //           canvas.width = newWidth
  //           canvas.height = newHeight
  //           context.drawImage(image, 0, 0, canvas.width, canvas.height)
  //           this.rest.temp.image.push(canvas.toDataURL('image/jpeg'));
  //         }
  //       }, (err: any) => { });
  //     }
  //     this.rest.defreeze()
  //   }
  // }

  // private firstFileToBase64(fileImage: File): Promise<{}> {
  //   return new Promise((resolve, reject) => {
  //     let fileReader: FileReader = new FileReader();
  //     if (fileReader && fileImage != null) {
  //       fileReader.readAsDataURL(fileImage);
  //       fileReader.onload = () => {
  //         resolve(fileReader.result);
  //       };

  //       fileReader.onerror = (error) => {
  //         reject(error);
  //       };
  //     } else {
  //       reject(new Error('No file found'));
  //     }
  //   });
  // }

  // public async uploadAllImage() {
  //   return new Promise((resolve) => {
  //     let count = this.rest.temp.image.length
  //     if (count == 0) resolve(true)
  //     this.rest.temp.image.forEach((item, index) => {
  //       if (item.length < 200) {
  //         count--
  //         if (count == 0) resolve(true)
  //       }
  //       else {
  //         this.uploadImage(item).then((url) => {
  //           this.rest.temp.image[index] = url
  //           count--
  //           if (count == 0) resolve(true)
  //         })
  //       }
  //     });
  //   })
  // }

  // public uploadImage(image: string) {
  //   return new Promise((resolve) => {
  //     const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
  //     let fileRef = this.storage.ref(path);
  //     let base64 = image.substr(image.indexOf(',') + 1);
  //     let metadata = {
  //       contentType: 'image/jpeg',
  //     };

  //     fileRef.putString(base64, 'base64', metadata).then((response) => {
  //       fileRef.getDownloadURL().subscribe(url => {
  //         resolve(url)
  //       })
  //     }, (error) => {
  //       resolve('')
  //     })
  //   })
  // }
}
