import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  public module: any = {}
  public name = ''
  public fullname = ''
  public list = [
    { name: 'Lịch spa', module: 'spa' },
    { name: 'Quản lý nhắc gọi', module: 'vaccine' },
    { name: 'Đăng ký lịch', module: 'schedule' },
    { name: 'Quản lý hàng hóa', module: 'item' },
    { name: 'Kaizen', module: 'kaizen' },
    { name: 'Tra cứu thuốc', module: 'drug' },
    { name: 'Giá sỉ', module: 'price' },
    { name: 'Quản lý xe', module: 'ride' },
    { name: 'Quản lý sinh hóa', module: 'profile' },
    { name: 'Quản lý sinh lý', module: 'physical' },
    { name: 'Quản lý bệnh nhân', module: 'his' },
    { name: 'Quản lý đơn hàng', module: 'cart' },
    { name: 'Quản lý nhà xe', module: 'transport' },
    // {name: 'Quản lý công việc', module: 'work'},
  ]
  public level = {
    '-1': '', '0': 'Không phận sự', '1': 'Nhân viên', '2': 'Quản lý', '3': ''
  }
  @Input('username') username: string;
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      if (!this.rest.action.length) this.rest.root()
      else if (this.rest.action == 'admin') this.module = this.rest.admin.list[this.rest.temp.index].module
    })
  }

  public async view(image: string) {
    this.rest.temp.image = image
  }

  async drugUpdate() {
    if (this.rest.config.drug < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.temp = {
        id: this.rest.drug.detail['id'],
        name: this.rest.drug.detail['name'],
        limits: this.rest.drug.detail['limits'],
        effect: this.rest.drug.detail['effect'],
        sideeffect: this.rest.drug.detail['sideeffect'],
        mechanic: this.rest.drug.detail['mechanic'],
        image: this.rest.drug.detail['image'],
      }
      this.rest.navCtrl.navigateForward('/modal/upload')
    }
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'update', {
      module: this.module,
      name: this.rest.temp.name,
      fullname: this.rest.temp.fullname,
      userid: this.rest.admin.list[this.rest.temp.index].userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.list = resp.list
      this.rest.config = resp.config
      this.rest.navCtrl.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(module: string, increase: number) {
    if (!this.module[module]) this.module[module] = 0

    this.module[module] = Number(this.module[module]) + increase
    if (this.module[module] < 0) this.module[module] = 0
    else if (this.module[module] > 2) this.module[module] = 2
  }
}
