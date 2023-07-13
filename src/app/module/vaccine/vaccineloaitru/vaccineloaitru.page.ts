import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccineloaitru',
  templateUrl: './vaccineloaitru.page.html',
  styleUrls: ['./vaccineloaitru.page.scss'],
})
export class VaccineloaitruPage implements OnInit {
  public danhsach = []
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
    else this.khoitao()
  }
  
  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'khoitaoloaitru', {
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'khoitaoloaitru', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public async xacnhanhoiphuc(index: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận hồi phục',
      subHeader: 'Khách hàng sẽ được đưa vào danh sách nhắc kể từ giờ?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.hoiphuc(this.danhsach[index].idkhach)
          }
        }
      ]
    });
    await alert.present();
  }

  public async hoiphuc(id: number) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('vaccine', 'hoiphuc', {
      id: id,
    }).then(resp => {
      this.rest.defreeze()
      this.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }
}

