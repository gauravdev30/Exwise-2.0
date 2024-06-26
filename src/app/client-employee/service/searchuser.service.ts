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
    return this.http.get<any>(this.baseurl+`focus-group-meetings/upcomingEvents/pagination/search?keyword=${keyword}&userId=${userid}`);
  }
  searchres(userid:any,keyword:any):Observable<any>{
    return this.http.get<any>(this.baseurl+`employee-responses/searchAllsurveyForEmp?clientEmpId=${userid}&keyword=${keyword}`);
  }
}
