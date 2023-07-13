import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelconfigform',
  templateUrl: './excelconfigform.page.html',
  styleUrls: ['./excelconfigform.page.scss'],
})
export class ExcelconfigformPage {
  public replace: SafeHtml = ''

  constructor(
    public rest: RestService,
    public dom: DomSanitizer,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
    else this.replace = this.dom.bypassSecurityTrustHtml(`
      {customer}: Tên khách hàng <br>
      {sampleid}: Sample ID <br>
      {address}: Địa chỉ <br>
      {name}: Tên thú cưng <br>
      {weight}: Trọng lượng <br>
      {age}: Tuổi thú cưng <br>
      {gender}: Giới tính thú cưng <br>
      {type}: Loại thú cưng <br>
      {serial}: Số serial <br>
      {sampletype}: Loại mẫu <br>
      {samplenumber}: Số mẫu <br>
      {samplesymbol}: Ký hiệu mẫu <br>
      {samplestatus}: Tình trạng mẫu <br>
      {doctor} {doctor2}: Bác sỹ làm <br>
      {time}: Ngày kiểm tra <br>
      {DD}, {MM}, {YY}: Ngày tháng năm <br>
      {target}: Kết quả xét nghiệm <br>
      {restar}: Triệu chứng tương ứng <br>
      {temperate}: Thân nhiệt <br>
      {treat1} {treat2} {treat3}: Triệu chứng lâm sàng <br>
      {treating1} {treating2} {treating}: Triệu chứng cận lâm sàng <br>
      {result1} {result2}: Kết luận <br>
      {drug1} {drug2} {drug3} {drug4} {drug5}: Cách điều trị`)
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('admin', 'configform', this.rest.temp).then((resp) => {
      this.rest.defreeze()      
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public print() {
    // browser
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.temp.html);
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }
}
