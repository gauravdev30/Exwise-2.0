import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import { OptionDetailComponent } from '../option-detail/option-detail.component';

// Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  show:number=2;
  activeTab: string = 'Feel';
  fudsLineChart: any = [];
  doughnutChart:any = [];

 
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
      this.fudsLineChart = new Chart('fudsChartCanvas', {
        type: 'line',
        data: {
          labels: ['Feel', 'Use', 'Do', 'See'],
          datasets: [
            {
              data: [50, 70, 40, 70],
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
              data: [90, 50, 80, 80],
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

  openPopup(){
    const dialogRef = this.dialog.open(OptionDetailComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
}
