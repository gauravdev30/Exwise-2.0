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

  getAllSurveyPagination(page: number, size: number, orderBy: string, sortBy: string) {
    const url = `${this.baseUrl}survey-types/pagention?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`;
    return this.http.get<any>(url);
  }
  
  getAllStagesList(){
    return this.http.get<any>(this.baseUrl+'stage-controller');
  }

  getStageBySurveyID(id:any){
    return this.http.get<any>(this.baseUrl+`stage-controller/getBySurveyId/${id}`);
  }

  getAllSubPhasesList(){
    return this.http.get<any>(this.baseUrl+'sub-phase-controller');
  }


  createSurvey(obj:any){
    return this.http.post<any>(this.baseUrl+'survey-types/saveWithStages',obj);
  }

  createStage(obj:any){
    return this.http.post<any>(this.baseUrl+'stage-controller/save',obj);
  }

  createSubphase(obj:any){
    return this.http.post<any>(this.baseUrl+'sub-phase-controller/save',obj)
  }

  deleteSurveyById(surveyId:any){
    return this.http.delete<any>(this.baseUrl+'survey-types/'+surveyId);
  }
  
  getSurveyById(surveyId:any){
    return this.http.get<any>(this.baseUrl+'survey-types/'+surveyId);
  }

  updateSurveyById(surveyId:any,obj:any){
    return this.http.put<any>(this.baseUrl+'survey-types/update/'+surveyId,obj);
  }

  deleteStagebyId(stageId:number){
    return this.http.delete<any>(this.baseUrl+'stage-controller/'+stageId);
  }


  deleteSubphaseById(subPhaseId:number){
    return this.http.delete<any>(this.baseUrl+'sub-phase-controller/'+subPhaseId);
  }

  getStageById(stageId:number){
    return this.http.get<any>(this.baseUrl+'stage-controller/'+stageId);
  }

  updateStageById(stageId:number,obj:any){
    return this.http.put<any>(this.baseUrl+'stage-controller/'+stageId,obj);
  }

  getSubphaseById(subPhseId:number){
    return this.http.get<any>(this.baseUrl+'sub-phase-controller/'+subPhseId);
  }

  updateSubPhasebyId(subPhaseId:number,obj:any){
    return this.http.put<any>(this.baseUrl+'sub-phase-controller/'+subPhaseId,obj);
  }

}
