import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage {
  public trangthai = [
    '/assets/icon/untick.png',
    '/assets/icon/underreview.png',
    '/assets/icon/tick.png',
  ]
  public chuyentrangthai = [
    'Chuyển công việc sang mục kiểm tra',
    'Chuyển công việc sang hoàn thành',
  ]
  public tabs = ['Chưa hoàn thành', 'Hoàn thành']
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }


  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'work'
      if (!this.rest.work.khoitao[this.rest.work.chedo]) {
        this.khoitao()
      }
    })
  }

  public async timkiem() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'danhsach', {
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter
    }).then(resp => {
    this.rest.defreeze()
      this.rest.work.khoitao = [false, false]
      this.rest.work.khoitao[this.rest.work.chedo] = true
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'khoitao', { 
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter
    }).then(resp => {
    this.rest.defreeze()
      this.rest.work.khoitao[this.rest.work.chedo] = true
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
      this.rest.work.danhmuc = resp.danhmuc
      this.rest.work.nhanvien = resp.nhanvien
    }, () => {
      this.rest.defreeze()
    })
  }

  public async doidanhsach(chedo: number) {
    if (!this.rest.work.khoitao[chedo]) {
      await this.rest.freeze('Đang tải dữ liệu...')
      this.rest.checkpost('work', 'danhsach', { 
        chedo: chedo,
        filter: this.rest.work.filter
      }).then(resp => {
        this.rest.defreeze()
        this.rest.work.khoitao[chedo] = true
        this.rest.work.danhsach[chedo] = resp.danhsach
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public themcongvieclaplai(laplai: boolean = true) {
    let list = []
    this.rest.work.nhanvien.forEach((nhanvien: any) => {
      list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })
    this.rest.temp = {
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
      title: '',
      content: '',
      departid: 0,
      image: [],
      create: this.time.datetoisodate(this.rest.home.today),
      expire: '',
      follow: {
        text: '',
        list: list
      },
      assign: {
        text: '',
        list: JSON.parse(JSON.stringify(list))
      },
    }
    if (laplai) {
      this.rest.temp.repeat = {
        type: '1',
        time: this.time.datetoisodate(this.rest.home.today),
        list: [1, 0, 0, 0, 0, 0, 0]
      }
      this.rest.temp.laplai = true
    }

    this.rest.navCtrl.navigateForward('/work/insert')
  }

  public async capnhat(ti: number, i: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let congviec = this.rest.work.danhsach[this.rest.work.chedo][ti][i]
    
    this.rest.checkpost('work', 'laythongtin', {
      id: congviec.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      delete this.rest.temp.repeat
      this.rest.temp.chedo = this.rest.work.chedo,
      this.rest.temp.filter = this.rest.work.filter,
      this.rest.navCtrl.navigateForward('/work/insert')
    }, () => {
      this.rest.defreeze()
    })
  }

  public chitiet(ti: number, i: number) {
    this.rest.detail = this.rest.work.danhsach[this.rest.work.chedo][ti][i]
    this.rest.navCtrl.navigateForward('/work/detail')
  }

  public async xacnhan(ti: number, i: number) {
    let congviec = this.rest.work.danhsach[this.rest.work.chedo][ti][i]
    // kiểm tra nhân viên có quyền không
    // quyền xác định bằng chủ danh mục, người tạo
    if (congviec.status > 1) return 0
    else if (congviec.type == 0) {
      this.rest.notify('Nhân viên không có quyền xác nhận')
    }
    else if (congviec.type == 1 && congviec.status > 0) {
      this.rest.notify('Chỉ quản lý mới có quyền xác nhận')
    }
    else {
      let alert = await this.alert.create({
        message: this.chuyentrangthai[congviec.status],
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
          }, {
            text: 'Xác nhận',
            handler: (e) => {
              this.xacnhanSubmit(congviec.id, congviec.status)
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  public async xacnhanSubmit(id: number, status: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'chuyentrangthai', {
      id: id,
      status: status,
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xoa(id: number) {
    let alert = await this.alert.create({
      message: 'Xác nhận xóa công việc',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.xacnhanxoa(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'xoa', {
      id: id,
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('work', 'danhsach', { 
      chedo: this.rest.work.chedo,
      filter: this.rest.work.filter,
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.work.khoitao[this.rest.work.chedo] = true
      this.rest.work.danhsach[this.rest.work.chedo] = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }
}
