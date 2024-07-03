import { Injectable } from '@angular/core';
import { environment } from '../../../environment/enviorment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchuserService {
  baseurl = environment.baseUrl;
  searchResults = new BehaviorSubject<any[]>([]);
  searchKeyword = new BehaviorSubject<any[]>([]);
  getResult(value: any) {
    this.searchResults.next(value);
  }

  sendResults(): Observable<any> {
    return this.searchResults.asObservable();
  }

  setSearchKeyword(keyword: any): void {
    this.searchKeyword.next(keyword);
  }

  getSearchKeyword(): Observable<any> {
    return this.searchKeyword.asObservable();
  }

  constructor(private http: HttpClient) {}

  searchreminder(keyword:any,userid:any):Observable<any>{
    const currentDate = this.formatDate(new Date());
    return this.http.get<any>(this.baseurl+`focus-group-meetings/upcomingEvents/pagination/search?currentDate1=${currentDate}&keyword=${keyword}&userId=${userid}`);
  }
  searchres(userid:any,keyword:any):Observable<any>{
    return this.http.get<any>(this.baseurl+`employee-responses/searchAllsurveyForEmp?clientEmpId=${userid}&keyword=${keyword}`);
  }
  readNotifications(id:any):Observable<any>{
    return this.http.put<any>(this.baseurl+`notifications/Notifications/${id}`,'')
  }



  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
