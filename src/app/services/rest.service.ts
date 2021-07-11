import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage'; 
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public baseurl: string = 'http://localhost/server/index.php?';
  // public baseurl: string = '/server/index.php?';
  // public baseurl: string = 'https://daklak.thanhxuanpet.com/server/index.php?';
  // public baseurl: string = 'http://test.petcoffee.info/server/index.php?';
  public config = {
    userid: 0,
    admin: 0,
    session: '',
    users: [],
    module: {
      work: 0, kaizen: 0, schedule: 0, vaccine: 0,
      spa: 0, expire: 0, blood: 0, usg: 0,
      drug: 0, target: 0, profile: 0
    },
  }
  public list = {
    work: [], kaizen: [], schedule: [], vaccine: [],
    spa: [], expire: [], blood: [], usg: [],
    drug: [], target: [], profile: []
  }
  public filter = {
    work: {}, kaizen: {}, schedule: {}, vaccine: {},
    spa: {}, expire: {}, blood: {}, usg: {},
    drug: {}, target: {}, profile: {}
  }
  public temp: any = {}
  toast: any
  load: any
  public today: string = ''
  public error: string = ''
  public link: string = ''
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public router: Router,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public navCtrl: NavController
  ) { 
    this.init()
  } 

  public async init() {
    await this.freeze('Kiểm tra thông tin người dùng...')
    await this.storage.create()
    this.storage.get('session').then(session => {
      this.defreeze()
      this.session(session)
    })
  }

  public async freeze(text: string = 'connecting to server') {
    // console.log(this.load);
    let loading = await this.loadCtrl.create({
      message: text
    })
    this.load = loading
    await this.load.present()
  }

  public defreeze() {
    this.load.dismiss()
  }

  public checkpost(type: string, action: string, param: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      param['type'] = type
      param['action'] = action
      param['session'] = this.config.session
      this.http.post(this.baseurl, JSON.stringify(param)).toPromise().then((data) => {
        if (data['overtime']) {
          this.notify("Đã hết thời gian sử dụng")
          this.router.navigateByUrl('/home')
          reject(data)
        }
        else if (data['no_branch']) {
          this.notify("Tài khoản không có trong chi nhánh")
          this.router.navigateByUrl('/')
          reject(data)
        }
        else {
          if (data['messenger']) this.notify(data['messenger'])
          if (data['status']) resolve(data)
          else {
            reject(data)
          }
        }
      }, (error) => {
        if (error['messenger']) this.notify(error['messenger'])
        else this.notify('Có lỗi xảy ra >.<')
        reject(1)
      })
    })
  }

  public async session(session: string) {
    if (session && session.length) {
      this.checkpost('user', 'session', {
        sess: session
      }).then(resp => {
        this.config = resp.config
        this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
        this.defreeze()
      }, () => {
        this.navCtrl.navigateRoot('/login')
        this.storage.remove('session')
        this.defreeze()
      })
    }
  }

  // kiểm tra trạng thái đăng nhập, nếu không, chuyển về trang đăng nhập
  // kim: đặt giới hạn thời gian, kiểm tra session trên web 
  // đăng nhập kiểm tra dữ liệu từ userlist, nếu khớp, chuyển đến tổng quan, thông báo
  // kim: kiểm tra dữ liệu từ server
  public login(username: string, password: string) {
    if (!username || !username.length) this.notify('Tên tài khoản trống')
    else if (!password ||!password.length) this.notify('Mật khẩu trống')
    else this.checkpost('user', 'login', {
      username: username,
      password: password,
    }).then(resp => {
      this.config = resp.config
      this.storage.set('session', resp.config.session)
      console.log(resp.config);
      this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      this.defreeze()
    }, () => {
      this.defreeze()
    })
  }

  public logout() {
    this.storage.remove('session')
    this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' })
  }

  public timetodate(time: number) {
    let datetime = new Date(Number(time))
    let date = datetime.getDate().toString()
    date = (Number(date) < 10 ? '0' + date : date)
    let month = (datetime.getMonth() + 1).toString()
    month = (Number(month) < 10 ? '0' + month : month)
    let year = datetime.getFullYear()
    return date + '/' + month + '/' + year
  }

  public timetoisodate(time: number) {
    return this.datetoisodate(this.timetodate(time))
  }

  public isodatetotime(time: string) {
    let datetime = time.split("T")[0].split('-')
    if (datetime.length === 3) return (new Date(Number(datetime[0]), Number(datetime[1]) - 1, Number(datetime[2]))).getTime()
    return 0
  }

  public isodatetodate(time: string) {
    let datetime = time.split("T")[0].split('-')
    
    return datetime[2] + '/' + datetime[1] + '/' + datetime[0]
  }

  public datetotime(date: string) {
    let datestring = date.split("/")
    let datetime = new Date(Number(datestring['2']), Number(datestring['1']) - 1, Number(datestring[0]))
    return datetime.getTime()
  }

  public datetoisodate(date: string) {
    let datestring = date.split("/")
    return datestring['2'] +'-'+ datestring['1'] + '-'+ datestring[0] + 'T00:00:00.000Z'
  }

  public async notify(text: string, duration: number = 1000) {
    this.toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    })
    this.toast.present()
  }
}
