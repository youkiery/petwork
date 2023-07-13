import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {
  public page = 1
  public segment = '0'
  public floor = [
    { name: 'Tất cả', value: '' },
    { name: 'Tầng 1', value: 'T1' },
    { name: 'Tầng 2', value: 'T2' },
    { name: 'Tầng 3', value: 'T3' },
  ]
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }


  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'item'
      if (!this.rest.item.init) {
        this.init()
      }
    })
  }

  public async reload() {
    await this.rest.freeze('Đang tải dữ liệu......')
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
        this.rest.item.purchase = resp.purchase
        this.rest.item.purchased = resp.purchased
        this.rest.item.outstock = resp.outstock
        this.rest.item.source = resp.source       
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
    this.page++
    this.filter()
    event.target.complete()
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu......')
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
      this.rest.item.purchase = resp.purchase
      this.rest.item.purchased = resp.purchased
      this.rest.item.source = resp.source
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

  public cancel() {
    this.rest.item.toggle = !this.rest.item.toggle;
    this.rest.item.list.forEach((item, index) => {
      this.rest.item.list[index].checked = false
    })
  }

  public submit() {
    let check = false
    this.rest.item.list.forEach((item, index) => {
      if (item.checked) check = true
    })

    if (!check) this.rest.notify('Chọn 1 mặt hàng để tiếp tục')
    else {
      if (this.rest.item.action == 'purchase') this.rest.navCtrl.navigateForward('/item/cart')
      else this.rest.navCtrl.navigateForward('/item/transfer')
    }
  }

  public async filter() {
    let key = this.rest.alias(this.rest.item.keyword)
    let temp = []

    this.rest.storage.set('floor', this.rest.item.floor)
    this.rest.item.list.filter((item: any, index) => {
      if (this.segment == '0' || (this.segment == '1' && item.lowonnumber == 1))
      if (this.searchFloor(item.position)) {
        if (this.rest.item.sourceid == '0' || this.searchSource(this.rest.item.list[index].source)) {
          if (item.alias.search(key) >= 0) temp.push(index)
          else if (item.code.toLowerCase().search(key) >= 0) temp.push(index)
        }
      }
    })
    this.rest.item.i = temp
  }

  public searchFloor(list: any) {
    let check = false
    
    list.forEach((pos: any) => {
      if (pos.name.search(this.rest.item.floor) >= 0) {
        check = true
        return
      }
    })
    return check
  }

  public searchSource(list: any) {
    let check = false
    
    list.forEach((item: any) => {
      if (item.id == this.rest.item.sourceid) {
        check = true
        return
      }
    })
    return check
  }

  public purchase() {
    this.rest.navCtrl.navigateForward('/item/purchase')
  }

  // public transfer() {
  //   this.rest.temp = {
  //     action: 'transfer',
  //     step: 1,
  //     list: []
  //   }
  //   this.rest.navCtrl.navigateForward('/item/modal')
  // }
  // public expired() {
  //   this.rest.temp = {
  //     action: 'expired',
  //     step: 1,
  //     list: []
  //   }
  //   this.rest.navCtrl.navigateForward('/item/modal')
  // }

  public view(posid: number) {
    if (!this.rest.item.toggle) {
      this.rest.temp = this.rest.item.image[posid]
      this.rest.navCtrl.navigateForward('/modal/detail')
    }
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
      source: [],
      image: []
    }
    this.rest.navCtrl.navigateForward('/item/modal')
  }
  public updateItem(index: number) {
    let item = this.rest.item.list[index]
    
    this.rest.temp = {
      action: 'item',
      index: index,
      id: item.id,
      cat: item.catid,
      name: item.name,
      code: item.code,
      border: item.border,
      position: item.position,
      source: item.source,
      image: item.image,
      keyword: this.rest.item.keyword
    }
    
    this.rest.navCtrl.navigateForward('/item/modal')
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
    await this.rest.freeze('Đang tải dữ liệu...')
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

  public outstockitem() {
    return this.rest.item.list.filter((item) => { return item.lowonnumber == 1 }).length
  }

  public async outstock(itemindex: number) {
    const alert = await this.alert.create({
      message: 'Nhập số lượng đề xuất nhập',
      inputs: [{
        placeholder: 'Số lượng',
        value: 1,
        type: 'text',
        name: 'number'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.outstockSubmit(itemindex, this.rest.item.list[itemindex].id, e.number)
          }
        }
      ]
    });

    await alert.present();
  }

  public async outstockSubmit(itemindex: number, id: number, number: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'outstock', {
      id: id,
      number: number
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.item.list[itemindex].outstock = resp.value
    }, () => {
      this.rest.defreeze()
    })
  }

  public async toggle(itemindex: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('item', 'changeover', {
      id: this.rest.item.list[itemindex].id,
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
    await this.rest.freeze('Đang tải dữ liệu...')
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

  public insertExpire(index: number) {
    let item = this.rest.item.list[index]
    this.rest.temp = {
      index: index,
      id: item.id,
      action: 'expire',
      name: item.name,
      code: item.code,
      expire: this.rest.home.today,
      number: 1
    }
    this.rest.navCtrl.navigateForward('/item/modal')
  }

  public purchased() {
    this.rest.navCtrl.navigateForward('/item/purchased')
  }

  public position() {
    if (this.rest.config.item < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.temp = {
        action: 'position',
        keyword: '',
        list: []
      }
      this.rest.navCtrl.navigateForward('/item/modal')
    }
  }
}
