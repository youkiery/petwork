import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
    else {
      this.rest.checkpost('user', 'notify', {}).then(() => {
        this.rest.home.notify = 0
      }, () => { })
    }
  }

  public navi(module: string) {
    this.rest.navCtrl.navigateForward(module)
  }

}
