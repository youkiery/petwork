import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-physprint',
  templateUrl: './physprint.page.html',
  styleUrls: ['./physprint.page.scss'],
})
export class PhysprintPage {
  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public dom: DomSanitizer,
    public platform: Platform,
    // public printer: Printer
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/physical')
    else this.html = this.dom.bypassSecurityTrustHtml(this.rest.physical.print)
  }

  public print() {
    // browser
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.physical.print);
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }

  public async download() {
    await this.rest.freeze()
    this.rest.checkpost('physical', 'download', {
      id: this.rest.physical.id
    }).then(resp => {
      this.rest.defreeze()
      window.open(resp.link)
    }, () => {
      this.rest.defreeze()
    })
  }
}
