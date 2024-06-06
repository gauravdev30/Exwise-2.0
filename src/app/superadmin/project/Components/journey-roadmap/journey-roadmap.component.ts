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
  data: any = [];
  barChart: any = [];
  activeTab: string = 'survey';
  surveyDisplay: boolean = true;
  realityDisplay: boolean = false;
  tochpointDisplay: boolean = false;
  survey: any[] = [
    {
      stagename: 'Attract',
      substages: [
        {
          substagescore:50,
          substagename: 'Discovery',
          questions: [
            {
              question: '1.Pay and benefits were openly advertised. ',
              score: 5,
            },
            {
              question: '1.Pay and benefits were openly advertised. ',
              score: 5,
            },
            {
              question: '1.Pay and benefits were openly advertised. ',
              score: 5,
            },
            {
              question: '1.Pay and benefits were openly advertised. ',
              score: 5,
            },
          ],
        },
      ],
    },
  ];
  listOfPhase: any[] = [
    'Attract ',
    'Onboard ',
    'Develop ',
    'Retain ',
    'Separate ',
  ];
  listOfSubPhase: any[] = [
    'Discovery',
    'Reflection',
    'Application ',
    'Shortlisted ',
    'Interview',
    'Offer',
    'administration',
  ];
  listOfScore: any = [
    { label: 'Attract', value: 1500 },
    { label: 'Onboard', value: 1500 },
    { label: 'Develop', value: 1500 },
    { label: 'Retain', value: 1500 },
    { label: 'Separate', value: 1500 },
  ];
  QuestionList: any[] = [
    { question: '1.Pay and benefits were openly advertised. ', score: 5 },
    { question: '1.Pay and benefits were openly advertised. ', score: 5 },
    { question: '1.Pay and benefits were openly advertised. ', score: 5 },
    { question: '1.Pay and benefits were openly advertised. ', score: 5 },
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
            data: [0, 20, 30, 40, 50],
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
            data: [0, 50, 60, 70, 80],
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
            data: [0, 70, 40, 90, 67],
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
  getjourneyMapData() {
    this.service
      .journeyMapnByClientId(sessionStorage.getItem('ClientId'))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.data = res.data;
          console.log(this.data);
        },
        error: () => {},
        complete: () => {},
      });
  }
}
