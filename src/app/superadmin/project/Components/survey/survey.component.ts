import { Component } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})

export class SurveyComponent {
  sendSurvey:any=true;
  show:any=true;
  send:any=false;
  assign:any=false;
  info:any=false;
  main:any=true;
  items: any[] = [
    { id:'1', name: 'Name 1', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Name 2', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },
    { id:'3', name: 'Name 3', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'4', name: 'Name 4', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
  ];
  onsend(){
    this.sendSurvey=false;
    this.send=true;
  }
  share: any[] = [
    { id:'1', name: 'Name 1', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Name 2', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },

  ];
  sharesurvey: any[] = [
    { id:'1', name: 'Send Your Surveys', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Focus Group', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },

  ];
  cardsCircle:any[]=[
    { name: 'Total Survey', count: '2' },
    { name: 'Completed survey', count: '2' },
    { name: 'Pending survey', count: '2' },
    { name: 'Cancelled survey', count: '2' },
  ]
  infoDetails(){
    this.sendSurvey=false;
    this.assign=false;
    this.show=false;
    this.main=false;
    this.info=true;
  }
  check(){
    console.log("test");
    
    this.sendSurvey=false;
this.assign=true;
this.show=false;
  }
}
