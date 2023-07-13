import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-timnhomtin',
  templateUrl: './timnhomtin.page.html',
  styleUrls: ['./timnhomtin.page.scss'],
})
export class TimnhomtinPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/nhomtin')
  }
}
