import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usgsearch',
  templateUrl: './usgsearch.page.html',
  styleUrls: ['./usgsearch.page.scss'],
})
export class UsgsearchPage implements OnInit {
  public status_text = {
    0: 'Nhắc tới ngày sa lơ',
    1: 'Tư vấn trước sinh',
    2: 'Ngày sinh',
    3: 'Nhắc sổ giun lần 1',
    4: 'Nhắc sổ giun lần 2',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã hoàn thành',
    7: 'Không theo dõi nữa',
    8: 'Phiếu tạm',
  }
  public status = {
    0: 'stl-card white',
    1: 'stl-card red',
  }
  public header = {
    0: 'Đã hẹn nhắc sa lơ',
    1: 'Tư vấn trước sinh',
    2: 'Ngày sinh',
    3: 'Nhắc sổ giun lần 1',
    4: 'Nhắc sổ giun lần 2',
    5: 'Nhắc tiêm vaccine',
    6: 'Đã hoàn thành',
    7: 'Không theo dõi nữa',
    8: 'Phiếu tạm',
  }
  public subheader = {
    0: 'Xác nhận gọi nhắc salơ, phiếu nhắc sẽ được đánh dấu là đã hoàn thành',
    1: 'Xác nhận tư vấn trước sinh, phiếu nhắc sinh sẽ hiện lại 1 ngày sau khi sinh',
    2: 'Xác nhận đã sinh, phiếu nhắc xổ giun sẽ hiện lại 3 tuần sau khi sinh',
    3: 'Xác nhận xổ giun lần 1, phiếu nhắc xổ giun lần 2 sẽ hiện lại 5 tuần sau khi sinh',
    4: 'Xác nhận xổ giun lần 2, phiếu nhắc tiêm phòng sẽ hiện lại 6 tuần sau khi sinh',
  }
  public page = 1
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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


  public async called(index: number) {
    const alert = await this.alert.create({
      header: this.header[this.rest.usg.list[index].status],
      subHeader: this.subheader[this.rest.usg.list[index].status],
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.usg.list[index].note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(this.rest.usg.list[index].id, e.note)
          }
        }
      ]
    });
    await alert.present();
  }

  public async calledSubmit(id: number, note: string) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'called', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public async dead(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận không theo dõi',
      subHeader: 'Sau khi xác nhận phiếu siêu âm sẽ không nhắc lại nữa',
      message: 'Ghi chú: ',
      inputs: [{
        type: 'text',
        name: 'note',
        value: this.rest.usg.list[index].note
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.deadSubmit(this.rest.usg.list[index].id, e.note)
          }
        }
      ]
    });

    await alert.present();
  }

  public async deadSubmit(id: number, note: string = '') {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('usg', 'dead', {
      id: id,
      note: note,
      keyword: this.rest.usg.keyword,
      time: this.rest.usg.time,
      docs: this.rest.usg.docs
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }

  public moreVaccine(event: any) {
    this.page ++
    event.target.complete()
  }
}
