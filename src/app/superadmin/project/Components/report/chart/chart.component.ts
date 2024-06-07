import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend, registerables } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import { OptionDetailComponent } from '../option-detail/option-detail.component';
import { ManagereffectComponent } from '../managereffect/managereffect.component';
import { GraphService } from '../../../services/graph.service';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  xaxis?: {
    categories: string[];
  };
  colors: any;
};

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  show: number = 2;
  activeTab: string = 'Feel';
  fudsLineChart: any = [];
  exitsurvey: any = [];
  onboardinglineChart: any = [];
  pulse: any = [];
  ojtEffectiveness: any = [];
  managerEffectiveness: any = [];
  managerdoughnutChart: any = [];
  importanceData:any=[];
  agreementData:any=[];
  fudsDetails: any;
  fudsProgressBar:any;
  fudsGraph: any;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;



  constructor(private dialog: MatDialog, private api: GraphService) {
    const backendData = [
      { name: "Compliance and legal", data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 135, 140, 150, 160, 170, 180, 190, 200] },
      { name: "External Communications", data: [20, 30, 25, 50, 49, 60, 70, 81, 95, 100, 105, 110, 120, 130, 140, 150, 160, 170] },
      { name: "Facilities Management", data: [50, 60, 55, 70, 69, 80, 90, 101, 115, 120, 125, 130, 140, 150, 160, 170, 180, 190] },
      { name: "Finance", data: [40, 50, 45, 60, 59, 70, 80, 91, 105, 110, 115, 120, 130, 140, 150, 160, 170, 180] },
      { name: "HR Shared Services", data: [35, 45, 40, 55, 54, 65, 75, 86, 100, 105, 110, 115, 125, 135, 145, 155, 165, 175] },
      { name: "HR", data: [45, 55, 50, 65, 64, 75, 85, 96, 110, 115, 120, 125, 135, 145, 155, 165, 175, 185] },
      { name: "Internal Communications", data: [25, 35, 30, 45, 44, 55, 65, 76, 90, 95, 100, 105, 115, 125, 135, 145, 155, 165] },
      { name: "IT", data: [60, 70, 65, 80, 79, 90, 100, 111, 125, 130, 135, 140, 150, 160, 170, 180, 190, 200] },
      { name: "Learning & Development", data: [50, 60, 55, 70, 69, 80, 90, 101, 115, 120, 125, 130, 140, 150, 160, 170, 180, 190] },
      { name: "Operations", data: [45, 55, 50, 65, 64, 75, 85, 96, 110, 115, 120, 125, 135, 145, 155, 165, 175, 185] },
      { name: "Security", data: [55, 65, 60, 75, 74, 85, 95, 106, 120, 125, 130, 135, 145, 155, 165, 175, 185, 195] }
    ];

    this.chartOptions = {
      series: backendData,
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#2980b9", "#70c4fe"],
      title: {
        text: ""
      },
      xaxis: {
        categories: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7", "Label 8", "Label 9", "Label 10", "Label 11", "Label 12", "Label 13", "Label 14", "Label 15", "Label 16", "Label 17", "Label 18"]
      }
    };
  }

  executeGraph(){
    this.fudsLineChart = new Chart('fudsChartCanvas', {
      type: 'line',
      data: {
        labels: ['Feel', 'Use', 'Do', 'See'],
        datasets: [
          {
            data: this.importanceData,
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
            data: this.agreementData,
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

  ngOnInit(): void {
    this.api.getFudsSurveyLineGrapah(1).subscribe({next:(res)=>{
      this.importanceData = res.data.map((item: { importance: any; }) => item.importance);
      this.agreementData = res.data.map((item: { agreement: any; }) => item.agreement);
      this.executeGraph();
    },error:(err)=>{console.log(err)},complete:()=>{}});

    this.api.getFudsForProgressBar(1).subscribe({next:(res)=>{
      this.fudsProgressBar = res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}});   

    this.exitsurvey = new Chart('exitChartCanvas', {
      type: 'line',
      data: {
        labels: ['', 'Work life balance', 'Work environment', 'Promotion', 'Job satisfaction', 'Interpersonal conflict', 'Further education', 'Compensation', 'Career change'],
        datasets: [
          {
            data: ['', 50, 70, -40, 70, 30, 50, -20, 90],
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
            data: ['', -40, -50, 20, -80, 60, -10, 70, -40],
            label: 'Agreement',
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
            min: -80,
            grid: {
              color: function (context) {
                if (context.tick.value === 0) {
                  return 'black';
                } else {
                  return 'rgba(0, 0, 0, 0.1)';
                }
              },
              lineWidth: function (context) {
                if (context.tick.value === 0) {
                  return 2;
                } else {
                  return 1;
                }
              },
            }
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    });



    this.onboardinglineChart = new Chart('onboardChartCanvas', {
      type: 'line',
      data: {
        labels: ['Onboard', 'test', 'testing', 'what'],
        datasets: [
          {
            data: [51, 60, 42, 90],
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

    this.ojtEffectiveness = new Chart('ojtChartCanvas', {
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

    this.pulse = new Chart('pulsechartCanvas', {
      type: 'line',
      data: {
        labels: ['Communication', 'Direct manager', 'Diversity and inclusion', 'Employee engagement index', 'Job satisfaction', 'Ladership', 'Performance management and reward', 'Purpose', 'Teamwork', 'Leading and growth opportunities', 'Wellness'],
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

    this.managerEffectiveness = new Chart('managerChartCanvas', {
      type: 'line',
      data: {
        labels: ['Support and motivation', 'Trust fairness ', 'Impact'],
        datasets: [
          {
            data: [90, 50, 80],
            label: 'score',
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

    this.managerdoughnutChart = new Chart('managerdoughnutChartCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Support and motivation', 'Trust fairness ', 'Impact'],
        datasets: [
          {
            data: [30, 50, 20,],
            backgroundColor: ['#2155a3', '#069de0', '#2980b9'],
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

  openPopup() {
    const dialogRef = this.dialog.open(OptionDetailComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  openManagerEffectiveness() {
    const dialogRef = this.dialog.open(ManagereffectComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
