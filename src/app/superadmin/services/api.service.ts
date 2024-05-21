import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/enviorment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllClient(orderBy: any, page: any, size: any, sortBy: any) {
    const url = ` ${this.baseUrl}clients/pagention?orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`;

    return this.http.get<any>(url);
  }

  
  getAllOpenClient(orderBy: any, page: any, size: any, sortBy: any) {
    return this.http.get<any>(
      this.baseUrl + `clients/OpenStatus?orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`
    );
  }


  getCountOfClients() {
    return this.http.get<any>(this.baseUrl + 'countOfClient');
  }
  getClient(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'clients');
  }

  getAllRealityComponent() {
    return this.http.get<any>(this.baseUrl + `component`);
  }


  getAllPinClients() {
    return this.http.get<any>(this.baseUrl + `pinned/clients/${1}`);
  }

  getClientById(clientId: number) {
    return this.http.get<any>(this.baseUrl + 'clients/' + clientId);
  }

  updateClientById(obj: any, id: any) {
    return this.http.put<any>(this.baseUrl + `clients/${id}`, obj);
  }

  createClient(obj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'clients/save', obj);
  }

  deleteClient(clientId: number) {
    return this.http.delete<any>(this.baseUrl + 'clients/' + clientId);
  }

  getCountQuestions(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `questions/count`);
  }
  pinClinet(clientId: number) {
    return this.http.post<any>(
      this.baseUrl + `pinned/pin/client/${1}/${clientId}`,
      ''
    );
  }

  unPinClient(clientId: number) {
    return this.http.delete<any>(
      this.baseUrl + `pinned/unpin/client/${1}/${clientId}`
    );
  }

  getCount(id: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        `survey-assignments/getSurveycountByStatusAndClientId?clientId=${id}`
    );
  }
  searchByID(id: any) {
    return this.http.get<any>(this.baseUrl + ` survey-assignments/${id}`);
  }

  getOneToOneInterview() {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews`);
  }

  getUserByClientID(id: any) {
    return this.http.get<any>(
      this.baseUrl +
        ` users/getByClientId?clientId=${id}&orderBy=asc&page=0&size=10&sortBy=id`
    );
  }

  getAllOnetoOneInterview() {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews`);
  }

  createMeeting(obj: any) {
    return this.http.post<any>(
      this.baseUrl + `one-to-one-interviews/save`,
      obj
    );
  }
  updateMeeting(obj: any, id: any) {
    return this.http.put<any>(
      this.baseUrl + `one-to-one-interviews/${id}`,
      obj
    );
  }
  getMeetingByID(id: any) {
    return this.http.get<any>(this.baseUrl + `one-to-one-interviews/${id}`);
  }

  getAllSurvey() {
    return this.http.get<any>(this.baseUrl + 'survey-types');
  }

  getSurveyByID(id: any) {
    return this.http.get<any>(this.baseUrl + `survey-assignments/${id}`);
  }

  saveSurvey(obj: any) {
    return this.http.get<any>(this.baseUrl + ` survey-assignments/save`, obj);
  }

  getByUserID(id: any) {
    return this.http.get<any>(this.baseUrl + `users/${id}`);
  }

  getByUpdateUserID(id: any, obj: any) {
    return this.http.put<any>(this.baseUrl + ` users/${id}`, obj);
  }
  createUser(obj: any) {
    return this.http.post<any>(this.baseUrl + ` users/save`, obj);
  }

  createGroup(obj: any) {
    return this.http.post<any>(this.baseUrl + ` focus-group/save`, obj);
  }

  focusGroupMeeting(obj: any) {
    return this.http.post<any>(this.baseUrl + `focus-group-meetings/save`, obj);
  }

  focusgroupByClientId(id: any) {
    return this.http.get<any>(this.baseUrl + ` focus-group/${id}`);
  }

  focusgroup() {
    return this.http.get<any>(this.baseUrl + `focus-group`);
  }

  getAllQuestions() {
    return this.http.get<any>(this.baseUrl + 'questions');
  }

  createQuestion(obj: any) {
    return this.http.post<any>(this.baseUrl + 'questions/save', obj);
  }

  getQuestionListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }

  getSurveytListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }

  getClientListByStatus(status: any) {
    return this.http.get<any>(this.baseUrl + 'clients/status/' + status);
  }
  assignSurveyToClient(obj: any) {
    return this.http.post<any>(this.baseUrl + 'survey-types', obj);
  }

  assignQuestiontoSurvey(obj: any) {
    return this.http.post<any>(this.baseUrl + 'sub-phase-controller/save', obj);
  }
  deleteInterviewOneToOne(id: any) {
    return this.http.delete<any>(this.baseUrl + ` one-to-one-interviews/${id}`);
  }

  onDeleteFocusGroup(id: any) {
    return this.http.delete<any>(this.baseUrl + `focus-group/${id}`);
  }

  updateComponentById(obj: any, id: any) {
    return this.http.put<any>(this.baseUrl + `component/${id}`, obj);
  }

  createComponent(obj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'component/save', obj);
  }

  deleteCompoent(clientId: number) {
    return this.http.delete<any>(this.baseUrl + 'component/' + clientId);
  }




}
