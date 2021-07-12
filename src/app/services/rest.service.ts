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
    today: '',
    next: '',
    module: {
      work: 0, kaizen: 0, schedule: 0, vaccine: 0,
      spa: 0, expire: 0, blood: 0, usg: 0,
      drug: 0, target: 0, profile: 0
    }
  }
  public data: any = {
    work: [], kaizen: [], schedule: [], vaccine: [],
    spa: [], expire: [], blood: [], usg: [],
    drug: [], target: [], profile: []
  }
  public filter: any = {
    work: {}, kaizen: {}, schedule: {}, vaccine: {},
    spa: {}, expire: {}, blood: {}, usg: {},
    drug: {}, target: {}, profile: {}
  }
  public action: string = ''
  public temp: any = {}
  public toast: any
  public load: any = []
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
      if (session && session.length) this.session(session)
      else {
        this.logout()
        this.defreeze()
      }
    })
  }

  public async session(session: string) {
    this.checkpost('user', 'session', {
      sess: session
    }).then(resp => {
      this.config = resp.config
      this.storage.set('session', this.config.session)
      if (this.router.url == '/login') this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      this.defreeze()
    }, () => {
      this.logout()
      this.defreeze()
    })
  }

  public login(username: string, password: string) {
    if (!username || !username.length) this.notify('Tên tài khoản trống')
    else if (!password || !password.length) this.notify('Mật khẩu trống')
    else this.checkpost('user', 'login', {
      username: username,
      password: password,
    }).then(resp => {
      this.config = resp.config
      this.storage.set('session', resp.config.session)
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

  public async freeze(text: string = 'connecting to server') {
    let loading = await this.loadCtrl.create({
      message: text
    })
    this.load.push(loading)
    await loading.present()
  }

  public defreeze() {
    this.load[this.load.length - 1].dismiss()
    this.load.pop()
  }

  public async notify(text: string, duration: number = 1000) {
    this.toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    })
    this.toast.present()
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
}
