import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/enviorment.prod';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

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

  searchclientRecent(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'clients/search?keyword=' + keyword);
  }
  searchclientOpen(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'clients/search?keyword=' + keyword);
  }
  searchquestion(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'questions/Questions/search?keyword=' + keyword);
  }
  searchsurvey(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'survey-types/Survey/search?keyword=' + keyword);
  }
  searchinterviews(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'one-to-one-interviews/search?keyword=' + keyword);
  }
}