import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-rideinsert',
  templateUrl: './rideinsert.page.html',
  styleUrls: ['./rideinsert.page.scss'],
})
export class RideinsertPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

}
