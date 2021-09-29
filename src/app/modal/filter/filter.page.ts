import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) {  }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('/home', {animated: true, animationDirection: 'back'})
  }

  public async detail(image: string) {
    this.rest.temp = image
    let modal = await this.modal.create({
      component: DetailPage
    })
    await modal.present()
  }
}
