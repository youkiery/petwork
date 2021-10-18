import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profprint',
  templateUrl: './profprint.page.html',
  styleUrls: ['./profprint.page.scss'],
})
export class ProfprintPage implements OnInit {
  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public dom: DomSanitizer,
    public platform: Platform,
    // public printer: Printer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
    this.html = this.dom.bypassSecurityTrustHtml(this.rest.profile.print)
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
    }).then(response => {
      this.rest.defreeze()
      window.open(response.link)
    }, () => {
      this.rest.defreeze()
    })
  }
}
