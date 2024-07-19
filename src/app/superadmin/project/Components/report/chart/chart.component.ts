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
import zoomPlugin from 'chartjs-plugin-zoom';
import { OptionDetailComponent } from '../option-detail/option-detail.component';
import { ManagereffectComponent } from '../managereffect/managereffect.component';
import { GraphService } from '../../../services/graph.service';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions
} from "ng-apexcharts";
import { ActivatedRoute } from '@angular/router';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { Location } from '@angular/common';
import { color } from 'html2canvas/dist/types/css/types/color';

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
      formatter: (value: string) => string;
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
  plotOptions?: ApexPlotOptions;
};

export type pulseChartOptions = {
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
      formatter: (value: string) => string;
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
  plotOptions?: ApexPlotOptions;
};

export type ChartOptionsdoghnut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


Chart.register(...registerables);
Chart.register(zoomPlugin);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  isLoading: boolean = false;
  checkPDFDownloadSpinner: boolean = false;
  isStaticSurvey: boolean = true;
  isTableVisible: boolean = true;
  activeTab: string = '';
  otherSurvey: boolean = false;
  fudsLineChart: Chart | undefined;
  fudsBarChart: Chart | undefined;
  eeBarChart: Chart | undefined;
  pulseBarChart: Chart | undefined;
  exitsurvey: any = [];
  onboardinglineChart: Chart | undefined;
  onboardBarChart: Chart | undefined;
  inductionSurvey: any = [];
  inductionBarChart: Chart | undefined;
  pulse: any = [];
  ojtEffectiveness: any = [];
  ojtBarChart: Chart | undefined;
  managerEffectiveness: any = [];
  managerdoughnutChart: any = [];
  eNPSdoughnutChart: any = [];
  managerBarChart: Chart | undefined;
  otherChart: Chart | undefined;
  otherBarChart: Chart | undefined;
  exitdoughnutChart: any = [];
  exitBarChart: Chart | undefined;
  importanceData: any = [];
  agreementData: any = [];
  fudsDetails: any;
  eeDetails: any;
  pulseDetails: any;
  otherDetails: any;
  otherProgressBar: any;
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
  eetable: any;
  exitTable: any;
  otherTable: any
  onboardTable: any;
  ojtTable: any;
  inductionTable: any;
  pulsetable: any;
  managerTable: any;
  testTitle: any = 'fuds';
  backendMessage = null;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: any;
  @ViewChild("pulsechart") pulsechart!: pulseChartOptions;
  public pulseChartOptions!: any;

  @ViewChild("doghnutcharts") doghnutcharts!: ChartComponent;
  public ChartOptionsdoghnut!: Partial<ChartOptions>;

  public fudstabs: string[] = [];
  public eetabs: string[] = [];
  public pulsetabs: string[] = [];
  public othertabs: string[] = [];
  allData: any;

  constructor(private dialog: MatDialog, private api: GraphService, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      const id = params['id']
      console.log(id)
      this.paramsId = id
      const nm = params['surveyName']
      this.paramsName = nm;
      this.isStaticSurvey = params['isStaticSurvey'];
      console.log(this.paramsName);
      const clientId = parseInt(sessionStorage.getItem('ClientId')!, 10);
      console.log('client Id' + clientId, id)
      if (this.paramsName.includes("Feel, Use, Do and See survey")) {
        this.isLoading = true;
        this.api.getFudsSurveyLineGrapah(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.importanceData = res.data?.map((item: { importance: any; }) => item.importance);
            this.agreementData = res.data?.map((item: { agreement: any; }) => item.agreement);
            this.executeFudsGraph();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getFudsForProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            const totalEmployees = res?.data?.totalEmployee || 0;
            this.fudsProgressBar = res?.data?.finalDtos.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              const responseCount = item.responseCount || 0;
              const percentage = totalEmployees > 0 ? Math.round((responseCount / totalEmployees) * 100) : 0;
              return {
                stageName: item.stage,
                percentage: percentage,
                color: colors[index % colors.length]
              };
            });
          },
          error: (err) => { console.log(err) },
          complete: () => { }
        });



        this.api.getFudsForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.fudsTable = res.data;
            this.fudstabs = this.fudsTable.map((item: { stage: any; }) => item.stage);
            this.setActiveTabForFuds(this.fudstabs[0]);
            this.isLoading = false;
            this.executeFudsGraph();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

      }
      else if (this.paramsName.includes('Employee Engagement survey')) {
        this.isLoading = true;
        this.api.getEESurveyLineGrapah(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeEESurveyGraph(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getEEForProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            const totalEmployees = res.data?.totalEmployee || 0;
            this.eeProgressBar = res.data?.finalDtos.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              const stageName = item.stage.trim();
              const shortForm = stageName
                .split(' ')
                .map((word: any) => word[0])
                .join('');
              const responseCount = item.responseCount || 0;
              const percentage = totalEmployees > 0 ? ((responseCount / totalEmployees) * 100).toFixed(1) : "0";
              return {
                stageName: `${stageName} (${shortForm})`,
                percentage: parseFloat(percentage),
                color: colors[index % colors?.length]
              };
            });
          },
          error: (err) => { console.log(err) },
          complete: () => { }
        });


        this.api.getEEForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.eetable = res.data;
            if (this.eetable?.length > 0) {
              this.eetabs = this.eetable?.map((item: { stage: any; }) => item?.stage);
              this.setActiveTabForEE(this.eetabs[0]);
              this.isLoading = false;
            }
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

      }
      else if (this.paramsName.includes('Exit survey')) {
        this.isLoading = true;
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

        this.api.getExitSurveyForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.exitTable = res?.data[0];
            this.isLoading = false;
            this.executeExitBarChart();
          }
        })
      }
      else if (this.paramsName.includes('Onboarding feedback survey')) {
        this.isLoading = true;
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
                stageName: item?.stage,
                percentage: item?.responseCount,
                color: colors[index % colors?.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOnboardingEffectivenessForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.onboardTable = res?.data[0];
            this.isLoading = false;
            this.executeOnbarodingBarChart();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('On-the-job training effectiveness survey')) {
        this.isLoading = true;
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
                stageName: item?.stage,
                percentage: item?.responseCount,
                color: colors[index % colors?.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOJTSurveyForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.ojtTable = res?.data[0];
            this.isLoading = false;
            this.executeojtBarChart();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('Induction effectiveness survey')) {
        this.isLoading = true;
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
                stageName: item?.stage,
                percentage: item?.responseCount,
                color: colors[index % colors?.length]
              };
            });
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getInductionSurveyForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.inductionTable = res?.data[0];
            this.isLoading = false;
            this.executeInductionBarChart();
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('Pulse surveys')) {
        this.isLoading = true;
        this.api.getPulseSurveyLineGraph(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executePulse(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getPulsesurveyProgressBar(clientId, this.paramsId).subscribe({
          next: (res) => {
            const totalEmployees = res.data?.totalEmployee || 0;
            this.pulseProgressBar = res.data?.finalDtos.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              const stageName = item?.stage.trim();
              const shortForm = stageName
                .split(' ')
                .map((word: any) => word[0])
                .join('');
              const responseCount = item?.responseCount || 0;
              const percentage = totalEmployees > 0 ? ((responseCount / totalEmployees) * 100).toFixed(1) : "0";
              return {
                stageName: `${stageName} (${shortForm})`,
                percentage: parseFloat(percentage),
                color: colors[index % colors?.length]
              };
            });
          },
          error: (err) => { console.log(err) },
          complete: () => { }
        });


        this.api.getPulseSurveyForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.pulsetable = res.data;
            if (this.pulsetable.length > 0) {
              this.pulsetabs = this.pulsetable?.map((item: { stage: any; }) => item?.stage);
              this.setActiveTabForPulse(this.pulsetabs[0]);
              this.isLoading = false;
            }
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('Manager Effectiveness survey')) {
        this.isLoading = true;
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

        this.api.getManagerEffectivenessForTable(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.managerTable = res?.data[0];
            this.isLoading = false;
            this.executeMangerBarChart()
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else if (this.paramsName.includes('Employee net promoter score survey')) {
        this.isLoading = true;
        this.api.getENPSSUrveyForDonutChart(clientId, this.paramsId).subscribe({
          next: (res) => {
            this.executeDonutGraphForENPS(res);
            this.isLoading = false;
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
      else {
        this.otherSurvey = true;
        this.isLoading = true;
        this.api.getDaynamicSurveyLineGrapah(clientId, this.isStaticSurvey, this.paramsId).subscribe({
          next: (res) => {
            this.executeOtherLineChart(res);
          }, error: (err) => { console.log(err) }, complete: () => { }
        });

        this.api.getOtherDynamicSurveyProgressBar(clientId, this.isStaticSurvey, this.paramsId).subscribe({
          next: (res) => {
            const totalEmployees = res?.data?.totalEmployee;
            this.otherProgressBar = res?.data?.finalDtos.map((item: any, index: number) => {
              const colors = ["#2155a3", "#70c4fe", "#2980b9", "#069de0"];
              const stageName = item.stage.trim();
              const shortForm = stageName
                .split(' ')
                .map((word: any) => word[0])
                .join('');
              const percentage = ((item.responseCount / totalEmployees) * 100).toFixed(1);
              return {
                stageName,
                percentage: parseFloat(percentage),
                color: colors[index % colors?.length]
              };
            });
          },
          error: (err) => { console.log(err) },
          complete: () => { }
        });


        this.api.getOtherDaynamicSUrveyForTable(clientId, this.isStaticSurvey, this.paramsId).subscribe({
          next: (res) => {
            this.otherTable = res.data;
            if (this.otherTable?.length > 0) {
              this.othertabs = this.otherTable?.map((item: { stage: any; }) => item?.stage);
              this.setActiveTabForOther(this.othertabs[0]);
              this.isLoading = false;
            }
          }, error: (err) => { console.log(err) }, complete: () => { }
        });
      }
    });
  }


  executeFudsGraph() {
    if (this.fudsLineChart) {
      this.fudsLineChart.destroy();
    }

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
            max: 120,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Feel, Use, Do and See survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        }
      },
    });

    const questions = this.fudsDetails.map((item: { question: string }) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word?.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });


    const responseCategories = Object.keys(this.fudsDetails[0].optionWithCount);
    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.fudsDetails.map((item: { optionWithCount: { [x: string]: any; }; }) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.fudsBarChart) {
      this.fudsBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.fudsBarChart = new Chart('fudsbarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Feel, Use, Do and See survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


  // executeFudsGraph() {
  //   if (this.fudsLineChart) {
  //     this.fudsLineChart.destroy();
  // }
  //   this.fudsLineChart = new Chart('fudsChartCanvas', {
  //     type: 'line',
  //     data: {
  //       labels: ['Feel', 'Use', 'Do', 'See'],
  //       datasets: [
  //         {
  //           data: this.importanceData,
  //           label: 'Importance',
  //           borderColor: "#70c4fe",
  //           backgroundColor: '#70c4fe',
  //           tension: 0.4,
  //           fill: false,
  //           pointRadius: 5,
  //           pointBackgroundColor: '#069de0',
  //           pointBorderColor: 'white',
  //         },
  //         {
  //           data: this.agreementData,
  //           label: 'Aggrement',
  //           borderColor: "#2980b9",
  //           backgroundColor: '#2980b9',
  //           tension: 0.4,
  //           fill: false,
  //           pointRadius: 5,
  //           pointBackgroundColor: '#2155a3',
  //           pointBorderColor: 'white',
  //         }
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           max: 100,
  //         },
  //       },
  //       elements: {
  //         line: {
  //           borderWidth: 2,
  //         },
  //       },
  //     },
  //   });

  //   const questions = this.fudsDetails.map((item: { question: string }) => item.question);
  //   const truncatedQuestions = questions.map((question: string) => {
  //       const words = question.trim().split(' ').filter(word => word.length > 0);
  //       return words.slice(0, 2).join(' ') + '...';
  //   });

  //   const responseCategories = Object.keys(this.fudsDetails[0].optionWithCount);

  //   const datasets = responseCategories.map((category, index) => {
  //       return {
  //           label: category.trim(),
  //           data: this.fudsDetails.map((item: { optionWithCount: { [x: string]: any; }; }) => item.optionWithCount[category] || 0),
  //           backgroundColor: this.getColor(index)
  //       };
  //   });

  //   if (this.fudsBarChart) {
  //     this.fudsBarChart.destroy();
  // }

  //   this.fudsBarChart = new Chart('fudsbarChartCanvas', {
  //       type: 'bar',
  //       data: {
  //           labels: truncatedQuestions,
  //           datasets: datasets,
  //       },
  //       options: {
  //           scales: {
  //               y: {
  //                   beginAtZero: true,
  //                   max: 100,
  //               },
  //           },
  //           plugins: {
  //               legend: {
  //                   position: 'top',
  //               },
  //               tooltip: {
  //                   mode: 'index',
  //                   intersect: false,
  //                   callbacks: {
  //                       title: (context) => {
  //                           const index = context[0].dataIndex;
  //                           return questions[index];
  //                       },
  //                   },
  //               },
  //           },
  //           responsive: true,
  //           maintainAspectRatio: false,
  //       },
  //   });
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
      series: backendData.map((series: any) => ({
        name: series.name,
        data: series.data.map((value: any, index: number) => ({
          x: categories[index],
          y: value
        }))
      })),
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Employee Engagement Survey",
        align: 'center'
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
          text: ""
        }
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value + '';
          }
        }
      },
      colors: [],
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              { from: 0, to: 20, color: '#2155a3' },
              { from: 21, to: 40, color: '#069de0' },
              { from: 41, to: 60, color: '#70c4fe' },
              { from: 61, to: 80, color: '#2980b9' },
              { from: 81, to: 100, color: '#293c58' }
            ],
            min: 0,
            max: 100
          }
        }
      }
    } as ChartOptions;
  }

  // executeEESurveyGraph(res: any) {
  //   const categories = res.data?.xaxis.categories;
  //   const backendData = res.data?.backendData.map((item: any) => {
  //     return {
  //       name: item.name,
  //       data: item.data
  //     };
  //   });

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


  execueteEEBarGraph() {
    const questions = this.eeDetails.map((item: { question: string }) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question?.trim().split(' ').filter(word => word?.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.eeDetails[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.eeDetails.map((item: { optionWithCount: { [x: string]: any; }; }) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.eeBarChart) {
      this.eeBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.eeBarChart = new Chart('eebarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Employee Engagement survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }



  executeExitGraph(res: any): void {
    if (res.data && res.data.length) {
      const questions = res.data.map((item: any) => item.question);
      const yesScores = res.data.map((item: any) => parseInt(item.yesScore));
      const noScores = res.data.map((item: any) => parseInt(item.noScore));

      const labels = [...questions.map((question: string) => {
        const words = question.split(' ');
        const firstTwoWords = words.slice(0, 2).join(' ');
        return `${firstTwoWords}...`;
      })];

      this.exitsurvey = new Chart('exitChartCanvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: [...yesScores],
              label: 'Yes Score',
              borderColor: "#2980b9",
              backgroundColor: '#2980b9',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#2155a3',
              pointBorderColor: 'white',
            },
            {
              data: [...noScores],
              label: 'No Score',
              borderColor: "#70c4fe",
              backgroundColor: '#70c4fe',
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
              max: 50,
              min: -50,
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
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            },
            title: {
              display: true,
              text: 'Exit survey',
              font: {
                size: 15,
              },
              padding: {
                top: 5,
                bottom: 10
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          }
        },
      });
    }
  }

  executeExitDoughnutChart(res: any) {
    const optionCounts = res.data.optionCounts;

    const series = Object.values(optionCounts).reverse();
    const labels = Object.keys(optionCounts).reverse();

    const colors = ["#2155a3", "#2980b9", "#069de0", "#70c4fe", "#8e44ad", "#e74c3c", "#2980b9", "#4a8bec", "#f39c12", "#3498db", "#2ecc71", "#e67e22", "#ecf0f1"];

    this.exitdoughnutChart = {
      series: series,
      chart: {
        type: "donut",
        height: 320
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
      ],
      title: {
        text: "Exit Survey Reasons",
        align: 'center',
        style: {
          fontSize: '15px',
          color: '#2155a3'
        }
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value;
          }
        }
      },
    };
  }

  executeExitBarChart() {
    const questions = this.exitTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.exitTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.exitTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.exitBarChart) {
      this.exitBarChart.destroy();
    }


    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.exitBarChart = new Chart('exitbarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Exit survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


  executeOnBoardingGraph(res: any): void {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => (item.score / 5) * 100);

      const labels = questions.map((question: string) => {
        const trimmedQuestion = question.trim();
        const words = trimmedQuestion.split(' ');
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
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
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
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
                }
              }
            },
            title: {
              display: true,
              text: 'Onboarding feedback survey',
              font: {
                size: 15,
              },
              padding: {
                top: 5,
                bottom: 10
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          }
        },
      });
    }
  }



  executeOnbarodingBarChart(): void {
    const questions = this.onboardTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.onboardTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.onboardTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.onboardBarChart) {
      this.onboardBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.onboardBarChart = new Chart('onboardbarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Onboarding feedback survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  executeOjt(res: any): void {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => (item.score / 5) * 100);

      const labels = questions.map((question: string) => {
        const trimmedQuestion = question.trim();
        const words = trimmedQuestion.split(' ');
        const firstTwoWords = words.slice(0, 1).join(' ');
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
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
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
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
                }
              }
            },
            title: {
              display: true,
              text: 'On-the-job training effectiveness survey',
              font: {
                size: 15,
              },
              padding: {
                top: 5,
                bottom: 10
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          }
        },
      });
    }
  }


  executeojtBarChart(): void {
    const questions = this.ojtTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question?.trim().split(' ').filter(word => word?.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.ojtTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.ojtTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.ojtBarChart) {
      this.ojtBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.ojtBarChart = new Chart('ojtBarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'On-the-job training effectiveness survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  executeInduction(res: any) {
    if (res.data && res.data.questions) {
      const questions = res.data.questions.map((item: any) => item.question);
      const scores = res.data.questions.map((item: any) => (item.score / 5) * 100);

      const labels = questions.map((question: string) => {
        const trimmedQuestion = question.trim();
        const words = trimmedQuestion.split(' ');
        const firstTwoWords = words.slice(0, 1).join(' ');
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
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
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
                  return questions[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
                }
              }
            },
            title: {
              display: true,
              text: 'Induction effectiveness survey',
              font: {
                size: 15,
              },
              padding: {
                top: 5,
                bottom: 10
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          }
        },
      });
    }
  }


  executeInductionBarChart() {
    const questions = this.inductionTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word?.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.inductionTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.inductionTable.listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto.map((item: any) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.inductionBarChart) {
      this.inductionBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.inductionBarChart = new Chart('inductionBarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Induction effectiveness survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  executePulse(res: any): void {
    const categories = res.data?.xaxis.categories;
    const backendData = res.data?.backendData.map((item: any) => {
      return {
        name: item.name,
        data: item.data
      };
    });

    this.pulseChartOptions = {
      series: backendData.map((series: any) => ({
        name: series.name,
        data: series.data.map((value: any) => ({
          x: categories,
          y: value
        }))
      })),
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Pulse survey",
        align: 'center'
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
          text: ""
        }
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value + '';
          }
        }
      },
      colors: [],
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              { from: 0, to: 20, color: '#2155a3' },
              { from: 21, to: 40, color: '#069de0' },
              { from: 41, to: 60, color: '#70c4fe' },
              { from: 61, to: 80, color: '#2980b9' },
              { from: 81, to: 100, color: '#293c58' }
            ]
          }
        }
      }
    } as pulseChartOptions;
    // if (res.data && Array.isArray(res.data)) {
    //   const labels = res.data.map((item: any) => {
    //     return item.stageName.substring(0, 6); 
    //   });
    //   const fullLabels = res.data.map((item: any) => item.stageName); 

    //   const scores = res.data.map((item: any) => item.score);

    //   this.pulse = new Chart('pulsechartCanvas', {
    //     type: 'line',
    //     data: {
    //       labels: labels,
    //       datasets: [
    //         {
    //           data: scores,
    //           label: 'Score',
    //           borderColor: "#2980b9",
    //           backgroundColor: '#2980b9',
    //           tension: 0.4,
    //           fill: false,
    //           pointRadius: 5,
    //           pointBackgroundColor: '#069de0',
    //           pointBorderColor: 'white',
    //         },
    //       ],
    //     },
    //     options: {
    //       scales: {
    //         y: {
    //           beginAtZero: true,
    //           max: 500,
    //           min: 10,
    //         },
    //       },
    //       elements: {
    //         line: {
    //           borderWidth: 2,
    //         },
    //       },
    //       plugins: {
    //         tooltip: {
    //           callbacks: {
    //             title: function (tooltipItems) {
    //               const index = tooltipItems[0].dataIndex;
    //               return fullLabels[index]; // Show full label on tooltip
    //             },
    //             label: function (tooltipItem) {
    //               return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
    //             }
    //           }
    //         }
    //       }
    //     },
    //   });
    // }
  }


  execuetePulseBarGraph() {
    const questions = this.pulseDetails.map((item: { question: string }) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.pulseDetails[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.pulseDetails.map((item: { optionWithCount: { [x: string]: any; }; }) => item.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    if (this.pulseBarChart) {
      this.pulseBarChart.destroy();
    }

    const allDataValues = datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.pulseBarChart = new Chart('pulsebarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Pulse survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


  executeManagerLine(res: any) {
    if (res.data) {
      const data = res.data;
      console.log(data)
      const labels = ['Trust and Fairness', 'Support and Motivation', 'Impact'];
      const scores = [data.trustAndFairness, data.supportAndMotivation, data.impact];

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
                  return labels[index];
                },
                label: function (tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            },
            title: {
              display: true,
              text: 'Manager Effectiveness survey',
              font: {
                size: 15,
              },
              padding: {
                top: 5,
                bottom: 10
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
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
        cutout: '65%',
        plugins: {
          title: {
            display: true,
            text: 'Manager Effectiveness survey',
            font: {
              size: 15
            }
          }
        }
      },

    });
  }

  executeMangerBarChart() {
    const questions = this.managerTable?.listOfStaticSubPhase[0]?.staticQuestionScoreForSurveyResponseDto?.map((item: any) => item?.question);
    const truncatedQuestions = questions?.map((question: string) => {
      const words = question.trim().split(' ').filter(word => word.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.managerTable.listOfStaticSubPhase[0]?.staticQuestionScoreForSurveyResponseDto[0]?.optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.managerTable.listOfStaticSubPhase[0]?.staticQuestionScoreForSurveyResponseDto?.map((item: any) => item?.optionWithCount[category] || 0),
        backgroundColor: this.getColor(index)
      };
    });

    const allDataValues = datasets?.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    if (this.managerBarChart) {
      this.managerBarChart.destroy();
    }

    this.managerBarChart = new Chart('managerBarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: 'Manager Effectiveness Survey',
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }



  executeOtherLineChart(res: any) {
    const labels = res.data.map((item: any) => item.stageName.trim());
    const dataValues = res.data.map((item: any) => parseFloat(item.value));

    this.otherChart = new Chart('otherChartCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            label: 'Score',
            borderColor: "#70c4fe",
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
            max: 120,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
        plugins: {
          title: {
            display: true,
            text: this.paramsName,
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        }
      },
    });
  }

  // executeDonutGraphForENPS(res: any) {
  //   if(res.data===null){
  //     this.backendMessage = res.message;
  //   }
  //   const promoterInpercentage = res.data?.promoterInpercentage;
  //   const passiveInPercentage = res.data?.passiveInPercentage;
  //   const decractorsInPercentage = res.data?.decractorsInPercentage;

  //   const series = [promoterInpercentage, passiveInPercentage, decractorsInPercentage];
  //   const labels = ['Promoters', 'Passives', 'Detractors'];
  //   const colors = ["#2980b9", "#069de0", "#747687"];

  //   this.eNPSdoughnutChart = {
  //     series: series,
  //     chart: {
  //       type: "donut",
  //       height: 400
  //     },
  //     labels: labels,
  //     colors: colors,
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 300
  //           },
  //           legend: {
  //             position: "bottom"
  //           }
  //         }
  //       }
  //     ],
  //     legend: {
  //       position: 'bottom'
  //     },
  //     title: {
  //       text: "",
  //       align: 'center',
  //       style: {
  //         fontSize: '15px',
  //         color: '#2155a3'
  //       }
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (value: number) {
  //           return value + "%";
  //         }
  //       }
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           labels: {
  //             show: true,
  //             value: {
  //               fontWeight: 600,
  //               formatter: function (val:any) {
  //                 return val + '%';
  //               }
  //             },
  //             total: {
  //               show: true,
  //               label: '',
  //               formatter: function () {
  //                 return '35 ENPS';
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   };
  // }
  executeDonutGraphForENPS(res: any) {
    if (res.data === null) {
      this.backendMessage = res.message;
    }
    const promoterInpercentage = res.data?.promoterInpercentage;
    const passiveInPercentage = res.data?.passiveInPercentage;
    const decractorsInPercentage = res.data?.decractorsInPercentage;

    const series = [promoterInpercentage, passiveInPercentage, decractorsInPercentage];
    const labels = ['Promoters', 'Passives', 'Detractors'];
    const colors = ["#2155a3", "#069de0", "#747687"];

    this.eNPSdoughnutChart = {
      series: series,
      chart: {
        type: "donut",
        height: 400
      },
      labels: labels,
      colors: colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
        markers: {
          width: 12,
          height: 12,
        },
        itemMargin: {
          vertical: 5,
        },
        labels: {
          useSeriesColors: false,
          formatter: function (label: any, opts: any) {
            return label;
          }
        },
      },
      title: {
        text: "",
        align: 'center',
        style: {
          fontSize: '15px',
          color: '#2155a3'
        }
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value.toString();
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontWeight: 600,
                formatter: function (val: any) {
                  return val.toString();
                }
              },
              total: {
                show: true,
                label: 'ENPS = 35',
                fontWeight: 900,
                color: '#2155a3',
                style: {
                  fontSize: '25px',
                },
                formatter: function () {
                  return ''; // Keep the label constant
                }
              }
            }
          }
        }
      },
      stroke: {
        width: 1 // Adjust the stroke width to make the lines thinner
      }
    };
  }







  execueteOtherBarGraph() {
    const questions = this.otherDetails.map((item: { question: string }) => item.question);
    const truncatedQuestions = questions.map((question: string) => {
      const words = question?.trim().split(' ').filter(word => word?.length > 0);
      return words.slice(0, 2).join(' ') + '...';
    });

    const responseCategories = Object.keys(this.otherDetails[0].optionWithCount);

    const datasets = responseCategories.map((category, index) => {
      return {
        label: category.trim(),
        data: this.otherDetails.map((item: { optionWithCount: { [x: string]: any; }; }) => item.optionWithCount[category] || 0),
        backgroundColor: this.getOtherColor(index)
      };
    });

    if (this.otherBarChart) {
      this.otherBarChart?.destroy();
    }

    const allDataValues = datasets?.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allDataValues);

    const roundedMaxValue = this.roundToNearestRoundFigure(maxValue);

    this.otherBarChart = new Chart('otherbarChartCanvas', {
      type: 'bar',
      data: {
        labels: truncatedQuestions,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: roundedMaxValue,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                return questions[index];
              },
            },
          },
          title: {
            display: true,
            text: this.paramsName,
            font: {
              size: 15,
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


  roundToNearestRoundFigure(value: number): number {
    console.log(value)
    if (value <= 5) return 5;
    if (value <= 10) return 10;
    if (value <= 20) return 20;
    if (value <= 50) return 50;
    if (value <= 100) return 100;
    return Math.ceil(value / 100) * 100;
  }


  externalTooltipHandler(context: any) {
    // Implement your custom tooltip logic here
    const { chart, tooltip } = context;
    // Custom tooltip code
  }

  getColor(index: number): string {
    const colors = ['#2b3a67', '#747687', '#70c4fe', '#2980b9', '#2155a3', '#2b3a67', '#2ecc71'];
    return colors[index % colors.length];
  }

  getOtherColor(index: number): string {
    const colors = ['#2b3a67', '#70c4fe', '#2980b9', '#2155a3', '#2ecc71', '#2b3a67'];
    return colors[index % colors.length];
  }

  resetChartZoom(chart: Chart | undefined): void {
    if (chart) {
      chart.resetZoom();
    }
  }

  resetFUDSLineChartZoom(): void {
    this.resetChartZoom(this.fudsLineChart);
  }

  resetFUDSBarChartZoom(): void {
    this.resetChartZoom(this.fudsBarChart);
  }

  resetEEBarChartZoom(): void {
    this.resetChartZoom(this.eeBarChart)
  }

  resetExitLineChartZoom(): void {
    this.resetChartZoom(this.exitsurvey);
  }

  resetExitBarChartZoom(): void {
    this.resetChartZoom(this.exitBarChart);
  }

  resetOnboardingLineChartZoom(): void {
    this.resetChartZoom(this.onboardinglineChart);
  }

  resetOnboardingBarChartZoom(): void {
    this.resetChartZoom(this.onboardBarChart);
  }

  resetOjtLineChartZoom(): void {
    this.resetChartZoom(this.ojtEffectiveness);
  }

  resetOjtBarChartZoom(): void {
    this.resetChartZoom(this.ojtBarChart);
  }

  resetInductionLineChartZoom(): void {
    this.resetChartZoom(this.inductionSurvey);
  }

  resetInductionBarChartZoom(): void {
    this.resetChartZoom(this.inductionBarChart);
  }

  resetPulseBarChartZoom(): void {
    this.resetChartZoom(this.pulseBarChart);
  }

  resetManagerBarChartZoom(): void {
    this.resetChartZoom(this.managerBarChart);
  }

  resetManagerLineChartZoom(): void {
    this.resetChartZoom(this.managerEffectiveness);
  }

  resetOtherLineChartZoom(): void {
    this.resetChartZoom(this.otherChart);
  }

  resetOtherBarChartZoom(): void {
    this.resetChartZoom(this.otherBarChart);
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
    this.fudsDetails = this.fudsTable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0]?.staticQuestionScoreForSurveyResponseDto;
    this.executeFudsGraph();
  }

  setActiveTabForEE(tab: string) {
    this.activeTab = tab;
    this.eeDetails = this.eetable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
    this.execueteEEBarGraph();
  }

  setActiveTabForPulse(tab: string) {
    this.activeTab = tab;
    this.pulseDetails = this.pulsetable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
    this.execuetePulseBarGraph();
  }

  setActiveTabForOther(tab: string) {
    this.activeTab = tab;
    this.otherDetails = this.otherTable.find((item: { stage: string; }) => item.stage === tab).listOfStaticSubPhase[0].staticQuestionScoreForSurveyResponseDto;
    this.execueteOtherBarGraph();
  }

  toggleDisplay() {
    this.isTableVisible = !this.isTableVisible;
  }


  downloadChart(chartId: string, format: string) {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;

    if (format === 'png') {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${chartId}.png`;
      link.click();
    } else if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(canvas);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      saveAs(svgBlob, `${chartId}.svg`);
    } else if (format === 'csv') {
      this.downloadCSV(chartId);
    }
  }

  downloadCSV(chartId: string) {
    let chart;
    if (chartId === 'fudsChartCanvas') {
      chart = this.fudsLineChart;
    } else if (chartId === 'fudsbarChartCanvas') {
      chart = this.fudsBarChart;
    }

    const labels = chart!.data.labels!.map(label => label!.toString());
    const datasets = chart!.data.datasets.map((dataset: any) => {
      const data = dataset.data.map((value: number) => value.toString());
      return { label: dataset.label, data: data };
    });

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Label,' + datasets.map(ds => ds.label).join(',') + '\n';

    for (let i = 0; i < labels.length; i++) {
      const row = [labels[i]];
      datasets.forEach(ds => row.push(ds.data[i]));
      csvContent += row.join(',') + '\n';
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${chartId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  exportToPDF(pdfname: string) {
    this.checkPDFDownloadSpinner = true;
    const data = document.getElementById('survey-content');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 200;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 5;
        pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(pdfname + '.pdf');
        this.checkPDFDownloadSpinner = false;
      });
    }
  }

  goBack() {
    this.location.back();
  }
}


