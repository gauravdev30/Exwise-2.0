import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/enviorment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = environment.baseUrl;
  private dataUrl = 'assets/testdata.json'; 
  baseUrl2 = environment.baseUrl2;
  constructor(private http:HttpClient) { }

  getAllSurveyAssignmentByClientID(id:any,orderBy: any, page: any, size: any, sortBy: any):Observable<any>{
    return this.http.get<any>(this.baseUrl+ `survey-assignments/forCPOC/getAllClientId?clientId=${id}&orderBy=${orderBy}&page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getFudsSUrveyDetailsForReport(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+`grapg/fuds/StaticsurveyScore22?surveyAssignmentClientId=${id}`);
  }

  getFudsSurveyLineGrapah(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/fuds/agreeimp/score12/new2?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getFudsForProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/fuds/agreeimp/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getFudsForTable(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/fuds/agreeimp/score23?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getFudsForQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/FUDS/score4444?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getEESurveyLineGrapah(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/EE/department?clientId=${clientId}&surveyId=${staticSurveyID}`,'');
  }

  getEEForProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/EE/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getEEForQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/EE/score4444?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getEEForTable(clientId:number,staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/EE/score1?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getExitSurveyLineGraph(clientId:number,staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/Exit/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getExitSurveyReasonProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/Exit/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'')
  }

  getExitSurveyForQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/Exit/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getExitSurveyForTable(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+``,'');
  }

  getOnboardingLineChart(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/onboarding/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOnBoardingEffectivenessProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/onboarding/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOnboardingEffectivenessForQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/onboarding/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOnboardingEffectivenessForTable(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/Onboarding/score1?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOJTSurveyLineGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/OJT/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOJTProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/ojt/agreeimp/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOJTSurveyQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/OJT/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getOJTSurveyForTable(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/ojt1/score2?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getInductionSurveyLineGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/induction/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getInductionsurveyProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/induction/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getInductionSurveyQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/induction/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getInductionSurveyForTable(clientId:number,StaticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/Induction/score1?clientId=${clientId}&StaticSurveyID=${StaticSurveyID}`,'');
  }

  getPulseSurveyLineGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/pulse/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getPulsesurveyProgressBar(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph2/Pulse/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getPulseSurveyQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/pulse/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getPulseSurveyForTable(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/Pulse1/score1?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getManagerEffectivenessLineGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph1/Manager/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getManagerEffectivenessDonutGrpah(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`api/graph2/Manager/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getManagerEffectivenessQuestionGraph(clientId:number, staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`graph3/Manager/score12?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  getManagerEffectivenessForTable(clientId:number,staticSurveyID:number):Observable<any>{
    return this.http.post<any>(this.baseUrl+`StaticScoreController/Manager1/score1?clientId=${clientId}&StaticSurveyID=${staticSurveyID}`,'');
  }

  // getGaph3(){
  //   return this.http.post<any>(this.baseUrl2+`graph3/Fuds?surveyAssignmentClientId=1`,'');
  // }
}
