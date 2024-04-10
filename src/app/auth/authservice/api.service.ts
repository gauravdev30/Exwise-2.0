import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  authLogin(obj:any){
    return this.http.post<any>(this.baseUrl+'users/Login/emailId/jwt',obj);
  }

  getAllClient() {
    const orderBy = 'asc'; 
    const page = 0;
    const size = 10;
    const sortBy = 'id'; 

    const url = `${this.baseUrl}clients/pagention?orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`;
  
    return this.http.get<any>(url);
  }
}
