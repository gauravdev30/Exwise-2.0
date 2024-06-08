import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Chart } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-journey-roadmap',
  templateUrl: './journey-roadmap.component.html',
  styleUrl: './journey-roadmap.component.css',
})
export class JourneyRoadmapComponent implements OnInit {
substagesData:any
  data: any = [];
  barChart: any = [];
  activeTab: string = 'survey';
  surveyDisplay: boolean = true;
  realityDisplay: boolean = false;
  tochpointDisplay: boolean = false;
  surveyData:any;
  realityData:any;
  tochpointData:any;
  touchPointEfficiency:any;
  stakeholderScore:any;
  survey: any[] = [
    {
      "message": "Journey map fetch for client successfully.",
      "data": {
        "survey": [
          {
            "stageName": "Develop",
            "value": "0.0"
          },
          {
            "stageName": "Onboard",
            "value": "0.0"
          },
          {
            "stageName": "Attract",
            "value": "0.0"
          },
          {
            "stageName": "Retain",
            "value": "0.0"
          },
          {
            "stageName": "Separate",
            "value": "0.0"
          }
        ],
        "reality": [
          {
            "stageName": "Develop",
            "value": "0.0"
          },
          {
            "stageName": "Onboard",
            "value": "0.0"
          },
          {
            "stageName": "Attract",
            "value": "0.0"
          },
          {
            "stageName": "Retain",
            "value": "0.0"
          },
          {
            "stageName": "Separate",
            "value": "0.0"
          }
        ],
        "touchpoint": [
          {
            "stageName": "Develop",
            "value": "0.0"
          },
          {
            "stageName": "Onboard",
            "value": "0.0"
          },
          {
            "stageName": "Attract",
            "value": "0.0"
          },
          {
            "stageName": "Retain",
            "value": "0.0"
          },
          {
            "stageName": "Separate",
            "value": "0.0"
          }
        ]
      },
      "success": true
    }
  ];
  surveyDatagraph:any;
  realityDatagraph:any;
  touchpointDatagraph:any;
  listOfScore: any = [
    { label: 'Attract', value: 1500 },
    { label: 'Onboard', value: 1500 },
    { label: 'Develop', value: 1500 },
    { label: 'Retain', value: 1500 },
    { label: 'Separate', value: 1500 },
  ];

  constructor(private service: ProjectService) {}
  ngOnInit(): void {
    this.getjourneyMapData();

    this.barChart = new Chart('barChartCanvas', {
      type: 'line',
      data: {
        labels: ['Attract ', 'Onboard ', 'Develop ', 'Retain ', 'Separate '],
        datasets: [
          {
            data: this.surveyDatagraph,
            label: 'survey',
            borderColor: '#70c4fe',
            backgroundColor: '#70c4fe',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#069de0',
            pointBorderColor: 'white',
          },
          {
            data: this.realityDatagraph,
            label: 'reality',
            borderColor: '#2980b9',
            backgroundColor: '#2980b9',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#2155a3',
            pointBorderColor: 'white',
          },
          {
            data:this.touchpointDatagraph,
            label: 'touchpoint',
            borderColor: '#70c4fe',
            backgroundColor: '#70c4fe',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#069de0',
            pointBorderColor: 'white',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 0,
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
  createChart(){
   this.surveyDatagraph = this.survey[0].data.survey.map((item:any) => parseFloat(item.value));
   this.realityDatagraph = this.survey[0].data.reality.map((item:any) => parseFloat(item.value));
   this.touchpointDatagraph = this.survey[0].data.touchpoint.map((item:any) => parseFloat(item.value));
  }
  getjourneyMapData() {
    this.service
      .journeyMapnByClientId(sessionStorage.getItem('ClientId'))
      .subscribe({
        next: (res: any) => {
          this.data = res.data;
          this.surveyData=res.data.surveyPhaseScore[0];  
          this.realityData=res.data.reality;
          this.tochpointData=res.data.touchPoint
          this.touchPointEfficiency=res.data.touchPointEfficiency
         this.stakeholderScore=res.data.stakeholderScore
        },
        error: () => {},
        complete: () => {},
      });
  }
}
