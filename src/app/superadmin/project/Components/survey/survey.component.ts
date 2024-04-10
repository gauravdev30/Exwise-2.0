import { Component } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  items: any[] = [
    { id:'1', name: 'Name 1', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Name 2', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },
    { id:'3', name: 'Name 3', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'4', name: 'Name 4', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
  ];
  cardsCircle:any[]=[
    { name: 'Total Survey', count: '2' },
    { name: 'Completed survey', count: '2' },
    { name: 'Pending survey', count: '2' },
    { name: 'Cancelled survey', count: '2' },
  ]
}
