import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-xetnghiemin',
  templateUrl: './xetnghiemin.page.html',
  styleUrls: ['./xetnghiemin.page.scss'],
})
export class XetnghieminPage implements OnInit {

  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public dom: DomSanitizer,
    // public printer: Printer
  ) { }

  ngOnInit(): void { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/xetnghiem')
    else this.html = this.dom.bypassSecurityTrustHtml(this.rest.temp.tailieu)
  }

  public print() {
    // browser
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.temp.tailieu);
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }

  public async download() {
    await this.rest.freeze()
    this.rest.checkpost('xetnghiem', 'download', {
      id: this.rest.profile.id
    }).then(resp => {
      this.rest.defreeze()
      window.open(resp.link)
    }, () => {
      this.rest.defreeze()
    })
  }
}
