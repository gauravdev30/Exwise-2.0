import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = environment.baseUrl;
  baseUrl2 = environment.baseUrl2;
  private dataUrl = 'assets/testdata.json'; 
  constructor(private http:HttpClient) { }

  getAllSurveyAssignmentByClientID(id:any,orderBy: any, page: any, size: any, sortBy: any):Observable<any>{
    return this.http.get<any>(this.baseUrl+ `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getFudsSUrveyDetailsForReport(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`grapg/fuds/StaticsurveyScore22?surveyAssignmentClientId=${id}`);
  }

  getFudsSurveyLineGrapah(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/fuds/agree/imp/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getFudsForProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/fuds/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getFudsForQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/Fuds?surveyAssignmentClientId=${id}`,'');
  }

  getEESurveyLineGrapah(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/EE?surveyAssingToClientId=${id}`,'');
  }

  getEEForProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/EE/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getEEForQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/EE?surveyAssignmentClientId=${id}`,'');
  }

  getExitSurveyLineGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/exit1?surveyAssignmentClientId=${id}`,'');
  }

  getExitSurveyReasonProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/exit/staticdata?surveyAssignmentClientId=${id}`,'')
  }

  getExitSurveyForQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/exit?surveyAssignmentClientId=${id}`,'');
  }

  getOnboardingLineChart(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/onboarding?surveyAssignmentClientId=${id}`,'');
  }

  getOnBoardingEffectivenessProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/onboarding/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getOnboardingEffectivenessForQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/onboarding?surveyAssignmentClientId=${id}`,'');
  }

  getOJTSurveyLineGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/survey/ojt?surveyAssignmentClientId=${id}`,'');
  }

  getOJTProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/ojt/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getOJTSurveyQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/ojt?surveyAssignmentClientId=${id}`,'');
  }

  getInductionSurveyLineGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/induction?surveyAssignmentClientId=${id}`,'');
  }

  getInductionsurveyProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/induction/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getInductionSurveyQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/induction?surveyAssignmentClientId=${id}`,'');
  }

  getPulseSurveyLineGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/pulse/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getPulsesurveyProgressBar(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/pulse/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getPulseSurveyQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/pulse?surveyAssignmentClientId=${id}`,'');
  }

  getManagerEffectivenessLineGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph1/survey/manager?surveyAssignmentClientId=${id}`,'');
  }

  getManagerEffectivenessDonutGrpah(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`progress/graph2/manager/staticdata?surveyAssignmentClientId=${id}`,'');
  }

  getManagerEffectivenessQuestionGraph(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl2+`graph3/manager?surveyAssignmentClientId=${id}`,'');
  }
}
