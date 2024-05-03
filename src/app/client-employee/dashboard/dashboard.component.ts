import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  total:any=0;
  attempted:any=0;
  notAttempted:any=0;
  items: any[] = [
    {surveyId:'1', surveyName:'Name 1', assignedon:'29-04-24', status: 'Complete' },
    {surveyId:'2', surveyName:'Name 2', assignedon:'29-04-24', status: 'Not yet Started' },
    {surveyId:'3', surveyName:'Name 3', assignedon:'29-04-24', status: 'Inprogress' },
    {surveyId:'4', surveyName:'Name 4', assignedon:'29-04-24', status: 'Complete' },
    {surveyId:'5', surveyName:'Name 5', assignedon:'29-04-24', status: 'Attempted' },
    {surveyId:'6', surveyName:'Name 6', assignedon:'29-04-24', status: 'Complete' },
    {surveyId:'7', surveyName:'Name 6', assignedon:'29-04-24', status: 'Inprogress' },
    {surveyId:'8', surveyName:'Name 7', assignedon:'29-04-24', status: 'Not yet Started' },
    {surveyId:'9', surveyName:'Name 8', assignedon:'29-04-24', status: 'Complete' },
    {surveyId:'10', surveyName:'Name 9', assignedon:'29-04-24', status: 'Not yet Started' },
    {surveyId:'11', surveyName:'Name 10', assignedon:'29-04-24', status: 'Inprogress' },
  ];


  getSurveysByStatus(status:any){

  }
}
