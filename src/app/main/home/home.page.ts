import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private subscription: any
  imgURI: string = null;
  constructor(
    public rest: RestService,
    public platform: Platform
  ) { }

  public notify() {
    this.rest.navCtrl.navigateForward('/notify')
  }

  public checkout() {
    this.rest.navCtrl.navigateForward('/accounting')
  }

  ionViewWillEnter() {
    this.rest.action = 'home'
    this.rest.ain = true
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });

    this.rest.ready().then(() => {
      if (!this.rest.badge.init) {
        this.init()
      }
    })
  }

  public async init() {
    this.rest.checkpost('user', 'badge', { }).then(resp => {
      this.rest.badge = resp.data
      this.rest.badge.init = true
    }, () => { })
  }

  public chuyencongviec() {
    window.open("https://api.thanhxuanpet.com/dangnhap?session="+ this.rest.session)
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
