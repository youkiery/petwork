import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisprint',
  templateUrl: './hisprint.page.html',
  styleUrls: ['./hisprint.page.scss'],
})
export class HisprintPage {

  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public dom: DomSanitizer,
    // public printer: Printer
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    else this.init()
  }

  public async init() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his', 'printer', {
      id: this.rest.temp.id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.his.print = resp.html
      this.html = this.dom.bypassSecurityTrustHtml(resp.html)
    }, () => {
      this.rest.defreeze()
    })
  }

  public print() {
    // browser
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.his.print);
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }
}
