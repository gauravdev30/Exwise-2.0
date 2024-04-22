import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/enviorment.prod'; 

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllSurvey(){
    
  }
}
