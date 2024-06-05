import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllSurveyAssignmentByClientID(id:any,orderBy: any, page: any, size: any, sortBy: any):Observable<any>{
    return this.http.get<any>(this.baseUrl+ `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }
}
