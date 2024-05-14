import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/enviorment.prod';


@Injectable({
  providedIn: 'root'
})
export class TouchpointService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllTouchPointsStages():Observable<any>{
    return this.http.get<any>(this.baseUrl+`TouchPointStagesController`);
  }

  getAllTouchPoints():Observable<any>{
    return this.http.get<any>(this.baseUrl+`touchpoint-controller`);
  }

  getAllComponents():Observable<any>{
    return this.http.get<any>(this.baseUrl+'component');
  }
}
