import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-excelloinhuan',
  templateUrl: './excelloinhuan.page.html',
  styleUrls: ['./excelloinhuan.page.scss'],
})
export class ExcelloinhuanPage implements OnInit {
  public cauhinh = {
    loinhuanspa: 0,
    loinhuandieutri: 0,
    chietkhauspa: 0,
    chietkhaudieutri: 0,
  }
  public danhsachnhanvien = []
  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }

  ngOnInit() {
  }

}