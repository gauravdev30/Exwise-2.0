import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getCount(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl+ `survey-assignments/getSurveycountByStatusAndClientId?clientId=${id}`);
  }
  searchByID(id:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/${id}`);
  }

  getOneToOneInterview(){
    return this.http.get<any>(this.baseUrl+ `one-to-one-interviews`);
  }

  getUserByClientID(id:any){
    return this.http.get<any>(this.baseUrl+ `users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }

  createMeeting(obj:any){
    return this.http.post<any>(this.baseUrl+ `one-to-one-interviews/save`,obj)
  }
  updateMeeting(obj:any,id:any){
    return this.http.put<any>(this.baseUrl+ `one-to-one-interviews/${id}`,obj)
  }
  getMeetingByID(id:any){
    return this.http.get<any>(this.baseUrl+ `one-to-one-interviews/${id}`);
  }

  getSurveyByID(id:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/${id}`);
  }

  saveSurvey(obj:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/save`,obj);
  }

  getByUserID(id:any){
    return this.http.get<any>(this.baseUrl+ `users/${id}`);
  }

  focusGroupMeeting(obj:any){
    return this.http.post<any>(this.baseUrl+ `focus-group-meetings/save`,obj);
  }

  focusgroupByClientId(id:any){
    return this.http.get<any>(this.baseUrl+ `focus-group/${id}`);
  }

  focusgroup(){
    return this.http.get<any>(this.baseUrl+ `focus-group`);
  }

}
