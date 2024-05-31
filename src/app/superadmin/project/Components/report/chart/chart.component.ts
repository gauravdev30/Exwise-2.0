import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ChartDataset, ChartEvent, LegendElement, LegendItem ,LegendOptions } from 'chart.js';
import { Chart } from 'chart.js/auto';

// Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  barChart: any = [];
  lineChart: any = [];
  doughnutChart:any = [];
 
  constructor() {}

  ngOnInit(): void {
      this.barChart = new Chart('barChartCanvas', {
        type: 'bar',
        data: {
          labels: ['Feel', 'Use', 'Do', 'See'],
          datasets: [
            {
              data: [50, 80, 40, 70],
              label: 'Value',
              borderColor: "#ff69b4",
              backgroundColor: '#ff69b4', 
              barThickness: 20, 
              barPercentage: 0.8,
              categoryPercentage: 0.8,
            },
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

    this.doughnutChart = new Chart('doughnutChartCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Feel', 'Use', 'Do', 'See'],
        datasets: [
          {
            data: [20,40,30,10],
            backgroundColor: ['#2155a3', '#70c4fe', '#069de0', '#2980b9'],
          },
        ],
      },
      options: {
        cutout: '65%'
      },
    });
  }

  externalTooltipHandler(context: any) {
    // Implement your custom tooltip logic here
    const { chart, tooltip } = context;
    // Custom tooltip code
  }
}
