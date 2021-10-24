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

  ionViewWillEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
