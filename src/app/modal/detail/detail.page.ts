import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  public module = {
    work: 0, kaizen: 0, schedule: 0, vaccine: 0, spa: 0, item: 0, blood: 0, usg: 0, drug: 0, profile: 0,
  }
  public list = [
    {name: 'Quản lý công việc', module: 'work'},
    {name: 'Kaizen', module: 'kaizen'},
    {name: 'Đăng ký lịch', module: 'schedule'},
    {name: 'Quản lý vaccine', module: 'vaccine'},
    {name: 'Lịch spa', module: 'spa'},
    {name: 'Quản lý hàng hóa', module: 'item'},
    {name: 'Quản lý xét nghiệm', module: 'blood'},
    {name: 'Quản lý siêu âm', module: 'usg'},
    {name: 'Tra cứu thuốc', module: 'drug'},
    {name: 'Quản lý sinh hóa', module: 'profile'},
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
    if (!this.rest.action.length) this.rest.root()
    if (this.rest.action == 'admin') this.module = this.rest.admin.list[this.rest.temp.index].module
    if (this.rest.action == 'blood') this.bloodInit()
  }

  public async bloodInit() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.checkpost('blood', 'statistic', { }).then(response => {
      this.rest.defreeze()
      this.rest.temp = response.data
    }, () => {
      this.rest.defreeze()
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
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('admin', 'update', {
      module: this.module,
      id: this.rest.admin.list[this.rest.temp.index].userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.list[this.rest.temp.index].module = this.module
      this.rest.config = resp.config
      this.rest.navCtrl.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(module: string, increase: number) {
    this.module[module] = Number(this.module[module]) + increase
    if (this.module[module] < 0) this.module[module] = 0
    else if (this.module[module] > 2) this.module[module] = 2
  }
}
