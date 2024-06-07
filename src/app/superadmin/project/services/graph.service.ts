import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = environment.baseUrl;
  baseUrl2 = environment.baseUrl2;
  private dataUrl = 'assets/testdata.json'; 
  constructor(private http:HttpClient) { }

  getAllSurveyAssignmentByClientID(id:any,orderBy: any, page: any, size: any, sortBy: any):Observable<any>{
    return this.http.get<any>(this.baseUrl+ `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getFudsSUrveyDetailsForReport(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`grapg/fuds/StaticsurveyScore22?surveyAssignmentClientId=${id}`);
  }

  getFudsSurveyLineGrapah(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/fuds/agree/imp/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getFudsForProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/fuds/staticdata?surveyAssignmentClientId=${id}`,'')
  }

}
