import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environment/enviorment.prod'; 

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllSurvey(){
    return this.http.get<any>(this.baseUrl+'survey-types');
  }
  
  getAllStagesList(){
    return this.http.get<any>(this.baseUrl+'stage-controller');
  }

  getAllSubPhasesList(){
    return this.http.get<any>(this.baseUrl+'sub-phase-controller');
  }

  createSurvey(obj:any){
    return this.http.post<any>(this.baseUrl+'survey-types',obj);
  }

  createStage(obj:any){
    return this.http.post<any>(this.baseUrl+'stage-controller',obj);
  }

  createSubstage(obj:any){
    return this.http.post<any>(this.baseUrl+'sub-phase-controller',obj)
  }

}
