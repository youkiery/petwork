import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-his',
  templateUrl: './his.page.html',
  styleUrls: ['./his.page.scss'],
})
export class HisPage {
  public insult = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public insult_text = {
    0: 'Đang điều trị',
    1: 'Đã ra viện',
    2: 'Đã chết'
  }
  public pay_class = ['pos red', 'pos yellow', 'pos']
  public segment = '0'
  public s = '0'
  public nstatus = {
    0: 'stl-card yellow',
    1: 'stl-card blue'
  }
  public scstatus = {
    0: 'pos yellow',
    1: 'pos blue'
  }
  public sctext = {
    0: 'chưa đến',
    1: 'đã đến'
  }
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public rev = {
    0: '1',
    1: '0'
  }
  public revtype = {
    xquang: 'xquang',
    sieuam: 'sieuam',
    sinhly: 'physical',
    sinhhoa: 'profile'
  }
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }


  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.his.init) {
        this.rest.his.filter = {
          docs: this.rest.home.default.docs,
          docscover: this.rest.home.default.docscover,
          keyword: '',
          diseaseid: '',
          start: this.rest.home.month.start,
          end: this.rest.home.month.end,    
        }
        this.rest.action = 'his'
        this.filter()
      }
    })
  }

  public async schedule(index: number) {
    let item = this.rest.his.list[index]
    this.rest.temp = {
      id: item.id,
      name: item.customer,
      phone: item.phone,
      address: item.address,
      note: '',
      image: [],
      time: this.time.timetoisodate(this.time.datetotime(this.rest.home.today) + 60 * 60 * 24 * 3 * 1000),
      filter: this.rest.his.filter
    }
    this.rest.navCtrl.navigateForward('/his/schedule')
  }

  public add(i: number) {
    let item = this.rest.his.list[i]
    let detail = item.detail[item.detail.length - 1]

    this.rest.temp = {
      filter: this.rest.his.filter,
      id: item.id,
      detailid: 0,
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
      conclude: (detail.conclude ? detail.conclude : ''),
      eye: (detail.eye ? detail.eye : ''),
      temperate: (detail.temperate ? detail.temperate : ''),
      other: (detail.other ? detail.other : ''),
      subother: (detail.subother ? detail.subother : ''),
      treat: (detail.treat ? detail.treat : ''),
      status: Number(detail.status ? detail.status : 0),
      image: (detail.image ? detail.image : []),
      time: this.time.datetoisodate(this.rest.home.today),
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

  public async move(id: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận chuyển nơi lưu bệnh?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.moveSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async moveSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'move', {
      id: id,
      pos: this.rest.his.segment,
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.segment = this.rev[this.rest.his.segment]
      this.rest.his.list = resp.list
      this.recount()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('his', 'filter', {
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.init = true
      this.rest.his.type = resp.type
      this.rest.his.disease = resp.disease
      this.rest.his.list = resp.list
      this.rest.his.search = false
      this.recount()
    }, () => {
      this.rest.defreeze()
    })
  }

  public statistic() {
    this.rest.navCtrl.navigateForward('/his/statis')
  }

  public async insertHis(index: number) {
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
            this.insertHisSubmit(index, e.his)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertHisSubmit(index: number, his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his', 'add', {
      petid: this.rest.his.list[index].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[index].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận lưu bệnh đã chết',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'dead', {
      id: this.rest.his.list[index].id,
    }).then((resp) => {
      this.rest.his.list[index].insult = resp.insult
      this.rest.badge.init = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async return(index: number) {
    const alert = await this.alert.create({
      message: 'Xác nhận lưu bệnh xuất viện',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.returnSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async returnSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'returned', {
      id: this.rest.his.list[index].id,
    }).then((resp) => {
      this.rest.his.list[index].insult = resp.insult
      this.rest.badge.init = false
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      message: 'Sau khi xóa hồ sơ sẽ biến mất vĩnh viễn',
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

  public async removeSubmit(index: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'remove', {
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

  public async print(index: number) {
    let id = this.rest.his.list[index].detail[this.rest.his.list[index].detail.length - 1].id
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

  public viewall(i: number, images: string[]) {
    this.rest.image = {
      index: i,
      image: images
    }
    this.rest.navCtrl.navigateForward('/his/images')
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

  public detail(i: number) {
    this.rest.id = i
    this.rest.detail = this.rest.his.list[i]
    this.rest.detail.chat = this.rest.his.list[i].chat
    this.rest.detail.hisid = this.rest.his.list[i].id
    this.rest.navCtrl.navigateForward('/his/detail')
  }

  public chat(i: number) {
    this.rest.temp = {
      id: this.rest.his.list[i].id
    }

    this.rest.id = i
    this.rest.detail = this.rest.his.list[i]
    this.rest.detail.chat = this.rest.his.list[i].chat
    this.rest.detail.hisid = this.rest.his.list[i].id
    setTimeout(() => {
      this.rest.navCtrl.navigateForward('/his/chat')
    }, 500);
    this.rest.navCtrl.navigateForward('/his/detail')
  }

  public update(i: number) {
    let item = this.rest.his.list[i]
    this.rest.id = i
    let detail = item.detail[item.detail.length - 1]

    this.rest.temp = {
      filter: this.rest.his.filter,
      id: item.id,
      detailid: detail.id,
      near: this.time.datetoisodate(item.sc),
      name: item.customer,
      phone: item.phone,
      address: item.address,
      disease: item.disease,
      petname: item.petname,
      weight: item.weight,
      age: item.age,
      gender: item.gender,
      species: item.species,
      petid: item.petid,
      conclude: detail.conclude,
      temperate: detail.temperate,
      other: detail.other,
      subother: detail.subother,
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

  public view(type: string, id: number, status = 0, xrayid = 0, detailid = 0) {
    if (id <= 0) {
      switch (type) {
        case 'xquang':
        case 'sinhly':
        case 'sinhhoa':
        case 'sieuam':
          this.denthemxetnghiem(type, xrayid, detailid)
          break;
        case 'nuoctieu':

          break;
        case 'exam':
          if (status) this.goexam(id)
          break;
      }
      return 0
    }
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
        if (status) this.goexam(id)
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

  public async denthemxetnghiem(type: string, xrayid: number, id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    type = this.revtype[type]
    this.rest.checkpost('his', 'getinfo', {
      typed: type,
      xrayid: xrayid,
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = resp.data
      this.rest.navCtrl.navigateForward('/'+ type +'/insert')
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
    this.rest.temp = {
      filter: this.rest.his.filter,
      disease: {
        text: '', list: {}
      },
      time: this.time.datetoisodate(this.rest.home.today),
      near: '',
      name: '',
      phone: '',
      address: '',
      petname: '',
      weight: '',
      age: '',
      gender: '0',
      species: '',
      conclude: '',
      temperate: '',
      other: '',
      subother: '',
      treat: '',
      status: 0,
      image: [],
      pos: this.rest.his.segment,
      xquang: 0,
      sinhly: 0,
      sinhhoa: 0,
      sieuam: 0,
      nuoctieu: 0,
      exam: []
    }
    this.rest.navCtrl.navigateForward('/his/insert')
  }

  public async rate(id: number, point: number = 0) {
    if (this.rest.config.spa > 1) {
      let alert = await this.alert.create({
        message: 'Đánh giá ' + point + ' sao cho nhân viên?',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.rateSubmit(id, point)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async rateSubmit(id: number, point: number = 0) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'statrate', {
      id: id,
      rate: point,
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async changesc(index: number) {
    if (this.rest.config.spa > 1) {
      let alert = await this.alert.create({
        message: 'Xác nhận tái khám',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: () => {
              this.changeSubmit(index)
            }
          }
        ]
      });
      await alert.present();
    }
  }

  public async changeSubmit(i: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'changesc', {
      id: this.rest.his.list[i].id,
      status: this.rest.his.list[i].scstatus,
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
      this.recount()
    }, () => {
      this.rest.defreeze()
    })
  }

  public cleardocs() {
    this.rest.his.filter.docs = []
    this.rest.his.filter.docscover = ''
    this.filter()
  }

  public async docs() {
    let option = []
    this.rest.home.doctor.forEach((item, index) => {
      option.push({
        name: 'check',
        type: 'checkbox',
        label: item.name,
        value: index,
        checked: (this.rest.his.filter.docs.indexOf(item.userid) >= 0 ? true : false)
      })
    })
    const alert = await this.alert.create({
      header: 'Lọc nhân viên',
      inputs: option,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (e) => {
            let cover = []
            let docs = []
            e.forEach((index: number) => {
              cover.push(this.rest.home.doctor[index].name)
              docs.push(this.rest.home.doctor[index].userid)
            });

            this.rest.his.filter.docs = docs
            this.rest.his.filter.docscover = cover.join(', ')
            this.filter()
          }
        }
      ]
    });

    await alert.present();
  }

  public async hopital(id: number) {
    let alert = await this.alert.create({
      message: 'Hồ sơ sẽ chuyển sang lưu bệnh, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.hopitalSubmit(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async hopitalSubmit(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'hopital', {
      id: id,
      filter: this.rest.his.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
      this.recount()
    }, () => {
      this.rest.defreeze()
    })
  }

  public isNumber(number: number) {
    return Number(number)
  }

  public async toggleShare(id: number, share: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'share', {
      id: id,
      share: share,
      filter: this.rest.his.filter,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.his.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
