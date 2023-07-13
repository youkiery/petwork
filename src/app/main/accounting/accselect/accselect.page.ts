import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-accselect',
  templateUrl: './accselect.page.html',
  styleUrls: ['./accselect.page.scss'],
})
export class AccselectPage {
  public keyword = ''
  public list = []
  public cell = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13","C14","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","D14","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12","E13","E14","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14","H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13","H14","I1","I2","I3","I4","I5","I6","I7","I8","I9","I10","I11","I12","I13","I14","J1","J2","J3","J4","J5","J6","J7","J8","J9","J10","J11","J12","J13","J14","K1","K2","K3","K4","K5","K6","K7","K8","K9","K10","K11","K12","K13","K14","L1","L2","L3","L4","L5","L6","L7","L8","L9","L10","L11","L12","L13","L14"]
  constructor(
    public rest: RestService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/accounting')   
    else this.search()
  }

  public async select(cell: string) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('checkout', 'save', { 
      module: this.rest.temp.type,
      name: this.rest.temp.name,
      value: cell
    }).then((resp) => {
      this.rest.defreeze()
      this.rest.accounting[this.rest.temp.type][this.rest.temp.name] = cell 
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public search() {
    let key = this.keyword.toUpperCase()
    let temp = this.cell.filter((item) => {
      return item.search(key) >= 0
    })
    this.list = temp
  }
}
