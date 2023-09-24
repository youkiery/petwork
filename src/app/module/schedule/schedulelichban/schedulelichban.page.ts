import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-schedulelichban',
  templateUrl: './schedulelichban.page.html',
  styleUrls: ['./schedulelichban.page.scss'],
})
export class SchedulelichbanPage implements OnInit {

  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'lichban'
      if (!this.rest.lichban.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('lichban', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      this.rest.lichban.khoitao = true
      this.rest.lichban.danhsach = resp.danhsach
    }, (e) => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('lichban', 'khoitao', {}).then(resp => {
      this.rest.defreeze()
      event.target.complete()
      this.rest.lichban.khoitao = true
      this.rest.lichban.danhsach = resp.danhsach
    }, (e) => {
      this.rest.defreeze()
      event.target.complete()
    })
  }

  public them() {
    this.rest.temp = {
      id: 0,
      lydo: "",
      batdau: new Date().toISOString(),
      ketthuc: new Date().toISOString()
    }
    this.rest.navCtrl.navigateForward("/schedule/themlichban")
  }

  public capnhat(i, j) {
    let lichban = this.rest.lichban.danhsach[i].danhsach[j]
    this.rest.temp = {
      id: lichban.id,
      lydo: lichban.lydo,
      batdau: lichban.batdauiso,
      ketthuc: lichban.ketthuciso,
    }
    this.rest.navCtrl.navigateForward("/schedule/themlichban")
  }

  public async xoa(id: number) {
    const alert = await this.alert.create({
      message: 'Lịch báo bận sẽ bị xoá, tiếp tục?',
      buttons: [
        {
          text: 'Trở vể',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.xacnhanxoa(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async xacnhanxoa(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('lichban', 'xoa', {
      id: id,
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.lichban.danhsach = resp.danhsach
    }, (error) => {
      this.rest.defreeze()
    })
  }
}
