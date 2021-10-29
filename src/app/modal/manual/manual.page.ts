import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.temp) this.rest.root()
    })
  }
}
