import { Injectable } from '@angular/core';
import { environment } from '../../../environment/enviorment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient,public router:Router) { }

  authLogin(obj:any){
    return this.http.post<any>(this.baseUrl+'users/Login/emailId/jwt',obj);
  }
  authLoginwithoutJwt(emailId:any,password:any){
    return this.http.get<any>(this.baseUrl+`users/login/${emailId}?password=${password}`)
  }

  generateOTP(emailId:any){
    return this.http.post<any>(this.baseUrl+`users/SendOTPOnEmailId?emailId=${emailId}`,'')
  }

  verifyOTP(emailId:any,otp:any){
    return this.http.post<any>(this.baseUrl+`users/VerifyOtp?emailId=${emailId}&otp=${otp}`,'')
  }

  resetPassword(id:any,password:any){
    return this.http.put<any>(this.baseUrl+`users/updatePassword?id=${id}&password=${password}`,'')
  }

  getAllClient() {
    const orderBy = 'asc'; 
    const page = 0;
    const size = 10;
    const sortBy = 'id'; 

    const url =` ${this.baseUrl}clients/pagention?orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`;
  
    return this.http.get<any>(url);
  }
  loggedIn() {
    return sessionStorage.getItem('currentLoggedInUserData')
  }
  loggeOut() {
    sessionStorage.removeItem('currentLoggedInUserData')
    this.router.navigate(['auth']);
  }
}
