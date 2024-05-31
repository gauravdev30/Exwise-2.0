import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ChartDataset } from 'chart.js';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
  Point,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  lineChartData: any;
  newLabel: any;

  barChart: any = [];
  lineChart: any = [];
  doughnutChart:any = [];
 
  constructor() {}

  ngOnInit(): void {
    this.barChart = new Chart('barChartCanvas', {
      type: 'line',
      data: {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: [
          {
            data: [200, 400, 300, 400, 500, 600, 70],
            label: 'Series A',
            borderColor: "#2155a3",
            // backgroundColor: '#2155a3',
            fill:true
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.lineChart = new Chart('lineChartCanvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Series A',
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.2)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.doughnutChart =new Chart('doughnutChartCanvas', {
      type: 'doughnut',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            data: [2],
            label: 'January',
            backgroundColor: '#2155a3',
          },
          {
            data: [3],
            label: 'February',
            backgroundColor: '#70c4fe',
          },
          {
            data: [4],
            label: 'March',
            backgroundColor: '#2980b9',
          },
          {
            data: [1],
            label: 'April',
            backgroundColor: '#069de0',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  externalTooltipHandler(context: any) {
    // Implement your custom tooltip logic here
    const { chart, tooltip } = context;
    // Custom tooltip code
  }
}
