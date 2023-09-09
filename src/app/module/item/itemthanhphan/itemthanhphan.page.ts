import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-itemthanhphan',
  templateUrl: './itemthanhphan.page.html',
  styleUrls: ['./itemthanhphan.page.scss'],
})
export class ItemthanhphanPage implements OnInit {
  public tukhoa = ""
  public danhsach = []
  public timeout = null
  @ViewChild(IonContent) content: IonContent;
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/hanghoa')
  }

  public async xacnhan() {
    if (!this.rest.temp.mahang.length) return this.rest.notify("Xin hãy nhập mã hàng")
    else if (!this.rest.temp.tenhang.length) return this.rest.notify("Xin hãy nhập tên hàng")
    await this.rest.freeze('Đang tải dữ liệu......')
    this.rest.checkpost('item', 'capnhat', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.item.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public timkiem() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.tukhoa.length < 1) this.danhsach = []
      else {
        this.rest.checkpost('item', 'timhangthanhphan', {
          tukhoa: this.tukhoa
        }).then((resp) => {
          this.danhsach = resp.danhsach
        }, () => { })
      }
    }, 300);
  }

  public chonhanghoa(thutu: number) {
    let hanghoa = this.danhsach[thutu]
    this.rest.temp.idhangb = hanghoa.id
    this.rest.temp.tenhangb = hanghoa.tenhang
    this.danhsach = []
    this.content.scrollToTop(0);
  }
}
