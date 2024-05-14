
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

  getAllAssignedSurveyByClientEmpId(id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`employee-responses/getAllsurveyForEmp?clientEmpId=${id}`);
  }

  getAssignedSurveyByStatus(id:number,status:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`employee-responses/status?status=${status}`)
  }

  getSurveyBysurveyAssignmentId (id:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+`employee-responses/SurveyDetails/${id}`);
  }

}
