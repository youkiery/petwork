import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';
// import { FCM } from '@capacitor-community/fcm';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public base: string = '';
  // public baseurl: string = 'https://nhatrang.thanhxuanpet.com/server/index.php?';
  // public baseurl: string = '/server/index.php?';
  // public baseurl: string = 'https://daklak.thanhxuanpet.com/server/index.php?';
  public baseurl: string = 'http://localhost/server/index.php?';
  // public baseurl: string = '/server/index.php?';
  public version = 21 // 21-188
  public admindefault = ['1', '5']
  public config: any
  public site: any = {
    title: '',
    logo: ''
  }
  public home = {
    month: {
      start: '',
      end: ''
    },
    chotlich: '0',
    datlich: 0,
    datlich2: 0,
    today: '',
    branch: '',
    prefix: '',
    birthday: [],
    next: '',
    userid: '0',
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
  public image: any = ''  
  public ain = false
  public session = ''
  public manager = { code: '', seller: '', phone: '', customer: '', time: '', note: '', item: '', number: '' }
  public admin = { init: false, list: [] }
  public spa = { time: 0, init: false, datlichhomnay: [], list: [], near: [], filter: [], old: [], keyword: '', keyword2: '', toggle: false, search: {status: 0, start: '', end: ''}, thongke: {dauthang: '', cuoithang: ''}, khoitaothongke: false, dulieu: [] }
  public vaccine = { uncalled: 0, init: false, list: [], new: [], old: [], temp: [[], []], over: [], keyword: '', time: '', type: 'vaccine' }
  public usg = { uncalled: [0, 0, 0], list: [[], [], []], temp: [[], []], new: [], time: '' }
  public schedule = { init: false, time: 0, state: 1, list: [], except: [], data: [], quangay: [], dachotlich: {batdau: 0, ketthuc: 0}, dadangky: 0, filter: { batdau: '', ketthuc: '', danhsach: [] }, start: '', end: '', nghichunhat: [], chedodangky: 0, cauhinh: {dangkythem: 0, huydangky: 0}, dangky: {dangkythem: 0, huydangky: 0}, thangnay: false }
  public cart = { list: [], init: false }
  public accounting = { init: false, kiot: { content: '', time: '', money: '', }, vietcom: { money: '', content: '', time: '' }, total: { kiot: '0', vietcom: '0', subtract: '0' }, checkout: [], datetime: '', start: '', end: '', old: [], note: '', id: 0 }
  public item = { khoitao: false, danhsach: [], tukhoa: "" }
  // public item = { init: false, list: [], i: [], all: [], image: [], catlist: [], floor: '', keyword: '', user: [], usercat: [], cat: [], cats: '', action: '', purchased: 0, purchase: { item: [], recommend: [] }, source: [], sourceid: '0', purcount: 0, position: [], expired: 0, outstock: 0, outx: {}, toggle: false }
  public drug = { init: false, list: [], filter: { name: '', effect: '' }, detail: {name: '', effect: '', limits: '', mechanic: '', sideeffect: '', image: []} }
  public profile = { init: false, need: [], target: [], data2: {}, key2: '', list: [], id: 0, print: '', sampletype: [], species: [], serial: '', segment: '1', s: '1', filter: {key: '', start: '', end: ''}}
  public physical = { init: false, target: [], data2: {}, key2: '', list: [], id: 0, print: '', sampletype: [], species: [], serial: '', import: [], need: [], segment: '1', s: '1', filter: {key: '', start: '', end: ''} }
  public his = { init: false, near: [], c: 0, count: 0, treat: [0, 0], pose: [0, 0], disease: [], list: [], manager_init: false, manager: [], type: [], keyword: '', search: false, filter: {docs: [], docscover: '', keyword: '', diseaseid: '', start: '', end: '' }, inits: false, d: {text: '', list: {}}, s: '0', segment: '0', print: '' }
  public price = { init: false, list: [], keyword: '' }
  public transport = { init: false, list: [], keyword: '' }
  public ride = {init: false, list: [[], []], start: '', end: '', segment: '0', clock: 0}
  public kaizen = { reversal_segment: {}, unread: 0, time: 0, list: {done: [], undone: []}, data: { done: [], undone: [] }, segment: 'undone', init: false, filter: { keyword: '', starttime: '', endtime: '', sort: 'asc', done: 1, undone: 1 } }
  public manual = { init: false, key: '', cate: '', data: [], list: [], selected: -1 }
  public test = { init: false, i: [], list: [], keyword: '' }
  public xquang = { init: false, list: [], need: [], start: '', end: '', s: '1' }
  public sieuam = { init: false, list: [], need: [], start: '', end: '', s: '1' }
  public hotel = { init: false, catinit: false, cat: [], list: [], need: [], filter: {start: '', end: ''}, s: '0' }
  public datlich = { khoitao: false, tukhoa: "", tungay: "", denngay: "", danhsach: [] }
  public danhgia = { khoitao: false, thoigian: "", danhsach: [] }
  public other = { init: false, list: [], need: [], type: [], start: '', end: '', s: '1' }
  public badge = { his: 0, kaizen: 0, profile: 0, physical: 0, xquang: 0, sieuam: 0, other: 0, init: false }
  public excel = { init: false, config: {name: '', phone: '', address: ''} }
  public luong: any = { khoitao: false, khoitaonhanvien: false, khoitaomucchi: false, mucchi: [], chuy: 0, danhsach: [], nhanvien: [], khoitaoluongthang: false, id: 0, dulieu: {nhanvien: []}, excel: { nhanvien: '', doanhthu: '', loinhuan: '' }, chitiet: [], sosanh: { khoitao: false, thoigian: '', chedo: 'luongcoban', danhsach: [] } }
  public place = { init: false, list: []}
  public congviec = { khoitao: false, modanhmuc: {}, danhsach: [], timkiem: { nhanvien: "0", tukhoa: '', danhmuc: '', denhan: 0, hoanthanh: 0 }, chedo: '0', danhmuc: [], childid: -1, child: [], nhanvien: [], khoitaolaplai: false, danhsachlaplai: [] }
  public vattu = { danhsachtam: [], tukhoa: '', khoitao: false, khoitaocophan: false, dulieu: { tongsoluong: 0, tongvattu: 0, tonggiatri: 0, danhsach:[] }, loctang: {}, danhsachtang: [], tongtien: '0', danhsachnhanvien: [], cophan: { codong: 0, tile: 0, giatri: '0', danhsach: [] } }
  public nhomtin = { khoitao: false, danhsach: [], tennhom: '', danhsachnhan: [], bodem: { thanhcong: 0, thatbai: 0, batdau: 0, tieptheo: 0, dagui: 0, tongcong: 0, min: 0, max: 0, tile: 0, thutu: 0, dautien: true }, demgio: null, hengio: null, danggui: false, dangguitin: false, hoanthanh: false, cauhinhnhantin: { min: 0, max: 0 }, cauhinhloai: {vaccine: [], spa: [], treat: [], usg: []}, id: 0, mautin: '' }
  public nhantin = { khoitaonhantin: false, danhsachnhantin: [], khoitaoloaitru: false, danhsachloaitru: [], cauhinhnhantin: { min: 0, max: 0, mautin: [], danhsachloai: [] }, bodem: { thanhcong: 0, thatbai: 0, batdau: 0, tieptheo: 0, dagui: 0, tongcong: 0, min: 0, max: 0, tile: 0, thutu: 0, dautien: true }, demgio: null, hengio: null, danggui: false, dangguitin: false, hoanthanh: false, khoitaothongke: false, thongke: { tongnhan: 0, tongkhach: 0, danhsachden: [], danhsachkhongden: [], nhomnhantin: [] }, batdau: '', ketthuc: '', chonngay: [], thoigian: '' }
  public taichinh = { khoitao: false, danhsach: [], danhsachchi: { 0: {lanchi: '0', tongchi: '0', danhsach: []}, 1: {lanchi: '0', tongchi: '0', danhsach: []}, 2: {lanchi: '0', tongchi: '0', danhsach: []}, 3: []}, danhsachncc: [], thoigian: '', tab: '0', danhsachloaichi: [], danhsachnhacungcap: [], danhsachtang: [], thongke: { tongnccno: '0', tongthu: '0', tongchi: '0', tongkhachno: '0', tongnonhacungcap: '0', tongtaisan: '0', loinhuan: '0', chithuongxuyen: '0', chiluongthuong: '0', chinhacungcap: '0', chitaisan: '0', cophan: '0', chicodinh: '0', tienmat: '', nganhang: '' } }
  public loinhuan = { anbangluong: 0, khoitao: false, heluong: 0, tilespa: {
    loinhuanbanhang: 0,
    loinhuanspa: 0,
    chietkhaubanhang: 0,
    chietkhauspa: 0,
  }, tilebanhang: [], luongcoban: '0', phucap: '0', danhsach: [], danhsachtam: [], luong: { doanhsobanhang: '0', doanhsospa: '0', luongcoban: '0', thuong: '0', phucap: '0', nghiphep: '0', tietkiem: '0', tongluong: '0', thucnhan: '0', cophan: '0', tongtietkiemnam: '0', tongcophannam: '0', thoigian: '' }, thoigian: '', tukhoa: '', tongluong: '0', thuong: '0'}
  public thietbi = { khoitao: false, danhsach: [], danhsachtam: [], tukhoa: '' }
  public chuyenmon = { khoitao: false, danhsach: [], dichvu: [], chuyenmon: [] }
  public thongkenghi = { khoitao: false, tungay: "", denngay: "", danhsach: [], danhsachngay: [] }
  public lichban = { khoitao: false, danhsach: [] }
  public tintuc = { khoitao: false, danhsachtintuc: [], danhsachchuongtrinh: [], danhsachchinhanh: [] }
  public tailieu = { khoitao: false, timkiem: { tukhoa: "", iddanhmuc: "0" }, danhsach: [], danhmuc: [] }
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
    // this.storage.get('floor').then(floor => {
    //   if (!floor) floor = ''
    //   this.item.floor = floor
    // })

    this.base = this.baseurl.replace('server/index.php?', '')
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

  public purenumber(sodau: any) {
    var socuoi = '';
    var dayso = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    sodau = sodau.toString().split('');
    sodau.forEach(so => {
      if (dayso.indexOf(so) >= 0) socuoi = socuoi + so
    })
    return Number(socuoi);
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

  // public async subscribe() {
  //   await PushNotifications.requestPermissions();
  //   await PushNotifications.register();

  //   FCM.subscribeTo({ topic: 'test' })
  //   .then((r) => {
  //   }).catch(

  //   );
    
  //   PushNotifications.addListener('registration',
  //     (token: Token) => {
  //       // alert('Push registration success, token: ' + token.value);
  //     }
  //   );

  //   PushNotifications.addListener('registrationError',
  //     (error: any) => {
  //       // alert('Error on registration: ' + JSON.stringify(error));
  //     }
  //   );

  //   PushNotifications.addListener('pushNotificationReceived',
  //     (notification: PushNotificationSchema) => {
  //       // alert('Push received: ' + JSON.stringify(notification));
  //     }
  //   );

  //   PushNotifications.addListener('pushNotificationActionPerformed',
  //     (notification: ActionPerformed) => {
  //       this.navCtrl.navigateForward('/cart')
  //       // alert('Push action performed: ' + JSON.stringify(notification));
  //     }
  //   );
  // }

  public goManual(page: string) {
    this.manual.cate = page
    this.navCtrl.navigateForward('/manual')
  }

  public async sess(session: string) {
    await this.freeze('Kiểm tra thông tin người dùng...')
    this.checkpost('user', 'session', {
      sess: session,
      version: this.version
    }).then(resp => {
      this.defreeze()
      this.site = resp.site
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
        this.site = resp.site
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
        this.site = resp.site
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

  public view(image: string) {
    this.image = image
    this.navCtrl.navigateForward('/image')
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

  public async freeze(text: string = 'Đang tải dữ liệu...') {
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
