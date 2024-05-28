import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseurl = environment.baseUrl;
  searchResults = new BehaviorSubject<any[]>([]);

  getResult(value: any) {
    this.searchResults.next(value);
  }

  sendResults(): Observable<any> {
    return this.searchResults.asObservable();
  }

  constructor(private http: HttpClient) {}

  searchpeoplemetrics(id:any,keyword: any): Observable<any> {
    return this.http.get(this.baseurl + `people-metrics/search?clientId=${id}&keyword=` + keyword);
  }
  searchUsers(id:any,keyword: any): Observable<any> {
    return this.http.get(this.baseurl + `users/users/search?clientId=${id}&keyword=${keyword}`);
  }
  searchSurvey(id:any,keyword:any):Observable<any>{
    return this.http.get(this.baseurl+`survey-assignments/surveyAssignments/search?clientId=${id}&keyword=${keyword}`)
  }
  searchFocusgroup(id:any,keyword:any):Observable<any>{
    return this.http.get(this.baseurl+`focus-group/Search?clientId=${id}&keyword=${keyword}`)
  }
}
