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
  
  clientByID(id:any){
    return this.http.get<any>(this.baseUrl+ `clients/getById?id=${id}`);
  }

  getCount(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl+ `survey-assignments/getSurveycountByStatusAndClientId?clientId=${id}`);
  }
  searchByID(id:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/${id}`);
  }

  getOneToOneInterview(userId:number){
    return this.http.get<any>(this.baseUrl+ `one-to-one-interviews/ByUserId?userId=${userId}`);
  }

  getOneToOneInterviewCount(){
    return this.http.get<any>(this.baseUrl+`one-to-one-interviews/count`);
  }

  getOneToOneInterviewByStatus(status: any,userId:any) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/filterByUserId?status=${status}&userId=${userId}`);
  }
  
  getOneToOneInterviewById(id:number){
    return this.http.get<any>(this.baseUrl+`one-to-one-interviews/${id}`);
  }


  getFocuseGroupById(id:number){
    return this.http.get<any>(this.baseUrl+`focus-group/${id}`);
  }

  updateFocusGroup(id:any,obj:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+`focus-group/${id}`,obj);
  }

  getUserByClientID(id:any){
    return this.http.get<any>(this.baseUrl+ `users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }

  getAllFocusGroupByClientId(id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`focus-group/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
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

  getSurveySategByID(id:any){
    return this.http.get<any>(this.baseUrl+ `stage-controller/getBySurveyId/${id}`);
  }

  getAllSurveyByClientID(id:any,orderBy: any, page: any, size: any, sortBy: any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getAllWthSurveyByClientID(id:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/getAllClientIdWithoutPage?clientId=${id}`);
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

  // focusgroupByClientId(id:any){
  //  return this.http.get<any>(this.baseUrl+ `focus-group/${id}`);
  // }

  getFocusGroupByID(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`focus-group/${id}`);
  }

  deleteFocuseGroupByID(id:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl+`focus-group/${id}`);
  }

  removeFocusFocusGroupMamberByID(id:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl+`focus-group-members/${id}`);
  }

  addMemberToFocusGroupByID(id:number,obj:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+`focus-group/${id}`,obj);
  }

  focusgroup(id:any){
    return this.http.get<any>(this.baseUrl+ `focus-group/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
  // focusgroup(){
  //   return this.http.get<any>(this.baseUrl+ `focus-group`);
  // }
 getAllCoCreate(id:any){
  return this.http.get<any>(this.baseUrl+ `getallSuggestionsByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
 }
 Cocreate(obj:any){
  return this.http.post<any>(this.baseUrl+'create',obj);
}
  getAllQuestions(){
    return this.http.get<any>(this.baseUrl+'questions');
  }
  getAllQuestionsPage(page:any,size:any){
    return this.http.get<any>(this.baseUrl+`questions/page?orderBy=desc&page=${page}&size=${size}&sortBy=id`);
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

  getMeetingsDateByMonth(month: number, year: number, userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl+`focus-group-meetings/dateByMonth?month=${month}&userId=${userId}&year=${year}`)
  }

  getEventOnDateByUserID(date:any,userId:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`focus-group-meetings/eventsOnDate?date=${date}&userId=${userId}`)
  }

  getSurveytListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }

  getClientListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }
  getDetailSurveyList(id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`survey-assignments/SurveyDetails/${id}`);
  }

  assignSurveyToClient(obj:any){
    return this.http.post<any>(this.baseUrl+'survey-types',obj);
  }

  surveyAssignToClient(obj:any){
    return this.http.post<any>(this.baseUrl+'survey-assignments/save',obj);
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

  updateUser(id:any,obj:any){
    return this.http.put<any>(this.baseUrl+`users/${id}`,obj);
  }

  deleteUser(id:number){
    return this.http.delete<any>(this.baseUrl+`users/${id}`);
  }

  getAllusersByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }

  uploadUserfromExcel(obj:any){
    return this.http.post<any>(this.baseUrl+'users/uploadUsers',obj);
  }

  //people-metrics

  peoplemetrics(obj:any){
    return this.http.post<any>(this.baseUrl+'people-metrics/saveWithHistoricalData',obj);
  }

  addPeopleMetricsWithExcel(obj:any){
    return this.http.post<any>(this.baseUrl+'people-metrics/saveWithExcel',obj);
  }

  peoplemetricsByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`people-metrics/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
   getMatrixById(id:any){
    return this.http.get<any>(this.baseUrl+`people-metrics/${id}`);
   }

   deleteMatrixById(id:any){
    return this.http.delete<any>(this.baseUrl+`people-metrics/${id}`);
   }

   updateMetric(id:any,obj:any,){
    return this.http.put<any>(this.baseUrl+`people-metrics/${id}`,obj);
  }

   

   //Communication-Ex

   createCommunication(obj:any){
    return this.http.post<any>(this.baseUrl+'createCommunication',obj);
  }
  updateCommunication(id:any,obj:any){
    return this.http.put<any>(this.baseUrl+`Communication/${id}`,obj);
  }

  deleteCommunication(id:number){
    return this.http.delete<any>(this.baseUrl+`${id}`);
  }

  saveeDoc(obj:any){
    return this.http.post<any>(this.baseUrl+'saveImage',obj);
  }

  communicationByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`getallCommunicationByClientIdwithoutPage?clientId=${id}`);
  }

  //JpurneyMap

  journeyMapnByClientId(id:any){
    return this.http.get<any>(`http://ec2-13-201-115-38.ap-south-1.compute.amazonaws.com:8080/exwise2/api/getStaticJourneyMap?clientId=${id}`);
  }

  journeyMapScoreByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`ScoreController/getJourneyMapLineChart?clientId=${id}`);
  }

  journeyMapCountByClientId(id:any){
    return this.http.get<any>(this.baseUrl+`ScoreController/getJourneyMapProgressChart?clientId=${id}`);
  }

  //ex-dignostics
  getAllanalyseById() {
    return this.http.get<any>(this.baseUrl + 'ex-diagnostic-reports' );
  }
getanalyseById(clientId: number) {
  return this.http.get<any>(this.baseUrl + `ex-diagnostic-reports/${clientId}` );
}

updateanalysetById(id: any,obj: any) {
  return this.http.put<any>(this.baseUrl + `ex-diagnostic-reports/${id}`, obj);
}

createanalyse(obj: any): Observable<any> {
  return this.http.post<any>(this.baseUrl + 'ex-diagnostic-reports/save', obj);
}

deleteanalyse(clientId: number) {
  return this.http.delete<any>(this.baseUrl + 'ex-diagnostic-reports/' + clientId);
}

//project dashboard

getListen(clientId: any) {
  return this.http.get<any>(this.baseUrl + `getConsultingPhase?clientId=${clientId}` );
}

getListenCount(clientId: any) {
  return this.http.get<any>(this.baseUrl + `getCount?clientId=${clientId}` );
}

}
