import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.temp.action) this.rest.root()
    })
  }

  public scrollto(element: string) {
    let yOffset = document.getElementById(element).offsetTop;
    this.content.scrollToPoint(0, yOffset, 1000)
  }
}
