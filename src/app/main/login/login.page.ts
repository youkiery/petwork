import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public logo = 'assets/image/logo.png'
  public log = 1
  public user = {
    fullname: '',
    name: '',
    username: '',
    password: '',
    vpassword: '',
  }
  private subscription: any
  private version: string = '0.0.1'
  constructor(
    public rest: RestService,
    public navCtrl: NavController,
    public platform: Platform
  ) { }

  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
