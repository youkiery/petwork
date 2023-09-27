import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-xetnghiem',
  templateUrl: './xetnghiem.page.html',
  styleUrls: ['./xetnghiem.page.scss'],
})
export class XetnghiemPage implements OnInit {
  public xetnghiem = ["Sinh lý", "Sinh hoá"]
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit(): void { }

  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'xetnghiem'
      if (!this.rest.xetnghiem.khoitao) {
        this.rest.xetnghiem.timkiem.batdau = this.time.timetoisodate(this.time.datetotime(this.rest.home.today) - 60 * 60 * 24 * 5 * 1000)
        this.rest.xetnghiem.timkiem.ketthuc = this.time.datetoisodate(this.rest.home.today)
        this.khoitao()
      }
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'khoitaoxetnghiem', {
      timkiem: this.rest.xetnghiem.timkiem,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.xetnghiem.khoitao = true
      this.rest.xetnghiem.danhsach = resp.danhsach
      // this.rest.xetnghiem.danhsachcan = resp.danhsachcan
      this.rest.xetnghiem.dulieuchitieu = resp.dulieuchitieu
      this.rest.xetnghiem.danhsachchitieu = resp.danhsachchitieu
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'khoitaoxetnghiem', {
      timkiem: this.rest.xetnghiem.timkiem,
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.xetnghiem.khoitao = true
      this.rest.xetnghiem.danhsach = resp.danhsach
      // this.rest.xetnghiem.danhsachcan = resp.danhsachcan
      this.rest.xetnghiem.dulieuchitieu = resp.dulieuchitieu
      this.rest.xetnghiem.danhsachchitieu = resp.danhsachchitieu
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public info(index: number) {
    this.rest.temp = this.rest.xetnghiem.danhsachchitieu[index]
    this.rest.navCtrl.navigateForward('/xetnghiem/chitiet')
  }

  public capnhatchitieu(index: number) {
    this.rest.temp.act = 'target'
    this.rest.temp = this.rest.xetnghiem.danhsachchitieu[index]
    this.rest.navCtrl.navigateForward('/xetnghiem/them')
  }

  public async themchitieu() {
    if (this.rest.config.xetnghiem < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.temp = {
        id: 0,
        name: '',
        intro: '',
        unit: '',
        flag: '0 - 1',
        up: '',
        down: '',
        disease: '',
        aim: ''
      }
      this.rest.navCtrl.navigateForward('/xetnghiem/them')
    }
  }

  // public async removeTarget(i: number) {
  //   if (this.rest.config.xetnghiem < 2) this.rest.notify('Chưa cấp quyền truy cập')
  //   else {
  //     const alert = await this.alert.create({
  //       header: 'Xóa chỉ tiêu',
  //       message: 'Sau khi xác nhận, chỉ tiêu sẽ bị xóa',
  //       buttons: [
  //         {
  //           text: 'Trở về',
  //           role: 'cancel',
  //           cssClass: 'default'
  //         }, {
  //           text: 'Xác nhận',
  //           cssClass: 'danger',
  //           handler: () => {
  //             this.removeTargetSubmit(i)
  //           }
  //         }
  //       ]
  //     });

  //     await alert.present();
  //   }
  // }

  // public async removeTargetSubmit(i: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('target', 'remove', {
  //     id: this.rest.xetnghiem.target[i].id,
  //     key: this.rest.xetnghiem.key2
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.notify('Đã xóa chỉ tiêu')
  //     this.rest.xetnghiem.target = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async reset(index: number) {
  //   const alert = await this.alert.create({
  //     header: 'Cài lại chỉ tiêu',
  //     message: 'Sau khi xác nhận, chỉ tiêu bằng 0',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //         cssClass: 'default'
  //       }, {
  //         text: 'Xác nhận',
  //         handler: () => {
  //           this.resetSubmit(index)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async resetSubmit(index: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('target', 'res', {
  //     id: this.rest.xetnghiem.target[index].id,
  //     filter: this.rest.xetnghiem.timkiem,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.xetnghiem.target[index].number = 0
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async print(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('xetnghiem', 'printword', {
  //     id: id
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     let html = resp.html
  //     let winPrint = window.open();
  //     winPrint.focus()
  //     winPrint.document.write(html);
  //     setTimeout(() => {
  //       winPrint.print()
  //       winPrint.close()
  //     }, 300)
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async remove(id: number) {
  //   const alert = await this.alert.create({
  //     header: 'Chú ý!!!',
  //     message: 'Hồ sơ sẽ bị xóa vĩnh viễn',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: () => {
  //           this.removeSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('xetnghiem', 'remove', {
  //     id: id,
  //     filter: this.rest.xetnghiem.timkiem,
  //     module: this.rest.action
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.xetnghiem.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async xetnghiem(i: number) {
  //   let item = this.rest.xetnghiem.danhsachcan[i]
  //   this.rest.temp = {
  //     act: 'xetnghiem',
  //     xrayid: item.id,
  //     name: item.name,
  //     phone: item.phone,
  //     address: item.address,
  //     petname: item.petname,
  //     weight: item.weight,
  //     age: item.age,
  //     gender: item.gender,
  //     species: item.species,
  //     samplestatus: '1',
  //     symptom: '',
  //     doctor: this.rest.home.userid,
  //     filter: this.rest.xetnghiem.timkiem,
  //     image: []
  //   }
  //   this.rest.navCtrl.navigateForward('/xetnghiem/insert')
  // }

  // public async insert() {
  //   this.rest.temp = {
  //     act: 'xetnghiem',
  //     name: '',
  //     phone: '',
  //     address: '',
  //     petname: '',
  //     weight: '',
  //     age: '1',
  //     gender: '0',
  //     species: '',
  //     serial: this.rest.xetnghiem.serial,
  //     sampletype: (this.rest.xetnghiem.sampletype.length ? this.rest.xetnghiem.sampletype[0].id : '0'),
  //     samplenumber: 1,
  //     samplesymbol: this.rest.xetnghiem.serial,
  //     samplestatus: '1',
  //     symptom: '',
  //     doctor: this.rest.home.userid,
  //     target: this.temptarget(),
  //     filter: this.rest.xetnghiem.timkiem,
  //     image: []
  //   }
  //   this.rest.navCtrl.navigateForward('/xetnghiem/insert')
  // }

  // public async updatexetnghiem(i: number) {
  //   let item = this.rest.xetnghiem.list[i]
  //   this.rest.temp = {
  //     act: 'xetnghiem',
  //     id: item.id,
  //     name: item.customer,
  //     phone: item.phone,
  //     address: item.address,
  //     petname: item.name,
  //     weight: item.weight,
  //     age: item.age,
  //     gender: item.gender,
  //     species: item.species,
  //     serial: item.serial,
  //     sampletype: item.sampletype,
  //     samplenumber: item.samplenumber,
  //     samplesymbol: item.samplesymbol,
  //     samplestatus: item.samplestatus,
  //     symptom: item.symptom,
  //     target: item.target,
  //     module: this.rest.action,
  //     doctor: item.doctorid,
  //     filter: this.rest.xetnghiem.timkiem,
  //     image: item.image
  //   }
  //   this.rest.navCtrl.navigateForward('/xetnghiem/insert')
  // }

  // public temptarget() {
  //   let target = {}
  //   this.rest.xetnghiem.target.forEach(item => {
  //     target[item.id] = ''
  //   })
  //   return target
  // }

  public async chitietxetnghiem(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('xetnghiem', 'printword', {
      id: id
    }).then(resp => {
      this.rest.defreeze()
      this.rest.temp = {
        id: id,
        tailieu: resp.html
      }
      this.rest.navCtrl.navigateForward('/xetnghiem/print')
    }, () => {
      this.rest.defreeze()
    })
  }

  // public async removeneed(id: number) {
  //   const alert = await this.alert.create({
  //     header: 'Xác nhận xóa yêu cầu xét nghiệm',
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: () => {
  //           this.removeneedSubmit(id)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async removeneedSubmit(id: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('xetnghiem', 'removeneed', {
  //     id: id,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.xetnghiem.need = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }
}
