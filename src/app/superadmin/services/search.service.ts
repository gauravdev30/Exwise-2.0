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

  getResult(value: any) {
    this.searchResults.next(value);
  }

  sendResults(): Observable<any> {
    return this.searchResults.asObservable();
  }

  constructor(private http: HttpClient) {}

  searchclientRecent(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'clients/search?keyword=' + keyword);
  }
  searchclientOpen(keyword: any): Observable<any> {
    return this.http.get(this.baseurl + 'clients/search?keyword=' + keyword);
  }
}