import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getCountOfClients(){
    return this.http.get<any>(this.baseUrl+'countOfClient');
  }

  getAllPinClients(){
    return this.http.get<any>(this.baseUrl+`pinned/clients/`+1);
  }

  getClientById(clientId:number){
    return this.http.get<any>(this.baseUrl+'clients/'+clientId);
  }

  updateClientById(obj:any){
    return this.http.put<any>(this.baseUrl+'clients/Client/update',obj);
  }

  createClient(obj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'clients/save',obj);
  }

  deleteClient(clientId:number){
    return this.http.delete<any>(this.baseUrl+'clients/'+clientId);
  }

  pinClinet(clientId:number){
    return this.http.post<any>(this.baseUrl+`pinned/pin/client/${1}/${clientId}`,'');
  }

  unPinClient(clientId:number){
    return this.http.delete<any>(this.baseUrl+`pinned/unpin/client/${1}/${clientId}`);
  }

  getClientListByStatus(status:any){
    return this.http.get<any>(this.baseUrl+'clients/status/'+status);
  }

}
