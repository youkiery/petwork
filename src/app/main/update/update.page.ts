import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    if (!this.rest.link.length) this.rest.navCtrl.navigateRoot('/home')
  }

  public download() {
    window.open(this.rest.link)
  }
}
