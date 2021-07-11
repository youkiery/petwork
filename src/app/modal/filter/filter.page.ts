import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  public status = {
    name: {
      0: 'Chưa gọi',
      1: 'Đã gọi',
      2: 'Đã tái chủng'
    },
    color: {
      0: 'red',
      1: 'yellow',
      2: 'greeen'
    }
  }
  constructor(
    public rest: RestService
  ) { }

  ionViewDidEnter() { }

  public async filter() {
    if (this.rest.filter.vaccine.key.length < 4) this.rest.notify('Nhập từ khóa ít nhất 4 ký tự')
    else {
      await this.rest.freeze('Đang tìm kiếm khách hàng')
      this.rest.checkpost('vaccine', 'filter', {
        action: 'vaccine-filter',
        keyword: this.rest.filter.vaccine.key
      }).then(response => {
        response.data.forEach((item: any, index: number) => {
          response.data[index]['calltime'] = this.rest.timetodate(response.data[index]['calltime'])
        });
        this.rest.data.vaccine = response.data
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  ngOnInit() { }
}
