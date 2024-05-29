
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/enviorment.prod';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCountByClientEmpId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl+`employee-responses/count?clientEmpId=${id}`);
  }

  getAllAssignedSurveyByClientEmpId(
    id: any,
    page: number,
    size: number,
    sortBy: string,
    orderBy: string
  ): Observable<any> {
    const url = `${this.baseUrl}employee-responses/getAllsurveyForEmp?clientEmpId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`;
    return this.http.get<any>(url);
  }

  getAssignedSurveyByStatus(id:number,status:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`employee-responses/status?status=${status}`)
  }

  getSurveyBysurveyAssignmentId (id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`employee-responses/SurveyDetails/${id}`);
  }

  getUpcomingEventsById (id: any, page: number,size: number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`focus-group-meetings/upcomingEvents/pagination/count?userId=${id}&size=${size}&page=${page}`);
  }
  
  submitEmployeeResponse (data:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+`employee-responses`, data);
  }

  getMeetingsDateByMonth(month: number, year: number, userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl+`focus-group-meetings/dateByMonth?month=${month}&userId=${16}&year=${year}`)
  }

  getEventOnDateByUserID(date:any,userId:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`focus-group-meetings/eventsOnDate?date=${date}&userId=${16}`)
  }

}
