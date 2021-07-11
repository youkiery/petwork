import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public editor = 0
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.rest.temp.edit.time.cometime = this.rest.today
    this.rest.temp.edit.time.calltime = this.rest.today
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.temp.suggesttype = name
    this.rest.temp.suggest = this.rest.temp.edit.customer[name]
    this.rest.temp.suggestList = [] 
    this.rest.router.navigateByUrl('/vaccine/suggest')
  }

  public datepicker(name: string) {
    this.rest.temp.edit.time[name] = this.rest.isodatetodate(this.rest.temp.edit.picker[name])
  }

  public clear() {
    this.rest.temp.edit.customer.name = ''
    this.rest.temp.edit.customer.phone = ''
    this.rest.temp.edit.pets = []
    this.rest.temp.edit.pet = 0
    this.editor = 0
  }

  public edit(index: number) {
    this.rest.temp.edit.customer.name = this.rest.temp.new[index].name
    this.rest.temp.edit.customer.phone = this.rest.temp.new[index].number
    this.rest.temp.disease.forEach((item, i_index) => {
      if (item.name == this.rest.temp.new[index].vaccine) this.rest.temp.edit.disease = i_index
    })
    
    this.rest.temp.edit.picker.calltime = this.rest.datetoisodate(this.rest.temp.new[index].calltime)

    this.rest.temp = this.rest.temp.new[index]
    this.editor = this.rest.temp.new[index].id
  }

  public async update() {
    await this.rest.freeze('Đang thêm tiêm phòng')
    this.rest.checkpost('vaccine', 'update', {
      id: this.editor,
      disease: this.rest.temp.disease[this.rest.temp.edit.disease].id,
      calltime: this.rest.temp.edit.time.calltime
    }).then((response) => {
      this.rest.temp.edit.customer.name = ''
      this.rest.temp.edit.customer.phone = ''
      this.rest.temp.edit.pets = []
      this.rest.temp.edit.pet = 0
      this.editor = 0
      this.rest.temp.new = response.new
      this.rest.notify('Đã cập nhật lịch tiêm vaccine')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async save() {
    if (!this.rest.temp.edit.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.edit.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang thêm tiêm phòng')
      this.rest.checkpost('vaccine', 'insert', {
        customer: this.rest.temp.edit.customer.name,
        phone: this.rest.temp.edit.customer.phone,
        pet: this.rest.temp.edit.pet,
        disease: this.rest.temp.disease[this.rest.temp.edit.disease].id,
        cometime: this.rest.temp.edit.time.cometime,
        calltime: this.rest.temp.edit.time.calltime
      }).then((response) => {
        this.rest.temp.edit.customer.name = ''
        this.rest.temp.edit.customer.phone = ''
        this.rest.temp.edit.pets = []
        this.rest.temp.edit.pet = 0
        this.rest.temp.new = response.new
        this.rest.temp.data = response.data
        this.rest.notify('Đã thêm lịch tiêm vaccine')
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    } 
  }
}
