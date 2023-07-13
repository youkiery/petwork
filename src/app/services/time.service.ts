import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() { }

  public isisodate(isostring: string = '') {
    let date = isostring.split('T')
    let time = date[0].split('-')
    if (isFinite(Number(time[0])) && isFinite(Number(time[1])) && isFinite(Number(time[2])) && time[0].length == 4 && time[1].length == 2 && time[2].length == 2) return true
    return false
  }

  public timetodate(time: number) {
    let datetime = new Date(Number(time))
    let date = datetime.getDate().toString()
    date = (Number(date) < 10 ? '0' + date : date)
    let month = (datetime.getMonth() + 1).toString()
    month = (Number(month) < 10 ? '0' + month : month)
    let year = datetime.getFullYear()
    return date + '/' + month + '/' + year
  }

  public timetodates(time: number) {
    let datetime = new Date(Number(time))
    let date = datetime.getDate().toString()
    date = (Number(date) < 10 ? '0' + date : date)
    let month = (datetime.getMonth() + 1).toString()
    month = (Number(month) < 10 ? '0' + month : month)
    let year = datetime.getFullYear()
    let hour = datetime.getHours().toString()
    hour = (Number(hour) < 10 ? '0' + hour : hour)
    let minute = datetime.getMinutes().toString()
    minute = (Number(minute) < 10 ? '0' + minute : minute)
    return date + '/' + month + '/' + year + ' '+ hour + ':'+ minute
  }

  public timetoisodate(time: number) {
    return this.datetoisodate(this.timetodate(time))
  }

  public isodatetotime(time: string) {
    let datetime = time.split("T")[0].split('-')
    if (datetime.length === 3) return (new Date(Number(datetime[0]), Number(datetime[1]) - 1, Number(datetime[2]))).getTime()
    return 0
  }

  public isodatetodate(time: string) {
    let datetime = time.split("T")[0].split('-')
    
    return datetime[2] + '/' + datetime[1] + '/' + datetime[0]
  }

  public datetotime(date: string) {
    let datestring = date.split("/")
    let datetime = new Date(Number(datestring['2']), Number(datestring['1']) - 1, Number(datestring[0]))
    return datetime.getTime()
  }

  public datetoisodate(date: string) {
    let datestring = date.split("/")
    return datestring['2'] +'-'+ (datestring['1'].length < 2 ? '0' : '') + datestring['1'] + '-'+ (datestring[0].length < 2 ? '0' : '') + datestring[0] + 'T00:00:00.000Z'
  }
}
