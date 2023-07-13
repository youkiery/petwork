import { Component, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage {
  public key: string = ''
  public key2: string = ''
  public list: any = []
  public petlist: any = []
  public selected = false
  public timeout = null
  public sex = ['-', 'Đực', 'Cái']
  @ViewChild('input') input: any;
  constructor(
    public rest: RestService
  ) { }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.root()
    else this.input.setFocus();
  }

  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.key.length < 1) this.list = []
      else {
        this.rest.checkpost('customer', 'petsearch', {
          key: this.key
        }).then((resp) => {
          this.list = resp.list
        }, () => { })
      }
    }, 300);
  }

  public selectcurrent() {
    this.rest.temp.phone = this.key
    this.rest.back()
  }

  public select(i: number) {
    this.rest.temp.name = this.list[i].name
    this.rest.temp.phone = this.list[i].phone
    this.rest.temp.address = this.list[i].address
    this.petlist = this.list[i].pet
    this.selected = true
  }

  public selectpet(i: number) {
    this.rest.temp.pet = this.petlist[i].name
    this.rest.temp.petid = this.petlist[i].id
    this.rest.temp.weight = this.petlist[i].weight
    this.rest.temp.age = this.petlist[i].age
    this.rest.temp.gender = this.petlist[i].gender
    this.rest.temp.species = this.petlist[i].species
    this.rest.back()
  }

  public selectcurrentpet() {
    this.rest.temp.pet = this.key2
    this.rest.back()
  }
}
