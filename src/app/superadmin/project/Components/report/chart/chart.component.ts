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
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { ActivatedRoute } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis & {
    labels: {
      show: boolean;
      rotate: number;
      style: {
        colors: string[];
        fontSize: string;
      };
    };
  };
  yaxis?: ApexYAxis & {
    title: {
      text: string;
    };
  };
  tooltip?: ApexTooltip & {
    y: {
      formatter: (value: number) => string;
    };
  };
  colors: any;
};

export type ChartOptionsdoghnut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
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
  inductionSurvey: any = [];
  pulse: any = [];
  ojtEffectiveness: any = [];
  managerEffectiveness: any = [];
  managerdoughnutChart: any = [];
  exitdoughnutChart: any = [];
  importanceData: any = [];
  agreementData: any = [];
  fudsDetails: any;
  eeDetails:any;
  pulseDetails:any;
  fudsProgressBar: any;
  onboardingProgressBar: any
  ojtProgressBar: any
  inductionProgressBar: any;
  pulseProgressBar: any;
  eeProgressBar: any;
  fudsGraph: any;
  paramsId: any;
  paramsName: any;
  fudsTable: any;
  eetable:any;
  exitTable:any;
  onboardTable:any;
  ojtTable:any;
  inductionTable:any;
  pulsetable:any;
  managerTable:any;
  testTitle: any = 'fuds'
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  @ViewChild("doghnutcharts") doghnutcharts!: ChartComponent;
  public ChartOptionsdoghnut!: Partial<ChartOptions>;

  public fudstabs: string[] = [];
  public eetabs: string[] = [];
  public pulsetabs: string[] = [];
  allData: any;

  constructor(private dialog: MatDialog, private api: GraphService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      const id = params['id']
      console.log(id)
      this.paramsId = id
      const nm = params['surveyName']
      this.paramsName = nm;
      console.log(this.paramsName);
      const clientId = parseInt(sessionStorage.getItem('ClientId')!, 10);
      console.log('client Id' + clientId, id)
      if (this.paramsName.includes("Feel, Use, Do and See survey")) {
        this.api.getFudsSurveyLineGrapah(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.importanceData = res.data.map((item: { importance: any; }) => item.importance);
            this.agreementData = res.data.map((item: { agreement: any; }) => item.agreement);
            this.executeFudsGraph();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getFudsForProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.fudsProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getFudsForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.fudsTable = res.data;
            this.fudstabs = this.fudsTable.map((item: { stage: any; }) => item.stage);
            this.setActiveTabForFuds(this.fudstabs[0]);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

      }
      else if (this.paramsName.includes('Employee Engagement survey')) {
        this.api.getEESurveyLineGrapah(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeEESurveyGraph(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getEEForProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.eeProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getEEForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.eetable = res.data;
            if (this.eetable.length > 0) {
              this.eetabs = this.eetable.map((item: { stage: any; }) => item.stage);
              this.setActiveTabForEE(this.eetabs[0]);
            }
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

      }
      else if (this.paramsName.includes('Exit survey')) {
        this.api.getExitSurveyLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeExitGraph(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getExitSurveyReasonProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeExitDoughnutChart(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getExitSurveyForTable(clientId,this.paramsId).subscribe({
          next:(res) => {
            this.exitTable = res.data;
          }
        })
      }
      else if (this.paramsName.includes('Onboarding feedback survey')) {
        this.api.getOnboardingLineChart(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeOnBoardingGraph(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOnBoardingEffectivenessProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.onboardingProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOnboardingEffectivenessForTable(clientId,this.paramsId).subscribe({
          next:(res)=>{
            this.onboardTable = res.data;
          },error:(err)=>{console.log(err)},complete:()=>{}
        });
      }
      else if (this.paramsName.includes('On-the-job training effectiveness survey')) {
        this.api.getOJTSurveyLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeOjt(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOJTProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.ojtProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOJTSurveyForTable(clientId,this.paramsId).subscribe({
          next:(res)=>{
            this.ojtTable = res.data;
          },error:(err)=>{console.log(err)},complete:()=>{}
        });
      }
      else if (this.paramsName.includes('Induction effectiveness survey')) {
        this.api.getInductionSurveyLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeInduction(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getInductionsurveyProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.inductionProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getInductionSurveyForTable(clientId,this.paramsId).subscribe({
          next:(res)=>{
            this.inductionTable = res.data;
          },error:(err)=>{console.log(err)},complete:()=>{}
        });
      }
      else if (this.paramsName.includes('Pulse surveys')) {
        this.api.getPulseSurveyLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executePulse(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getPulsesurveyProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.pulseProgressBar = res.data.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              return {
                stageName: item.stage,
                percentage: item.responseCount,
                color: colors[index % colors.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });


        this.api.getPulseSurveyForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.pulsetable = res.data;
            if (this.pulsetable.length > 0) {
              this.pulsetabs = this.pulsetable.map((item: { stage: any; }) => item.stage);
              this.setActiveTabForPulse(this.eetabs[0]);
            }
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('Manager Effectiveness survey')) {
        this.api.getManagerEffectivenessLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeManagerLine(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getManagerEffectivenessDonutGrpah(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeManagerDoughnut(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getManagerEffectivenessForTable(clientId,this.paramsId).subscribe({
          next:(res)=>{
            this.managerTable = res.data;
          },error:(err)=>{console.log(err)},complete:()=>{}
        });
      }
    });
  }


  executeFudsGraph() {
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

  // executeEESurveyGraph(res: any) {
  //   const backendData = res.data.backendData.map((item: any) => {
  //     return {
  //       name: item.name,
  //       data: item.data
  //     };
  //   });

  //   const categories = res.data.xaxis.categories;

  //   this.chartOptions = {
  //     series: backendData,
  //     chart: {
  //       height: 350,
  //       type: "heatmap"
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     colors: ["#2980b9", "#70c4fe"],
  //     title: {
  //       text: ""
  //     },
  //     xaxis: {
  //       categories: categories,
  //       labels: {
  //         show: true,
  //         rotate: -90,
  //         style: {
  //           colors: [],
  //           fontSize: '12px'
  //         },
  //         formatter: function (value: string) {
  //           return value.split(' ').map(word => word[0]).join('');
  //         }
  //       }
  //     },
  //     yaxis: {
  //       title: {
  //         text: "Score"
  //       }
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (value: number) {
  //           return value + " respondents";
  //         }
  //       }
  //     }
  //   };
  // }


  executeEESurveyGraph(res: any) {
    const categories = res.data?.xaxis.categories;
    const backendData = res.data?.backendData.map((item: any) => {
      return {
        name: item.name,
        data: item.data
      };
    });

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
        categories: categories,
        labels: {
          show: true,
          rotate: -90,
          style: {
            colors: [],
            fontSize: '12px'
          },
          formatter: function (value: string) {
            return value.split(' ').map(word => word[0]).join('');
          }
        }
      },
      yaxis: {
        title: {
          text: "Score"
        }
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value + " respondents";
          }
        }
      }
    };
  }




  executeExitGraph(res: any): void {
    const questions = res.data.questions.map((item: any) => item.question);
    const scores = res.data.questions.map((item: any) => item.score);
    const labels = ['', ...questions.map((question: string) => {
      const words = question.split(' ');
      const firstTwoWords = words.slice(0, 2).join(' ');
      return `${firstTwoWords}...`;
    })];

    new Chart('exitChartCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: ['', ...scores],
            label: 'Score',
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
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback: function (value, index, values) {
                return labels[index];
              }
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            min: -80,
            grid: {
              color: function (context) {
                return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)';
              },
              lineWidth: function (context) {
                return context.tick.value === 0 ? 2 : 1;
              },
            }
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                return index === 0 ? '' : questions[index - 1];
              },
              label: function (tooltipItem) {
                return 'Score: ' + tooltipItem.raw;
              }
            }
          }
        }
      },
    });
  }

  executeExitDoughnutChart(res: any) {
    const responseData = res.data;

    const series = responseData.map((item: any) => item.responseCount);
    const labels = responseData.map((item: any) => item.stage);


    const colors = ["#2155a3", "#2980b9", "#069de0", "#70c4fe", "#4a8bec"];

    this.exitdoughnutChart = {
      series: series,
      chart: {
        type: "donut"
      },
      labels: labels,
      colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }




  executeOnBoardingGraph(res: any): void {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => item.score);

      const labels = questions.map((question: string) => {
        const words = question.split(' ');
        const firstTwoWords = words.slice(0, 2).join(' ');
        return `${firstTwoWords}...`;
      });

      this.onboardinglineChart = new Chart('onboardChartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Score',
              borderColor: "#069de0",
              backgroundColor: '#069de0',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#069de0',
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
          plugins: {
            tooltip: {
              callbacks: {
                title: function (tooltipItems) {
                  const index = tooltipItems[0].dataIndex;
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        },
      });
    }
  }

  executeOjt(res: any): void {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => item.score);

      const labels = questions.map((question: string) => {
        const words = question.split(' ');
        const firstTwoWords = words.slice(0, 2).join(' ');
        return `${firstTwoWords}...`;
      });

      this.ojtEffectiveness = new Chart('ojtChartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Score',
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
          plugins: {
            tooltip: {
              callbacks: {
                title: function (tooltipItems) {
                  const index = tooltipItems[0].dataIndex;
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        },
      });
    }
  }

  executeInduction(res: any) {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => item.score);

      const labels = questions.map((question: string) => {
        const words = question.split(' ');
        const firstTwoWords = words.slice(0, 2).join(' ');
        return `${firstTwoWords}...`;
      });

      this.inductionSurvey = new Chart('inductionChartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Score',
              borderColor: "#069de0",
              backgroundColor: '#069de0',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#069de0',
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
          plugins: {
            tooltip: {
              callbacks: {
                title: function (tooltipItems) {
                  const index = tooltipItems[0].dataIndex;
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        },
      });
    }
  }

  executePulse(res: any): void {
    if (res.data && Array.isArray(res.data)) {
      const labels = res.data.map((item: any) => item.stageName);
      const scores = res.data.map((item: any) => item.score);
      // console.log(labels,scores);
      this.pulse = new Chart('pulsechartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Score',
              borderColor: "#2980b9",
              backgroundColor: '#2980b9',
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
  }

  executeManagerLine(res: any) {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => item.score);

      const labels = questions.map((question: string) => {
        const words = question.split(' ');
        const firstTwoWords = words.slice(0, 2).join(' ');
        return `${firstTwoWords}...`;
      });

      this.managerEffectiveness = new Chart('managerChartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Score',
              borderColor: "#2980b9",
              backgroundColor: '#2980b9',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#2980b9',
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
          plugins: {
            tooltip: {
              callbacks: {
                title: function (tooltipItems) {
                  const index = tooltipItems[0].dataIndex;
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        },
      });
    }
  }

  executeManagerDoughnut(res: any) {
    const labels = res.data.map((item: any) => item.stage);
    const data = res.data.map((item: any) => item.responseCount);

    this.managerdoughnutChart = new Chart('managerdoughnutChartCanvas', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
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

  openPopup(name: any) {
    console.log(this.activeTab)
    const dialogRef = this.dialog.open(OptionDetailComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
      data: { name: name, id: this.paramsId, stageName: this.activeTab }
    });
  }

  openManagerEffectiveness() {
    const dialogRef = this.dialog.open(ManagereffectComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  setActiveTabForFuds(tab: string) {
    this.activeTab = tab;
    this.fudsDetails = this.fudsTable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
  }

  setActiveTabForEE(tab:string){
    this.activeTab = tab;
    this.eeDetails = this.eetable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
  }

  setActiveTabForPulse(tab:string){
    this.activeTab = tab;
    this.pulseDetails = this.pulsetable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
  }
}
