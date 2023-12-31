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
  // public baseurl: string = 'http://localhost/server/index.php?';
   public baseurl: string = '/server/index.php?';
  // public baseurl: string = 'https://daklak.thanhxuanpet.com/server/index.php?';
  // public baseurl: string = 'https://app.petcoffee.work/server/index.php?';
  public version = 67 // 21-67
  public config: any
  public home = {
    month: {
      start: '',
      end: ''
    },
    today: '',
    next: '',
    name: '',
    userid: 0,
    username: '',
    fullname: '',
    admin: 0,
    users: [],
    his: 0,
    doctor: [],
    type: [],
    spa: [],
    usgcode: [],
    vaccine: 0,
    usg: 0,
    default: {
      spa: [],
      docs: [],
      docscover: ''
    },
  }
  public ain = false
  public session = ''
  public manager = { code: '', seller: '', phone: '', customer: '', time: '', note: '', item: '', number: '' }
  public admin = { init: false, list: [] }
  public spa = { time: 0, init: 0, list: [], old: [], keyword: '', toggle: false, start: '', end: '' }
  public vaccine = { uncalled: 0, init: false, list: [], new: [], old: [], temp: [[], []], over: [], keyword: '', time: '', type: 'vaccine' }
  public usg = { uncalled: [0, 0, 0], list: [[], [], []], temp: [[], []], new: [], time: '' }
  public schedule = { time: 0, state: 1, list: [], except: [], data: [] }
  public cart = { list: [], init: false }
  public accounting = { init: false, kiot: { content: '', time: '', money: '', }, vietcom: { money: '', content: '', time: '' }, total: { kiot: '0', vietcom: '0', subtract: '0' }, checkout: { on: 0, kiot: [], vietcom: [], pair: [] }, start: '', end: '', old: [] }
  public item = { init: false, list: [], i: [], all: [], image: [], catlist: [], floor: '', keyword: '', user: [], usercat: [], cat: [], cats: '', action: '', purchased: 0, purchase: { item: [], recommend: [] }, source: [], sourceid: '0', purcount: 0, position: [], expired: 0, outstock: 0, outx: {}, toggle: false }
  public drug = { init: false, list: [], filter: { name: '', effect: '' }, detail: {name: '', effect: '', limits: '', mechanic: '', sideeffect: '', image: []} }
  public profile = { init: false, page: 1, target: [], data2: {}, key: '', key2: '', list: [], id: 0, print: '', sampletype: [], species: [], serial: ''}
  public physical = { init: false, page: 1, target: [], data2: {}, key: '', key2: '', list: [], id: 0, print: '', sampletype: [], species: [], serial: '', import: [] }
  public his = { init: false, count: [0, 0], start: '', end: '', list: [], manager_init: false, manager: [] }
  public price = { init: false, list: [], keyword: '' }
  public transport = { init: false, list: [], keyword: '' }
  public ride = {init: false, list: [[], []], start: '', end: '', segment: '0', clock: 0}
  public kaizen = { reversal_segment: {}, unread: 0, time: 0, list: {done: [], undone: []}, data: { done: [], undone: [] }, segment: 'undone', init: false, filter: { keyword: '', starttime: '', endtime: '', sort: 'asc', done: 1, undone: 1 } }
  public manual = { init: false, key: '', cate: '', data: [], list: [], selected: -1 }
  // public work = {}

  public link = ''
  public action: string = ''
  public isready: boolean = false
  public id: number = 0
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
    this.storage.get('floor').then(floor => {
      if (!floor) floor = ''
      this.item.floor = floor
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

  public comma(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public typeSearch(typeid = 0) {
    let type = ''
    this.home.type.forEach(item => {
      if (item.id == typeid) type = item.name
    })
    return type
  }

  public isnumber(n: number) {
    return Number(n)
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

  public goManual(page: string) {
    this.manual.cate = page
    this.navCtrl.navigateForward('manual')
  }

  public async sess(session: string) {
    await this.freeze('Kiểm tra thông tin người dùng...')
    this.checkpost('user', 'session', {
      sess: session,
      version: this.version
    }).then(resp => {
      this.defreeze()
      this.config = resp.config
      this.home = resp.data
      this.session = session
      this.vaccine.list = [[], [], []]
      if (this.router.url == '/login') this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      this.isready = true
    }, () => {
      this.defreeze()
      this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' })
      this.isready = true
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
        this.home = resp.data
        this.vaccine.list = [[], [], []]
        this.storage.set('session', resp.session)
        this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'back' })
        this.defreeze()
      }, () => {
        this.defreeze()
      })
    }
  }

  public async logout() {
    await this.freeze('Đăng xuất...')
    this.checkpost('user', 'logout', {}).then(resp => {
      this.defreeze()
      this.storage.remove('session')
      this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' })
    }, () => {
      this.defreeze()
    })
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

  public async freeze(text: string = 'Đang tải dữ liệu') {
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

  public alias(str:string) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.trim(); 
    return str;
  }

  public async checkpost(type: string, action: string, param: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      param['type'] = type
      param['action'] = action
      param['session'] = this.session
      param['version'] = this.version
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
        else if (data['outdate']) {
          this.link = data['link']
          this.navCtrl.navigateRoot('/update')
          this.defreeze()
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
