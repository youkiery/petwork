import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-fivemin',
  templateUrl: './fivemin.page.html',
  styleUrls: ['./fivemin.page.scss'],
})
export class FiveminPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

}
