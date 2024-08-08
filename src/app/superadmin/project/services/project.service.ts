import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl;
  baseUrl2 = environment.baseUrl2;
  excelFormatDownloadUrl = environment.excelFormatFileUrl;
  constructor(private http:HttpClient) { }
  
  clientByID(id:any){
    return this.http.get<any>(this.baseUrl+ `clients/getById?id=${id}`);
  }

  getExcelFile(): Observable<Blob> {
    return this.http.get(this.excelFormatDownloadUrl, { responseType: 'blob' });
  }

  getNotifications(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `notifications/getNotifications/ByuserId/${id}`)
  }
  readNotifications(id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `notifications/Notifications/${id}`, '')
  }
  updateclientByID(id: any, obj: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `clients/${id}`, obj);
  }

  getCount(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `survey-assignments/getSurveycountByStatusAndClientId?clientId=${id}`);
  }
  searchByID(id: any) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/${id}`);
  }

  searchGroup(data: any): Observable<any> {
    return this.http.get(this.baseUrl + 'users/users/search?clientId=' + data.clientId + '&keyword=' + data.keyword)
  }

  searchUserByFilter(data:any):Observable<any> {
  return this.http.get(this.baseUrl + `users/users/searchWithFilter?clientId=${data.clientId}&${data.selectedParent}=${data.selectedChild}`)
  }

  createFeedback(obj: any) {
    return this.http.post<any>(this.baseUrl + `Email/onetoone/sendClientFeedbackEmail`, obj)
  }

  getOneToOneInterview(userId: number) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/ByUserId?userId=${userId}`);
  }

  getOneToOneInterviewCombine(currentDate: string, userId: number) {
    return this.http.get<any>(this.baseUrl + `focus-group-meetings/api/focus-group-meetings/upcomingEvents?currentDate1=${currentDate}&userId=${userId}`);
  }

  getOneToOneInterviewCountByUserId(userId: any) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/count/userId?userid=${userId}`);
  }

  getOneToOneInterviewByStatus(currentdate: string, status: any, userId: any) {
    return this.http.get<any>(this.baseUrl + `focus-group-meetings/api/focus-group-meetings/filterForAdmin?currentDate1=${currentdate}&status=${status}&userId=${userId}`);
  }

  getOneToOneInterviewById(id: number) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/${id}`);
  }

  getFocuseGroupMeetingById(id: number) {
    return this.http.get<any>(this.baseUrl + `focus-group-meetings/${id}`);
  }


  getFocuseGroupById(id: number) {
    return this.http.get<any>(this.baseUrl + `focus-group/${id}`);
  }

  updateFocusGroup(id: any, obj: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `focus-group/${id}`, obj);
  }

  getUserByClientID(id: any) {
    return this.http.get<any>(this.baseUrl + `users/getByClientIdWithoutPage?clientId=${id}`);
  }

  getUserByClientIDWithPagination(id: any, orderBy: string, page: number, size: number, sortBy: string) {
    return this.http.get<any>(this.baseUrl + `users/getByClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getAllFocusGroupByClientId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl2 + `focus-group/ByClientIdWithoutPage?clientId=${id}`);
  }

  createMeeting(obj: any) {
    return this.http.post<any>(this.baseUrl + `one-to-one-interviews/save`, obj);
  }

  createFocuseGroupMeeting(obj: any) {
    return this.http.post<any>(this.baseUrl + `focus-group-meetings/save`, obj);
  }

  updateInterview(id: any, obj: any) {
    return this.http.put<any>(this.baseUrl + `one-to-one-interviews/${id}`, obj)
  }

  updateMeeting(id: any, obj: any) {
    return this.http.put<any>(this.baseUrl + `focus-group-meetings/${id}`, obj)
  }

  getMeetingByID(id: any) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/${id}`);
  }

  getAllReminderSurveyByClientId(clientId:number):Observable<any>{
    return this.http.get<any>(this.baseUrl2+`SurveyReminderStatus-controller/reminder/countByClientId?clientId=`+clientId);
  }

  getAllSurveysForProjectDashboardByClientId(clientId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl2+`SurveyReminderStatus-controller/getAllClientIdWithoutPage?clientId=`+clientId);
  }

  getSurveyByID(id:any){
    return this.http.get<any>(this.baseUrl+ `survey-assignments/${id}`);
  }

  getAllSurvey() {
    return this.http.get<any>(this.baseUrl + `survey-types/getAll?orderBy=asc&sortBy=id`);
  }

  getSurveySategByID(id: any, isStatic: boolean) {
    return this.http.get<any>(this.baseUrl + `survey-types/SurveyDetails%7D?id=${id}&isStatic=${isStatic}`);
  }
  getSatebysubphasegByID(id: any, isStatic: boolean) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/getByStageId?isStatic=${isStatic}&stageId=${id}`);
  }

  getAllSurveyByClientID(id: any, orderBy: any, page: any, size: any, sortBy: any) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  updateSurveyAssignmentActiveDeactiveById(id:number,isActive:boolean):Observable<any>{
    return this.http.put<any>(this.baseUrl+`survey-assignments/activeDeactive/1?status=${isActive}`,'')
  }

  getAllWthSurveyByClientID(id: any) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/getAllClientIdWithoutPage?clientId=${id}`);
  }

  getAllSurveyResponseDetailsByAssignmentId(id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`survey-assignments/responseDetails/${id}`);
  }

  getAllWhoHasAssignedByAssignmentId(id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`survey-assignments/whoHasBeenAssigned/${id}`);
  }

  saveSurvey(obj: any) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/save`, obj);
  }

  getByUserID(id: any) {
    return this.http.get<any>(this.baseUrl + `users/${id}`);
  }

  focusGroupMeeting(obj: any) {
    return this.http.post<any>(this.baseUrl + `focus-group-meetings/save`, obj);
  }

  // focusgroupByClientId(id:any){
  //  return this.http.get<any>(this.baseUrl+ `focus-group/${id}`);
  // }

  getFocusGroupByID(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `focus-group/${id}`);
  }

  deleteFocuseGroupByID(id: number,obj:any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `focus-group/${id}`,obj);
  }

  removeFocusFocusGroupMamberByID(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `focus-group-members/${id}`);
  }

  addMemberToFocusGroupByID(id: number, obj: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `focus-group/${id}`, obj);
  }

  focusgroup(id: any) {
    return this.http.get<any>(this.baseUrl + `focus-group/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
  // focusgroup(){
  //   return this.http.get<any>(this.baseUrl+ `focus-group`);
  // }
  getAllCoCreate(id: any) {
    return this.http.get<any>(this.baseUrl + `getallSuggestionsByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
  Cocreate(obj: any) {
    return this.http.post<any>(this.baseUrl + 'create', obj);
  }
  
  getAllQuestions() {
    return this.http.get<any>(this.baseUrl + 'questions');
  }

  getAllQuestionsWIthOptions() {
    return this.http.get<any>(this.baseUrl + 'questions/getAllQuestionsWithAnswer');
  }

  searchQuestion(keyword: any): Observable<any> {
    return this.http.get(this.baseUrl + `questions/Questions/search?keyword=${keyword}`);
  }

  updateSurveyQuestions(id:number,obj:any):Observable<any>{
    return this.http.put(this.baseUrl+`sub-phase-controller/`+id,obj);
  }

  getAllQuestionsPage(page: any, size: any) {
    return this.http.get<any>(this.baseUrl + `questions/page?orderBy=desc&page=${page}&size=${size}&sortBy=id`);
  }

  createQuestion(obj: any) {
    return this.http.post<any>(this.baseUrl + 'questions/saveWithAns', obj);
  }

  getQuestionwithAnswerVyId(questionId:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`questions/withAnswer/${questionId}`);
  }

  updateQuestionwithAnswerById(questionId:number,obj:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+`questions/updateQuestionWithAns/${questionId}`,obj);
  }

  deleteQuestion(id: any) {
    return this.http.put<any>(this.baseUrl + `questions/${id}`,{active:false});
  }

  getQuestionListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }


  getAllOnetoOneInterview() {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews`);
  }

  softDeleteInterviewOneToOne(id: any) {
    return this.http.put<any>(this.baseUrl + `one-to-one-interviews/softDelete/${id}`, '');
  }

  getMeetingsDateByMonth(month: number, year: number, userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `focus-group-meetings/dateByMonth?month=${month}&userId=${userId}&year=${year}`)
  }

  getEventOnDateByUserID(date: any, userId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `focus-group-meetings/eventsOnDate?date=${date}&userId=${userId}`)
  }

  getSurveytListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }

  getClientListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }

  getDetailSurveyList(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `survey-assignments/SurveyDetails/${id}`);
  }

  assignSurveyToClient(obj: any) {
    return this.http.post<any>(this.baseUrl + 'survey-types', obj);
  }

  surveyAssignToClient(obj: any) {
    return this.http.post<any>(this.baseUrl + 'survey-assignments/bulk/save', obj);
  }

  onDeleteFocusGroup(id: any) {
    return this.http.delete<any>(this.baseUrl + `focus-group/${id}`);
  }

  createGroup(obj: any) {
    return this.http.post<any>(this.baseUrl + `focus-group/save`, obj);
  }

  createUser(obj: any) {
    return this.http.post<any>(this.baseUrl + 'users/save', obj);
  }

  updateUser(id: any, obj: any) {
    return this.http.put<any>(this.baseUrl + `users/${id}`, obj);
  }

  deleteUser(id: number) {
    return this.http.put<any>(this.baseUrl + `users/softDelete/${id}`,'');
  }

  getAllusersByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }

  uploadUserfromExcel(id: any, obj: any) {
    return this.http.post<any>(this.baseUrl + `users/uploadUsers?clientId=${id}`, obj);
  }

  //people-metrics

  peoplemetrics(obj: any) {
    return this.http.post<any>(this.baseUrl + 'people-metrics/saveWithHistoricalData', obj);
  }

  addPeopleMetricsWithExcel(obj: any) {
    return this.http.post<any>(this.baseUrl + 'people-metrics/saveWithExcel', obj);
  }

  peoplemetricsByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `people-metrics/ByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`);
  }
  getMatrixById(id: any) {
    return this.http.get<any>(this.baseUrl + `people-metrics/${id}`);
  }

  deleteMatrixById(id: any) {
    return this.http.delete<any>(this.baseUrl + `people-metrics/${id}`);
  }

  updateMetric(id: any, obj: any,) {
    return this.http.put<any>(this.baseUrl + `people-metrics/${id}`, obj);
  }



  //Communication-Ex

  createCommunication(obj: any) {
    return this.http.post<any>(this.baseUrl + 'createCommunication', obj);
  }
  updateCommunication(id: any, obj: any) {
    return this.http.put<any>(this.baseUrl + `Communication/${id}`, obj);
  }

  deleteCommunication(id: number) {
    return this.http.delete<any>(this.baseUrl + `${id}`);
  }

  saveeDoc(obj: any) {
    return this.http.post<any>(this.baseUrl + 'saveImage', obj);
  }

  communicationByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `getallCommunicationByClientIdwithoutPage?clientId=${id}`);
  }

  //JpurneyMap
  journeyMapnByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `getDynamicJourneyMap1?clientId=${id}`);
  }

  downoadJourneymap(id: any) {
    return this.http.post<any>(this.baseUrl + `excel?clientId=${id}`, '');
  }

  journeyMapStaticClientId(id: any) {
    return this.http.get<any>(`http://ec2-13-201-115-38.ap-south-1.compute.amazonaws.com:8080/exwise2/api/getStaticJourneyMap?clientId=${id}`);
  }

  journeyMapScoreByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `ScoreController/getJourneyMapLineChart?clientId=${id}`);
  }

  journeyMapCountByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + `ScoreController/getJourneyMapProgressChart?clientId=${id}`);
  }

  //ex-dignostics
  getAllanalyseById(clinetId: any) {
    return this.http.get<any>(this.baseUrl + `ex-diagnostic-reports/getAllclientId?clientId=${clinetId}`);
  }
  getanalyseById(clientId: any) {
    return this.http.get<any>(this.baseUrl + `ex-diagnostic-reports/${clientId}`);
  }

  updateanalysetById(id: any, obj: any) {
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
    return this.http.get<any>(this.baseUrl + `getConsultingPhase?clientId=${clientId}`);
  }

  getListenCount(clientId: any) {
    return this.http.get<any>(this.baseUrl + `getCount?clientId=${clientId}`);
  }

  getAllFeedbackByClientId(clientId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl+`quality-assessment-with-client-controller/ByClient?clientId=${clientId}`);
  }

}
