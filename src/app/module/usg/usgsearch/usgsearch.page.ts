import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usgsearch',
  templateUrl: './usgsearch.page.html',
  styleUrls: ['./usgsearch.page.scss'],
})
export class UsgsearchPage implements OnInit {
  public status_text = {
    0: 'Chưa nhắc',
    1: 'Chưa gọi được',
    2: 'Đã gọi, chưa đến',
    3: 'Đã tái chủng',
    4: 'Không tái chủng',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card yellow',
    2: 'stl-card green',
    3: 'stl-card green',
    4: 'stl-card red',
  }
  public page = 1
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.root()
  }

  public async search() {
    if (!this.rest.usg.key.length) this.rest.notify('Nhập ít nhất 1 ký tự...')
    else {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('usg', 'searchcustomer', {
        keyword: this.rest.usg.key,
      }).then(resp => {
        this.rest.defreeze()
        this.rest.temp = resp.list
        this.page = 1
      }, () => {
        this.rest.defreeze()
      })
    }
  }


  public moreVaccine(event: any) {
    this.page ++
    event.target.complete()
  }
}
