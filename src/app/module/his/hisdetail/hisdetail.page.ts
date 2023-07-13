import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-hisdetail',
  templateUrl: './hisdetail.page.html',
  styleUrls: ['./hisdetail.page.scss'],
})
export class HisdetailPage {
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public pay = [
    { class: 'pos red', name: 'Chưa ra toa' },
    { class: 'pos yellow', name: 'Chưa trả' },
    { class: 'pos', name: 'Đã trả' },
  ]
  public list = []
  public text = ''
  public side = ['posx', 'posx side']
  public sex = ['-', 'Đực', 'Cái']
  public x = ['', 'x']
  public init = false
  @ViewChild(IonContent) content: IonContent;
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    // else if (!this.init) this.auto()
  }

  public async print(index: number) {
    let id = this.rest.his.list[this.rest.id].detail[index].id
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'printer', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(resp.html);
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    }, () => {
      this.rest.defreeze()
    })

  }

  public viewall(images: string[]) {
    this.rest.image = images
    this.rest.navCtrl.navigateForward('/his/images')
  }

  public chat() {
    this.rest.temp = {
      id: this.rest.his.list[this.rest.id].id
    }
    this.rest.navCtrl.navigateForward('/his/chat')
  }

  public async change(payindex: number, index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận chuyển trạng thái thanh toán sang ' + this.pay[payindex].name,
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.changeSubmit(payindex, index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async changeSubmit(payindex: number, index: number) {
    let detail = this.rest.his.list[this.rest.id].detail[index]
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'pay', {
      pay: payindex,
      detailid: detail.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list[this.rest.id].detail[index].pay = payindex
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(i: number) {
    let item = this.rest.his.list[this.rest.id]
    let detail = item.detail[i]
    this.rest.temp = {
      filter: this.rest.his.filter,
      near: this.time.datetoisodate(item.sc),
      disease: item.disease,
      id: item.id,
      detailid: detail.id,
      name: item.customer,
      phone: item.phone,
      address: item.address,
      petname: item.petname,
      petid: item.petid,
      weight: item.weight,
      age: item.age,
      gender: item.gender,
      species: item.species,
      conclude: detail.conclude,
      subother: detail.subother,
      temperate: detail.temperate,
      other: detail.other,
      treat: detail.treat,
      status: Number(detail.status),
      time: this.time.datetoisodate(detail.time),
      image: detail.image,
      pos: item.pos,
      xquang: Number(detail.xquang),
      sinhly: Number(detail.sinhly),
      sinhhoa: Number(detail.sinhhoa),
      sieuam: Number(detail.sieuam),
      nuoctieu: Number(detail.nuoctieu),
      exam: detail.exam
    }

    this.rest.navCtrl.navigateForward('/his/insert')
  }

  public view(type: string, id: number, status = 0) {
    if (id <= 0) return
    switch (type) {
      case 'xquang':
        this.denxquang(id)
        break;
      case 'sinhly':
        this.densinhly(id)
        break;
      case 'sinhhoa':
        this.densinhhoa(id)
        break;
      case 'sieuam':
        this.densieuam(id)
        break;
      case 'nuoctieu':

        break;
      case 'exam':
        if (status > 0) {
          this.goexam(id)
        }
        break;
    }
  }
  
  public async goexam(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('other', 'getinfo', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.data
      this.rest.navCtrl.navigateForward('/his/result')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async denxquang(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xquang', 'getinfo', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.data
      this.rest.navCtrl.navigateForward('/his/result')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async densieuam(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('sieuam', 'getinfo', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.data
      this.rest.navCtrl.navigateForward('/his/result')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async densinhly(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('physical', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.physical.id = id
      this.rest.physical.print = resp.html
      this.rest.navCtrl.navigateForward('/physical/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async densinhhoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('profile', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.profile.id = id
      this.rest.profile.print = resp.html
      this.rest.navCtrl.navigateForward('/profile/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    let item = this.rest.his.list[this.rest.id]
    let detail = item.detail[item.detail.length - 1]

    this.rest.temp = {
      filter: this.rest.his.filter,
      id: item.id,
      name: item.customer,
      phone: item.phone,
      address: item.address,
      petname: item.petname,
      weight: item.weight,
      age: item.age,
      gender: item.gender,
      species: item.species,
      disease: item.disease,
      near: this.time.datetoisodate(item.sc),
      conclude: detail.conclude,
      subother: detail.subother,
      temperate: detail.temperate,
      other: detail.other,
      treat: detail.treat,
      keyword: this.rest.his.keyword,
      status: Number(item.status),
      time: this.time.datetoisodate(this.rest.home.today),
      image: [],
      pos: item.pos,
      xquang: 0,
      sinhly: 0,
      sinhhoa: 0,
      sieuam: 0,
      nuoctieu: 0,
      exam: []
    }
    
    this.rest.navCtrl.navigateForward('/his/insert')
  }

  public async insertHis() {
    const alert = await this.alert.create({
      message: 'Thêm tiền sử bệnh',
      inputs: [{
        name: 'his',
        label: 'Tiền sử',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertHisSubmit(e.his)
          }
        }
      ]
    });

    await alert.present();
  }

  public muchChat(number: string) {
    if (Number(number) > 99) return "99+"
    return number
  }

  public async insertHisSubmit(his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his', 'add', {
      petid: this.rest.his.list[this.rest.temp.i].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[this.rest.temp.i].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail2(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }

  public totime(time: number) {
    return this.time.timetodates(time * 1000)
  }

  // public async reload(event: any) {
  //   await this.auto()
  //   event.target.complete()
  // }

  // public async auto() {
  //   await this.rest.freeze('Đang tải dữ liệu......')
  //   setTimeout(() => {
  //     this.rest.checkpost('his', 'getchat', {
  //       id: this.rest.his.list[this.rest.id].id,
  //     }).then((resp) => {
  //       this.rest.defreeze()
  //       this.init = true
  //       this.list = resp.list
  //     }, () => {
  //       this.rest.defreeze()
  //     })
  //   }, 1000);
  // }

  public async xacnhanxoachitiet(index: number) {
    const alert = await this.alert.create({
      message: 'Sau khi xóa chi tiết sẽ biến mất vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xoachitiet(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xoachitiet(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'xoachitiet', {
      id: this.rest.his.list[index].id,
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
      this.recount()
      this.rest.badge.init = false
    }, () => {
      this.rest.defreeze()
    })
  }

  public recount() {
    let count = 0
    let treat = [0, 0]
    let pose = [0, 0]

    this.rest.his.list.forEach(item => {
      treat[item.pos]++
      if (item.sc.length) {
        count++
        pose[item.pos]++
      }
    })
    this.rest.his.count = count
    this.rest.his.treat = treat
    this.rest.his.pose = pose
  }

  public async post() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'postchat', {
      id: this.rest.his.list[this.rest.id].id,
      text: this.text
    }).then((resp) => {
      this.rest.defreeze()
      this.list = resp.list
      this.content.scrollToBottom(300);
      this.text = ''
    }, () => {
      this.rest.defreeze()
    })
  }
}
