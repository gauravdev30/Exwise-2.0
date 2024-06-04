import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Chart } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-journey-roadmap',
  templateUrl: './journey-roadmap.component.html',
  styleUrl: './journey-roadmap.component.css'
})
export class JourneyRoadmapComponent  implements OnInit {
data:any=[];
barChart: any = [];
activeTab: string = 'survey';
surveyDisplay:boolean=true;
realityDisplay:boolean=false;
tochpointDisplay:boolean=false;
listOfPhase:any[]=['Attract ','Onboard ','Develop ','Retain ','Separate ']
listOfSubPhase:any[]=['Discovery', 'Reflection', 'Application ', 'Shortlisted ','Interview','Offer','administration' ]
listOfScore:any=[{label:'Attract',value:1500},{label:'Onboard',value:1500},{label:'Develop',value:1500},{label:'Retain',value:1500},{label:'Separate',value:1500}]
QuestionList:any[]=[{question:'1.Pay and benefits were openly advertised. ',score:5}]
  constructor(private service :ProjectService,){}
  ngOnInit(): void {
   this.onclickSurvey('survey');
      this.surveyDisplay=true; 
      this.realityDisplay=false;
      this.tochpointDisplay=false;
   
  }
  getjourneyMapData(){
    this.service.journeyMapnByClientId(sessionStorage.getItem('ClientId')).subscribe({next:(res:any)=>{console.log(res);
      this.data=res.data;
      console.log(this.data);
    },error:()=>{},complete:()=>{}})
  }
  onclickReality(tab: string){
    this.activeTab = tab;
    this.surveyDisplay=false;
    this.realityDisplay=true;
    this.tochpointDisplay=false;
    this.barChart = new Chart('barChartCanvas', {
      type: 'line',
      data: {
        labels: ['Discovery', 'Reflection', 'Application ', 'Shortlisted ','Interview','Offer','administration'  ],
        datasets: [
          {
            data: [50, 70, 40, 70,50, 70, 40],
            label: 'Importance',
            borderColor: "#70c4fe",
            backgroundColor: '#70c4fe',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#069de0',
            pointBorderColor: 'white',
          },
          {
            data: [90, 50, 80, 80,15,25,30],
            label: 'Aggrement',
            borderColor: "#2980b9",
            backgroundColor: '#2980b9',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#2155a3',
            pointBorderColor: 'white',
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 10,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    });
  }
  onclickSurvey(tab: string){
    this.activeTab = tab;
    this.surveyDisplay=true;
    this.realityDisplay=false;
    this.tochpointDisplay=false;
    this.barChart = new Chart('barChartCanvas', {
      type: 'line',
      data: {
        labels: ['Discovery', 'Reflection', 'Application ', 'Shortlisted ','Interview','Offer','administration'  ],
        datasets: [
          {
            data: [50, 70, 40, 70,50, 70, 40],
            label: 'Importance',
            borderColor: "#70c4fe",
            backgroundColor: '#70c4fe',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#069de0',
            pointBorderColor: 'white',
          },
          {
            data: [90, 50, 80, 80,15,25,30],
            label: 'Aggrement',
            borderColor: "#2980b9",
            backgroundColor: '#2980b9',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#2155a3',
            pointBorderColor: 'white',
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 10,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    });

  }
  onclick(tab: string){
    this.activeTab = tab;
    this.tochpointDisplay=true;
    this.surveyDisplay=false;
    this.realityDisplay=false;
    this.barChart = new Chart('barChartCanvas', {
      type: 'line',
      data: {
        labels: ['Discovery', 'Reflection', 'Application ', 'Shortlisted ','Interview','Offer','administration'  ],
        datasets: [
          {
            data: [50, 70, 40, 70,50, 70, 40],
            label: 'Importance',
            borderColor: "#70c4fe",
            backgroundColor: '#70c4fe',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#069de0',
            pointBorderColor: 'white',
          },
          {
            data: [90, 50, 80, 80,15,25,30],
            label: 'Aggrement',
            borderColor: "#2980b9",
            backgroundColor: '#2980b9',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#2155a3',
            pointBorderColor: 'white',
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 10,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    });
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
