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
barChart1: any = [];
surveyDisplay:boolean=true;
realityDisplay:boolean=false;
tochpointDisplay:boolean=false;
  constructor(private service :ProjectService,){}
  ngOnInit(): void {
   this.onClickSurvey();
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
  onclickReality(){
    this.surveyDisplay=false;
    this.realityDisplay=true;;
  }
  onClickSurvey(){
    this.surveyDisplay=true;
    this.realityDisplay=false;
    this.tochpointDisplay=false;
//     this.barChart1 = new Chart('barChartCanvas', {
//       type: 'bar',
//       data: {
//         labels: ['Partially Automated', 'Automated', 'Internal', 'External'],
//         datasets: [
//           {
//             data: [50, 80, 40, 70],
//             label: 'Value',
//             borderColor: "#2155a3",
//             backgroundColor: '#2155a3', 
//             barThickness: 15, 
//             barPercentage: 0.8,
//             categoryPercentage: 0.8,
// borderRadius:15
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: 100, 
//             min: 10,
//           },
//         },
//       },
//     });
  }
  onclick(){
    this.tochpointDisplay=true;
    this.surveyDisplay=false;
    this.realityDisplay=false;
  }

  public touchpointLegend = true;
  public touchpointPlugins = [];

  public touchpointData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin'],
    datasets: [
      {
        label: 'Application Portal',
        data: [55, 40, 86, 64, 72, 34, 54],
        borderColor: "#2155a3",
        backgroundColor: '#2155a3', 
        barThickness: 15, 
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        borderRadius:15
      },
      {
        label: 'Bot',
        data: [27, 90, 67, 74, 72, 74, 73],
        backgroundColor: '#E5E4E2',
        barThickness: 15, 
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        borderRadius:15
      },
  
    ]
  };

  public touchpointOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
  };
}
