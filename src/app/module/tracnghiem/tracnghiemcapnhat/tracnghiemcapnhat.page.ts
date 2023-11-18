import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-tracnghiemcapnhat',
  templateUrl: './tracnghiemcapnhat.page.html',
  styleUrls: ['./tracnghiemcapnhat.page.scss'],
})
export class TracnghiemcapnhatPage implements OnInit {
  public name = 'Chưa chọn file Excel'
  public max = 960
  public thutu = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;

  constructor(
    public rest: RestService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/tracnghiem')
    else if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public themcauhoi() {
    this.rest.temp.cauhoi.push({
      id: 0,
      noidung: "",
      hinhanh: "",
      danhsach: [
        { id: 0, noidung: "", dapan: 1 },
        { id: 0, noidung: "", dapan: 0 },
        { id: 0, noidung: "", dapan: 0 },
        { id: 0, noidung: "", dapan: 0 },
      ]
    })
  }

  public xoacauhoi(thutu: number) {
    this.rest.temp.cauhoi = this.rest.temp.cauhoi.filter((cauhoi, index) => {
      return thutu !== index
    })
    if (!this.rest.temp.cauhoi.length) this.themcauhoi()
  }

  public async capnhatchuyenmuc() {
    if (this.rest.temp.socau < 1 && this.rest.temp.thoigian < 1) return this.rest.notify("Số câu và thời gian làm bài > 0 phút")
    await this.rest.freeze('Đang tải dữ liệu......')
    await this.uploadAllImage()
    this.rest.checkpost('tracnghiem', 'capnhatchuyenmuc', {
      dulieu: this.rest.temp
    }).then(resp => {
      this.rest.defreeze()
      this.rest.tracnghiem.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }

  public chonfile() {
    this.pwaphoto.nativeElement.click();
  }

  public async thaydoifile() {
    let file = this.pwaphoto
    const fileList: FileList = file.nativeElement.files
    if (!fileList[0]) return this.rest.notify('Chưa chọn file excel')
    let body = new FormData();
    await this.rest.freeze('Đang tải dữ liệu...')
    body.append('file', fileList[0]);
    body.append('session', this.rest.session);
    body.append('type', 'tracnghiem');
    body.append('action', 'tailendanhsach');
    body.append('version', this.rest.version.toString());

    this.rest.http.post(this.rest.baseurl, body).toPromise().then((resp: any) => {
      this.rest.defreeze()
      if (resp.nogin) {
        this.rest.notify("Phiên đăng nhập hết hạn")
        this.rest.logout()
      }
      else {
        resp.cauhoi.forEach(cauhoi => {
          this.rest.temp.cauhoi.push(cauhoi)
        });
        this.rest.notify(resp.messenger)
      }
    }, (error) => {
      this.rest.defreeze()
    })
  }

  public taifilemau() {
    window.open(this.rest.include + "/file-mau-import-cau-hoi-trac-nghiem.xlsx")
  }

  public upload(thutu: number) {
    this.thutu = thutu
    this.pwaphoto.nativeElement.click();
  }

  public xoaanh(thutu: number) {
    this.rest.temp.cauhoi[this.thutu].hinhanh = ""
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      await this.rest.freeze('Đang tải dữ liệu...')
      for (let i = 0; i < fileList.length; i++) {
        await this.firstFileToBase64(fileList[i]).then((result: string) => {
          let image = new Image();
          image.src = result
          image.onload = () => {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let rate = 1
            if (image.width > this.max || image.height > this.max) {
              if (image.width > image.height) rate = image.width / this.max
              else rate = image.height / this.max
            }
            let newWidth = image.width / rate
            let newHeight = image.height / rate
            canvas.width = newWidth
            canvas.height = newHeight
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
            this.rest.temp.cauhoi[this.thutu].hinhanh = canvas.toDataURL('image/jpeg')
          }
        }, (err: any) => { });
      }
      this.rest.defreeze()
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  public async uploadAllImage() {
    return new Promise((resolve) => {
      let count = this.rest.temp.cauhoi.length
      if (count == 0) resolve(true)
      this.rest.temp.cauhoi.forEach((item, index) => {
        if (item.hinhanh.length < 200) {
          count--
          if (count == 0) resolve(true)
        }
        else {
          this.uploadImage(item.hinhanh).then((url) => {
            this.rest.temp.cauhoi[index].hinhanh = url
            count--
            if (count == 0) resolve(true)
          })
        }
      });
    })
  }

  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = '/storage/' + this.rest.home.branch + '/' + this.rest.home.prefix + '/' + new Date().getTime() + '.jpg';
      let fileRef = this.storage.ref(path);
      let base64 = image.substr(image.indexOf(',') + 1);
      let metadata = {
        contentType: 'image/jpeg',
      };

      fileRef.putString(base64, 'base64', metadata).then((response) => {
        fileRef.getDownloadURL().subscribe(url => {
          resolve(url)
        })
      }, (error) => {
        resolve('')
      })
    })
  }
}
