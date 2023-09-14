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
  public hoanthanh = ['Chưa hoàn thành', 'Đã hoàn thành', 'Toàn bộ']
  public denhan = ['Toàn bộ', 'Gần hạn', 'Quá hạn']
  public rev = [1, 2, 0]
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }


  async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'congviec'
      if (!this.rest.congviec.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'khoitao', { 
      timkiem: this.rest.congviec.timkiem
    }).then(resp => {
    this.rest.defreeze()
      this.rest.congviec.khoitao = true
      this.rest.congviec.danhsach = resp.danhsach
      this.rest.congviec.danhmuc = resp.danhmuc
      this.rest.congviec.nhanvien = resp.nhanvien
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('congviec', 'khoitao', { 
      timkiem: this.rest.congviec.timkiem
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.congviec.khoitao = true
      this.rest.congviec.danhsach = resp.danhsach
      this.rest.congviec.danhmuc = resp.danhmuc
      this.rest.congviec.nhanvien = resp.nhanvien
    }, () => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public themcongvieclaplai(laplai: boolean = true) {
    let list = []
    this.rest.congviec.nhanvien.forEach((nhanvien: any) => {
      list.push({ value: false, userid: nhanvien.userid, name: nhanvien.fullname })
    })
    this.rest.temp = {
      chedo: this.rest.congviec.chedo,
      timkiem: this.rest.congviec.timkiem,
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

  public async capnhat(i: number = -1, j: number = -1, g: number = -1) {
    await this.rest.freeze('Đang tải dữ liệu...')
    let congviec: any = {}
    if (g >= 0) congviec = this.rest.congviec.danhsach[i].child[j].danhsach[g]
    else congviec = this.rest.congviec.danhsach[i].danhsach[j]
    
    this.rest.checkpost('congviec', 'laythongtin', {
      id: congviec.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.temp = resp.dulieu
      delete this.rest.temp.repeat
      this.rest.temp.timkiem = this.rest.congviec.timkiem
      this.rest.navCtrl.navigateForward('/work/insert')
    }, () => {
      this.rest.defreeze()
    })
  }

  public chitiet(i: number = -1, j: number = -1, g: number = -1) {
    let congviec: any = {}
    if (g >= 0) congviec = this.rest.congviec.danhsach[i].child[j].danhsach[g]
    else congviec = this.rest.congviec.danhsach[i].danhsach[j]
    this.rest.detail = congviec
    this.rest.navCtrl.navigateForward('/work/detail')
  }

  public async xacnhan(i: number = -1, j: number = -1, g: number = -1) {
    let congviec: any = {}
    if (g >= 0) congviec = this.rest.congviec.danhsach[i].child[j].danhsach[g]
    else congviec = this.rest.congviec.danhsach[i].danhsach[j]
    
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
    this.rest.checkpost('congviec', 'chuyentrangthai', {
      id: id,
      status: status,
      timkiem: this.rest.congviec.timkiem,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.congviec.danhsach = resp.danhsach
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
    this.rest.checkpost('congviec', 'xoa', {
      id: id,
      timkiem: this.rest.congviec.timkiem,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.congviec.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}
