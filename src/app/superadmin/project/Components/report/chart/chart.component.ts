import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend, registerables } from 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import { OptionDetailComponent } from '../option-detail/option-detail.component';
import { ManagereffectComponent } from '../managereffect/managereffect.component';

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
  colors: any;
};

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  show:number=2;
  activeTab: string = 'Feel';
  fudsLineChart: any = [];
  exitsurvey:any = [];
  onboardinglineChart: any = [];
  pulse:any = [];
  ojtEffectiveness:any = [];
  managerEffectiveness:any = [];
  managerdoughnutChart:any = [];

  @ViewChild('pulseChartCanvas') pulseChartCanvas!: ElementRef;
  @ViewChild('fudsChartCanvas') fudsChartCanvas!: ElementRef;
  @ViewChild('exitChartCanvas') exitChartCanvas!: ElementRef;
  @ViewChild('onboardChartCanvas') onboardChartCanvas!: ElementRef;
  @ViewChild('ojtChartCanvas') ojtChartCanvas!: ElementRef;
  @ViewChild('managerChartCanvas') managerChartCanvas!: ElementRef;
  @ViewChild('managerdoughnutChartCanvas') managerdoughnutChartCanvas!: ElementRef;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

 
  constructor(private dialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "Compliance and legal",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "External Communications",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Facilities Management",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Finance",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "HR Shared Services",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "HR",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Internal Communications",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "IT",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Learning & Development",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Operations",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Security",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
      ],
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#2980b9"],
      title: {
        text: ""
      }
    };
  }

  public generateData(count: number, yrange: { min: any; max: any; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

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

      this.exitsurvey = new Chart('exitChartCanvas', {
        type: 'line',
        data: {
            labels: ['','Work life balance', 'Work environment', 'Promotion', 'Job satisfaction', 'Interpersonal conflict', 'Further education', 'Compensation', 'Career change'],
            datasets: [
                {
                    data: ['',50, 70, -40, 70, 30, 50, -20, 90],
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
                    data: ['',-40, -50, 20, -80, 60, -10, 70, -40],
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
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return 'black'; 
                            } else {
                                return 'rgba(0, 0, 0, 0.1)'; 
                            }
                        },
                        lineWidth: function(context) {
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
    
    

      this.onboardinglineChart =  new Chart('onboardChartCanvas', {
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

     this.pulse =  new Chart('pulsechartCanvas', {
      type: 'line',
      data: {
        labels: ['Communication', 'Direct manager', 'Diversity and inclusion', 'Employee engagement index', 'Job satisfaction','Ladership','Performance management and reward','Purpose','Teamwork','Leading and growth opportunities','Wellness'],
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
            data: [30,50,20,],
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

  openPopup(){
    const dialogRef = this.dialog.open(OptionDetailComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  openManagerEffectiveness(){
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
