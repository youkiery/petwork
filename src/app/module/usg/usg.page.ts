import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usg',
  templateUrl: './usg.page.html',
  styleUrls: ['./usg.page.scss'],
})
export class UsgPage {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewDidEnter() {
    if (!this.rest.data.usg.init) {
      await this.rest.freeze('Đang tải danh sách')
      this.rest.checkpost('usg', 'auto', {
        action: 'usg-auto'
      }).then(response => {
        this.rest.data.usg.new = response.new
        this.rest.data.usg.data = response.data
        this.rest.data.usg.init = true
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public insert() {
    this.rest.router.navigateByUrl('/usg/insert')
  }

  // public filter() {
  // }

  public filterM() {
    this.rest.router.navigateByUrl('/usg/filter')
  }

  // public async onSegmentChange() {
  //   await this.rest.freeze('Đang tải danh sách')
  //   this.filter().then(() => {
  //     this.rest.defreeze()
  //   })
  // }

  public async changeStatus(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'done', {
      action: 'usg-check',
      id: id,
      keyword: this.rest.data.usg.filterKey,
      status: this.rest.data.usg.status
    }).then(response => {
      this.rest.notify('Đã thay đổi trạng thái')
      this.rest.data.usg.data = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async birth(id: number) {
    let alert = await this.alert.create({
      message: 'Số lượng con sinh ra',
      inputs: [
        {
          type: 'number',
          name: 'number',
          value: 0
        }
      ],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.birthSubmit(id, e['number'])
          }
        }
      ]
    })
    alert.present()
  }

  public async birthSubmit(id: number, number: number) {
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.checkpost('usg', 'birth', {
      action: 'usg-birth',
      id: id,
      number: Number(number),
      keyword: this.rest.data.usg.filterKey,
      status: this.rest.data.usg.status
    }).then((response) => {
      this.rest.data.usg.data = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async note(index: number, id: number, text: string) {
      let alert = await this.alert.create({
        message: 'Chỉnh sửa ghi chú',
        inputs: [
          {
            type: 'text',
            name: 'note',
            value: text
          }
        ],
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'secondary',
            handler: (e) => {
              this.noteSubmit(id, index, e['note'])
            }
          }
        ]
      })
      alert.present()
  }

  public async noteSubmit(id: number, index: number, note: string) {
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.checkpost('usg', 'note', {
      action: 'usg-note',
      id: id,
      text: note,
      keyword: this.rest.data.usg.filterKey,
      status: this.rest.data.usg.status
    }).then(() => {
      this.rest.data.usg.data[index].note = note
      this.rest.defreeze()
    }, () => [
    ])
  }

  ngOnInit() { }
}
