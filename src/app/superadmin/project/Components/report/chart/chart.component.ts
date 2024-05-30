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

  // events
  // public chartClicked({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: object[];
  // }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: object[];
  // }): void {
  //   console.log(event, active);
  // }

  // public barChartOptions: ChartConfiguration['options'] = {
  //   elements: {
  //     line: {
  //       tension: 0.1,
  //     },
  //   },
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 10,
  //     },
  //   },
  //   plugins: {
  //     legend: { display: true },
  //   },
  // };

  // public barChartType: ChartType = 'bar';

  // public barChartData: ChartData<'bar'> = {
  //   labels: [
  //     '2006',
  //     '2007',
  //     '2008',
  //     '2009',
  //     '2010',
  //     '2011',
  //     '2012',
  //   ],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   ],
  // };

  // public randomize(): void {
  //   this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  // }

  // second graph

  public lineChartType: ChartType = 'line';
  public lineChartData2: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - External Tooltips',
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: this.externalTooltipHandler,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.barChart = new Chart('barChartCanvas', {
      type: 'bar',
      data: {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: [
          {
            data: [1000, 200, 300, 400, 500, 600, 70],
            label: 'Series A',
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: '#2155a3',
            maxBarThickness: 15,
            borderRadius: 10,
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
  }

  externalTooltipHandler(context: any) {
    // Implement your custom tooltip logic here
    const { chart, tooltip } = context;
    // Custom tooltip code
  }
}
