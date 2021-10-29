import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public baseurl: string = 'http://localhost/server/index.php?';
  // public baseurl: string = '/server/index.php?';
  // public baseurl: string = 'https://daklak.thanhxuanpet.com/server/index.php?';
  // public baseurl: string = 'https://app.petcoffee.work/server/index.php?';
  public config: any
  public home = {
    notify: 0,
    name: '',
    userid: 0,
    username: '',
    fullname: '',
    admin: 0,
    users: [],
    doctor: [],
    type: [],
    spa: [],
    today: '',
    next: '',
    usg: {c: 0, t: 0},
    usgcode: [],
    vaccine: {c: 0, t: 0},
    default: {
      spa: [],
      docs: [],
      docscover: ''
    }
  }
  public session = ''
  public admin = { init: false, list: [] }
  public spa = { time: 0, init: 0, list: [], old: [], keyword: '', toggle: false, from: '', end: '' }
  public vaccine = { init: false, list: [], new: [], old: [], temp: [], over: [], keyword: '', time: '' }
  public usg = { key: '',init: false, list: [[], [], []], new: [], old: [], type: [], temp: [[], []], over: [], time: '' }
  public schedule = { time: 0, state: 1, list: [], except: [], data: [] }
  public cart = { list: [], init: false }
  public item = { init: false, list: [], all: [], image: [], catlist: [], purchase: 0, transfer: 0, expired: 0, keyword: '' }
  public drug = { init: false, list: [], filter: { name: '', effect: '' }, detail: {name: '', effect: '', limits: '', mechanic: '', sideeffect: '', image: []} }
  public blood = { init: false, page: 1, list: [], total: 0, number: [0, 0, 0], current: [0, 0, 0], start: '', end: '' }
  public profile = { init: false, page: 1, target: [], data2: {}, key: '', key2: '', list: [], id: 0, print: '', sampletype: [], species: [], serial: ''}
  public his = { init: false, from: '', end: '', list: [] }
  public price = { init: false, list: [], keyword: '' }
  public transport = { init: false, list: [], keyword: '' }
  // public kaizen = { reversal_segment: {}, unread: 0, time: 0, list: [], data: { done: [], undone: [] }, segment: 'undone', page: { done: 1, undone: 1 }, init: false, filter: { keyword: '', starttime: '', endtime: '' } }
  // public work = {}

  public action: string = ''
  public isready: boolean = false
  public id: number = 0
  public notification = []
  public detail: any = {}
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

  // kiểm tra thông tin đăng nhập
  // nếu có, login
  // nếu không, báo tải xong, chuyển về trang đăng nhập
  public async init() {
    await this.storage.create()
    this.storage.get('session').then(session => {
      if (session && session.length) this.sess(session)
      else {
        this.isready = true
        this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' })
      }
    })
  }

  public async ready() {
    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (this.isready) {
          setTimeout(() => {
            clearInterval(interval)
            resolve(true)
          }, 200);
        }
      }, 100)
    })
  }

  public typeSearch(typeid = 0) {
    let type = ''
    this.home.type.forEach(item => {
      if (item.id == typeid) type = item.name
    })
    return type
  }

  public async subscribe() {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    FCM.subscribeTo({ topic: 'test' })
    .then((r) => {
    }).catch(

    );
    
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.navCtrl.navigateForward('/cart')
        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  public manual(page: string) {
    this.temp = page
    this.navCtrl.navigateForward('modal/manual')
  }

  public async sess(session: string) {
    await this.freeze('Kiểm tra thông tin người dùng...')
    this.checkpost('user', 'session', {
      sess: session
    }).then(resp => {
      this.isready = true
      this.config = resp.config
      this.home = resp.data
      this.session = session
      this.notification = resp.notification
      this.home.notify = resp.notify
      this.vaccine.list = [[], [], []]
      if (this.router.url == '/login') this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      this.defreeze()
    }, () => {
      this.isready = true
      this.defreeze()
    })
  }

  public async login(user: any) {
    if (!user.username || !user.username.length) this.notify('Nhập tên tài khoản')
    else if (!user.password || !user.password.length) this.notify('Nhập mật khẩu!')
    else {
      await this.freeze('Đăng nhập...')
      this.checkpost('user', 'login', user).then(resp => {
        this.config = resp.config
        this.home = resp.data
        this.session = resp.session
        this.notification = resp.notification
        this.home.notify = resp.notify
        this.vaccine.list = [[], [], []]
        this.storage.set('session', resp.session)
        this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'back' })
        this.defreeze()
      }, () => {
        this.defreeze()
      })
    }
  }

  public async signup(user: any) {
    if (!user.username || !user.username.length) this.notify('Nhập tên tài khoản!')
    else if (!user.password || !user.password.length) this.notify('Nhập mật khẩu!')
    else if (!user.vpassword || !user.vpassword.length) this.notify('Nhập mật khẩu xác nhận!')
    else if (user.password !== user.vpassword) this.notify('Mật khẩu xác nhận không trùng nhau!')
    else {
      await this.freeze('Đăng ký...')
      this.checkpost('user', 'signin', user).then(resp => {
        this.config = resp.config
        this.session = resp.session
        this.notification = resp.notification
        this.home = resp.data
        this.home.notify = resp.notify
        this.vaccine.list = [[], [], []]
        this.storage.set('session', resp.session)
        this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'back' })
        this.defreeze()
      }, () => {
        this.defreeze()
      })
    }
  }

  public logout() {
    this.storage.remove('session')
    this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' })
  }

  public back() {
    this.navCtrl.pop()
  }

  public root() {
    this.navCtrl.navigateRoot('/home', {animated: true, animationDirection: 'back'})
  }

  public typeIndex(name: string) {
    let check = '0'
    for (const key in this.home.type) {
      if (Object.prototype.hasOwnProperty.call(this.home.type, key)) {
        const item = this.home.type[key];
        if (item['name'] == name) check = key
      }
    }
    return check
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

  public async checkpost(type: string, action: string, param: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      param['type'] = type
      param['action'] = action
      param['session'] = this.session
      this.http.post(this.baseurl, JSON.stringify(param)).toPromise().then((data) => {
        if (data['overtime']) {
          this.notify("Đã hết thời gian sử dụng")
          this.root()
          reject(data)
        }
        else if (data['nogin']) {
          this.notify("Phiên đăng nhập hết hạn")
          this.navCtrl.navigateBack('/login')
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
