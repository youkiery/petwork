import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profprint',
  templateUrl: './profprint.page.html',
  styleUrls: ['./profprint.page.scss'],
})
export class ProfprintPage {
  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public dom: DomSanitizer,
    public platform: Platform,
    // public printer: Printer
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/profile')
    else this.html = this.dom.bypassSecurityTrustHtml(this.rest.profile.print)
  }

  public print() {
    // browser
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.profile.print);
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }

  public async download() {
    await this.rest.freeze()
    this.rest.checkpost('profile', 'download', {
      id: this.rest.profile.id
    }).then(resp => {
      this.rest.defreeze()
      window.open(resp.link)
    }, () => {
      this.rest.defreeze()
    })
  }
}
