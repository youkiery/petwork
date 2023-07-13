import { Component, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage {
  key: string = ''
  list: any = []
  timeout = null
  @ViewChild('input') input: any;
  @ViewChild('input2') input2: any;
  constructor(
    public rest: RestService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
    else if (this.rest.action == 'item') this.input2.setFocus();
    else this.input.setFocus();
  }

  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.key.length < 1) this.list = []
      else {
        this.rest.checkpost('customer', 'search', {
          key: this.key
        }).then((resp) => {
          this.list = resp.list
        }, () => { })
      }
    }, 300);
  }

  public selectcurrent() {
    if (this.rest.temp.param) this.rest.temp.phone2 = this.key
    else this.rest.temp.phone = this.key
    this.rest.back()
  }

  public select(i: number) {
    if (this.rest.temp.param) {
      this.rest.temp.name2 = this.list[i].name
      this.rest.temp.phone2 = this.list[i].phone
    }
    else {
      this.rest.temp.name = this.list[i].name
      this.rest.temp.phone = this.list[i].phone
      this.rest.temp.address = this.list[i].address
      this.rest.temp.tinhcach = this.list[i].tinhcach
    }

    this.rest.back()
  }

  public async searchHistory() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'history', {
      phone: this.rest.temp.phone
    }).then(resp => {
      this.rest.defreeze()
      if (resp.old.length) {
        this.rest.vaccine.old = resp.old
        this.rest.navCtrl.navigateForward('/vaccine/his')
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggestItem() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.key.length < 1) this.list = []
      else {
        this.rest.checkpost('item', 'search', {
          key: this.key
        }).then((resp) => {
          this.list = resp.list
        }, () => { })
      }
    }, 300);
  }

  public selectcurrentItem() {
    this.rest.temp.name = this.key
    this.rest.back()
  }

  public selectItem(name: string, code: string) {
    this.rest.temp.name = name
    this.rest.temp.code = code
    this.rest.back()
  }
}
