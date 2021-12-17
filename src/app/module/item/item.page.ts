import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'item'
      if (!this.rest.item.init) {
        this.init()
      }
    })
  }

  public async reload() {
    await this.rest.freeze('Đang tải danh sách...')
    return new Promise(resolve => {
      this.rest.checkpost('item', 'init', {
        cat: this.rest.item.cat
      }).then(resp => {
        this.rest.defreeze()
        this.page = 1
        this.rest.item.all = resp.all
        this.rest.item.image = resp.image
        this.rest.item.catlist = resp.catlist
        this.rest.item.list = resp.list
        this.rest.item.position = resp.position
        this.rest.item.user = resp.user
        this.rest.item.cat = resp.cat
        this.rest.item.cats = resp.cats
        this.rest.item.usercat = resp.usercat
        this.filter()
        resolve(true)
      }, () => {
        this.rest.defreeze()
        resolve(true)
      })
    })
  }

  public async reloadEvent(event: any) {
    this.reload().then(() => {
      event.target.complete()
    })
  }

  public async loadData(event: any) {
    this.rest.physical.page++
    this.page++
    this.filter()
    event.target.complete()
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item', 'init', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.item.init = true
      this.rest.item.all = resp.all
      this.rest.item.image = resp.image
      this.rest.item.catlist = resp.catlist
      this.rest.item.list = resp.list
      this.rest.item.position = resp.position
      this.rest.item.user = resp.user
      this.rest.item.cat = resp.cat
      this.rest.item.cats = resp.cats
      this.rest.item.usercat = resp.usercat
      this.filter()
    }, () => {
      this.rest.defreeze()
    })
  }

  public checkCat(catid: number) {
    let check = false
    this.rest.item.cat.forEach(item => {
      if (item == catid) check = true
    })
    return check
  }

  public async filter() {
    let key = this.rest.alias(this.rest.item.keyword)
    let temp = []
    this.rest.item.list.filter((item: any, index) => {
      if (item.alias.search(key) >= 0) temp.push(index)
    })
    this.rest.item.i = temp
  }

  public purchase() {
    this.rest.navCtrl.navigateForward('item/purchase')
  }

  // public transfer() {
  //   this.rest.temp = {
  //     action: 'transfer',
  //     step: 1,
  //     list: []
  //   }
  //   this.rest.navCtrl.navigateForward('item/modal')
  // }
  // public expired() {
  //   this.rest.temp = {
  //     action: 'expired',
  //     step: 1,
  //     list: []
  //   }
  //   this.rest.navCtrl.navigateForward('item/modal')
  // }

  public view(posid: number) {
    this.rest.temp = this.rest.item.image[posid]
    this.rest.navCtrl.navigateForward('modal/detail')
  }

  public insertItem() {
    this.rest.temp = {
      action: 'item',
      id: 0,
      cat: (this.rest.item.catlist.length ? this.rest.item.catlist[0].id.toString() : 0),
      name: '',
      code: '',
      border: 10,
      position: [],
      image: []
    }
    this.rest.navCtrl.navigateForward('item/modal')
  }
  public updateItem(index: number) {
    this.rest.temp = {
      action: 'item',
      index: index,
      id: this.rest.item.list[index].id,
      cat: this.rest.item.list[index].catid,
      name: this.rest.item.list[index].name,
      code: this.rest.item.list[index].code,
      border: this.rest.item.list[index].border,
      position: this.rest.item.list[index].position,
      image: this.rest.item.list[index].image,
      keyword: this.rest.item.keyword
    }
    this.rest.navCtrl.navigateForward('item/modal')
  }

  public manager() {
    this.rest.action = 'user'
    this.rest.navCtrl.navigateForward('/item/manager')
  }

  public async removeexpire(itemindex: number, expireindex: number, name: string) {
    const alert = await this.alert.create({
      message: 'Xóa hạn sử dụng '+name+'?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeexpireSubmit(itemindex, expireindex)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeexpireSubmit(itemindex: number, expireindex: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item', 'removeexpire', {
      id: this.rest.item.list[itemindex].expired[expireindex].id,
    }).then((resp) => {
      this.rest.defreeze()
      let temp = this.rest.item.list[itemindex].expired.filter((item: any, cindex: any) => {
        return expireindex !== cindex
      })
      this.rest.item.list[itemindex].expired = temp
    }, () => {
      this.rest.defreeze()
    })
  }

  public async toggle(itemindex: number, type: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item', 'changeover', {
      id: this.rest.item.list[itemindex].id,
      type: this.rest.item.list[itemindex].type,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.list[itemindex].outstock = resp.value
    }, () => {
      this.rest.defreeze()
    })
  }

  public async removeItem(id: number) {
    const alert = await this.alert.create({
      message: 'Hàng hóa sẽ biến mất vĩnh viễn, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeItemSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeItemSubmit(index: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item', 'remove', {
      id: this.rest.item.list[index].id,
      keyword: this.rest.item.keyword
    }).then((resp) => {
      this.rest.defreeze()
      let temp = this.rest.item.list.filter((item, cindex) => {
        return index !== cindex
      })
      this.rest.item.list = temp
      this.filter()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertExpire() {
    this.rest.temp = {
      action: 'expire',
      name: '',
      code: '',
      expire: this.rest.home.today,
      number: 1
    }
    this.rest.navCtrl.navigateForward('item/modal')
  }
  public position() {
    if (this.rest.config.item < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.temp = {
        action: 'position',
        keyword: '',
        list: []
      }
      this.rest.navCtrl.navigateForward('item/modal')
    }
  }
}
