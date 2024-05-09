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

  getOneToOneInterviewCount(){
    return this.http.get<any>(this.baseUrl+`one-to-one-interviews/count`);
  }

  getOneToOneInterviewByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/filter?status=${status}`);
  }
  
  getOneToOneInterviewById(id:number){
    return this.http.get<any>(this.baseUrl+`one-to-one-interviews/${id}`);
  }


  getFocuseGroupById(id:number){
    return this.http.get<any>(this.baseUrl+`focus-group/${id}`);
  }

  updateFocusGroup(obj:any,id:number){
    return this.http.put<any>(this.baseUrl+`focus-group/${id}`,obj);
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

  getAllSurvey(){
    return this.http.get<any>(this.baseUrl+'survey-types');
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

  focusgroup(id:any){
    return this.http.get<any>(this.baseUrl+ `focus-group/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
  // focusgroup(){
  //   return this.http.get<any>(this.baseUrl+ `focus-group`);
  // }

  getAllQuestions(){
    return this.http.get<any>(this.baseUrl+'questions');
  }

  createQuestion(obj:any){
    return this.http.post<any>(this.baseUrl+'questions/saveWithAns',obj);
  }
  deleteQuestion(id:any){
    return this.http.delete<any>(this.baseUrl+`questions/${id}`);
  }
  getQuestionListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }
  getAllOnetoOneInterview(){
    return this.http.get<any>(this.baseUrl+ `one-to-one-interviews`);
  }

  deleteInterviewOneToOne(id:any){
    return this.http.delete<any>(this.baseUrl+`one-to-one-interviews/${id}`);
  }

  getSurveytListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }

  getClientListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }
  getDetailSurveyList(){
    return this.http.get<any>(this.baseUrl+'survey-assignments/SurveyDetails/1');
  }
  assignSurveyToClient(obj:any){
    return this.http.post<any>(this.baseUrl+'survey-types',obj);
  }

  onDeleteFocusGroup(id:any){
    return this.http.delete<any>(this.baseUrl+ `focus-group/${id}`);
  }

  createGroup(obj:any){
    return this.http.post<any>(this.baseUrl+`focus-group/save`,obj);
  }

  createUser(obj:any){
    return this.http.post<any>(this.baseUrl+'users/save',obj);
  }

  updateUser(obj:any,id:any){
    return this.http.put<any>(this.baseUrl+`users/${id}`,obj);
  }

  deleteUser(id:number){
    return this.http.delete<any>(this.baseUrl+`users/${id}`);
  }

  getAllusersByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }

  //people-metrics

  peoplemetrics(){
    return this.http.get<any>(this.baseUrl+'people-metrics');
  }


}
