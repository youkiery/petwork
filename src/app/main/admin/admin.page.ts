import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  public switch = ['on', 'off']
  public list = [
    { name: 'Lịch spa', module: 'spa' },
    { name: 'Khách sạn', module: 'hotel' },
    { name: 'Quản lý nhắc gọi', module: 'vaccine' },
    { name: 'Quản lý Nhắn tin', module: 'nhantin' },
    { name: 'Đăng ký lịch', module: 'schedule' },
    { name: 'Báo lịch bận', module: 'lichban' },
    { name: 'Thống kê chấm công', module: 'thongkenghi' },
    { name: 'Quản lý hàng hóa', module: 'item' },
    { name: 'Kaizen', module: 'kaizen' },
    { name: 'Tra cứu thuốc', module: 'drug' },
    { name: 'Tài liệu chuyên môn', module: 'tailieu' },
    { name: 'Giá sỉ', module: 'price' },
    { name: 'Quản lý xe', module: 'ride' },
    { name: 'Quản lý sinh hóa', module: 'profile' },
    { name: 'Quản lý sinh lý', module: 'physical' },
    { name: 'Quản lý bệnh nhân', module: 'his' },
    { name: 'Quản lý siêu âm', module: 'sieuam' },
    { name: 'Quản lý x quang', module: 'xquang' },
    { name: 'Quản lý xét nghiệm khác', module: 'other' },
    { name: 'Quản lý nhà xe', module: 'transport' },
    // {name: 'Quản lý lương', module: 'luong'},
    { name: 'Quản lý kế toán', module: 'accounting' },
    { name: 'Quản lý vật tư', module: 'vattu' },
    { name: 'Quản lý thiết bị', module: 'thietbi' },
    { name: 'Quản lý tài chính', module: 'taichinh' },
    { name: 'Quản lý tính lương', module: 'loinhuan' },
    { name: 'Danh sách đặt lịch', module: 'datlich' },
    { name: 'Danh sách đánh giá', module: 'danhgia' },
    { name: 'Quản lý tin tức', module: 'tintuc' },
    { name: 'Cài đặt', module: 'excel' },
    { name: 'Quản lý công việc', module: 'work'},
  ]
  public level = ['l0', 'l1', 'l2']
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  public async ionViewWillEnter() {
    this.rest.action = 'admin'
    if (!this.rest.admin.init) {
      this.init()
    }
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'auto', {
      action: 'admin-user',
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.init = true
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public selectplace(id: number) {
    this.rest.id = id
    this.rest.navCtrl.navigateForward('/admin/place')
  }

  public async refresh(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'auto', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async toggle(userid: number, per: string = 'doctor') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'toggle', {
      userid: userid,
      per: per
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async change(userid: number, per: string = 'doctor') {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'change', {
      userid: userid,
      per: per
    }).then(resp => {
      this.rest.defreeze()
      this.rest.config = resp.config
      this.rest.admin.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  // public async toggleManager(userid: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('admin', 'manager', {
  //     userid: userid,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.config = resp.config
  //     this.rest.admin.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  // public async toggleAdmin(userid: number) {
  //   await this.rest.freeze('Đang tải dữ liệu...')
  //   this.rest.checkpost('admin', 'admin', {
  //     userid: userid,
  //   }).then(resp => {
  //     this.rest.defreeze()
  //     this.rest.config = resp.config
  //     this.rest.admin.list = resp.list
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  public isNumber(number: number) {
    return Number(number)
  }

  public async remove(userid: number) {
    this.rest.temp = {
      nhanvienxoa: userid,
      nhanvienchuyen: this.rest.home.doctor[0].userid
    }
    this.rest.navCtrl.navigateForward('/admin/chuyeninfo')
    // await this.rest.freeze('Đang tải dữ liệu...')
    // this.rest.checkpost('admin', 'remove', {
    //   userid: userid
    // }).then(resp => {
    //   this.rest.defreeze()
    //   this.rest.admin.list = resp.list
    //   this.rest.notify('Đã xóa nhân viên')
    // }, () => {
    //   this.rest.defreeze()
    // })
  }

  public async update(i: number) {
    this.rest.temp = {
      userid: this.rest.admin.list[i].userid,
      fullname: this.rest.admin.list[i].fullname,
      username: this.rest.admin.list[i].username,
      idvantay: this.rest.admin.list[i].idvantay,
      birthday: this.rest.admin.list[i].birthday,
      image: this.rest.admin.list[i].photo,
      opassword: '',
      password: '',
      vpassword: '',
    }
    this.rest.navCtrl.navigateForward('/admin/insert')
  }

  public insert() {
    this.rest.temp = {
      id: 0,
      fullname: '',
      username: '',
      birthday: this.time.datetoisodate(this.rest.home.today),
      idvantay: '0',
      image: '',
      password: '',
      vpassword: '',
    }
    this.rest.navCtrl.navigateForward('/admin/insert')
  }

  public async detail(index: number) {
    this.rest.temp = {
      index: index,
      name: this.rest.admin.list[index].name,
      fullname: this.rest.admin.list[index].fullname,
    }
    this.rest.action = 'admin'
    this.rest.navCtrl.navigateForward('/modal/detail')
  }
}
