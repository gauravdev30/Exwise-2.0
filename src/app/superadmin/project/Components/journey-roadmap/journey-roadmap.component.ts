import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Chart, ChartConfiguration } from 'chart.js';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
} from 'ng-apexcharts';
import { BaseChartDirective } from 'ng2-charts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'app-journey-roadmap',
  templateUrl: './journey-roadmap.component.html',
  styleUrl: './journey-roadmap.component.css',
})
export class JourneyRoadmapComponent implements OnInit {
  substagesData: any;
  data: any = [];
  barChart: any = [];
  barChart2: any = [];
  barChart3: any = [];
  activeTab: string = 'survey';

  survey: any;
  datatouchPointStakeHolders: any;
  touchpoint: any;
  questionListWithOptionCount: any;
  touchPointEfficiencies: any;
  isLoading: boolean = false;
  responseData: any;
  lineChartData: any;
  dataLineChart: any;
  chartOptions: any;
  surveyValues: any;
  qualityValues: any;
  realityValues: any;
  surveyValues2: any;
  qualityValues2: any;
  realityValues2: any;
  stages: any;
  touchPointStakeHoldersLabels: any;
  touchPointLabels: any;
  touchPointEfficienciesLabels: any;
  stagelineChart: any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private service: ProjectService) { }
  ngOnInit(): void {
    this.getJourneyMapData();
    this.clickOnStage(this.survey[0]);
  }

  tab(tab: string) {
    this.activeTab = tab;
  }

  getJourneyMapData() {
    this.isLoading = true;
    this.service
      .journeyMapnByClientId(sessionStorage.getItem('ClientId'))
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.data = res.data;
          console.log(this.data);
          this.survey = this.data.stages;
          if (this.survey && this.survey.length > 0) {
            this.survey[0].clicked = true;
            this.clickOnStage(this.survey[0]);
          }
          console.log(this.survey);
          this.responseData = this.data.responseOuterChart;
          this.lineChartData = this.data.lineOuterChart;

          // const labels = this.lineChartData.map((item: any) => item.label);
          const labels = this.lineChartData.map((item: any) => {
            const trimmedLabel = item.label.trim();
            const words = trimmedLabel.split(' ');
            const firstTwoWords = words.slice(0, 1).join(' ');
            return firstTwoWords;
          });

          this.surveyValues = this.lineChartData.map(
            (item: any) => item.surveyValue
          );
          this.realityValues = this.lineChartData.map(
            (item: any) => item.realityValue
          );
          this.qualityValues = this.lineChartData.map(
            (item: any) => item.qualityValue
          );
          this.updateBarChartData();
          setTimeout(() => {
            this.barChart = new Chart('barChartCanvas', {
              type: 'line',
              data: {
                labels: labels,
                datasets: [
                  {
                    data: this.surveyValues,
                    label: 'EX foundations satisfaction ',
                    borderColor: '#70c4fe',
                    backgroundColor: '#70c4fe',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#069de0',
                    pointBorderColor: 'white',
                  },
                  {
                    data: this.realityValues,
                    label: 'EX foundations  reality',
                    borderColor: '#2980b9',
                    backgroundColor: '#2980b9',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#2155a3',
                    pointBorderColor: 'white',
                  },
                  {
                    data: this.qualityValues,
                    label: 'EX foundations Quality',
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
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              },
            });
          }, 1000);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => { },
      });
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#70C4fe',
        label: 'responces',
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', // Ensure the chart is horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  updateBarChartData() {
    if (this.responseData) {
      const labels = Object.keys(this.responseData);
      const values = Object.values(this.responseData).map((value) =>
        Number(value)
      );

      this.barChartData.labels = labels;
      this.barChartData.datasets[0].data = values;

      // Update the chart
      this.chart?.update();
    }
  }

  stageName: any;

  clickOnStage(stageDetail: any) {
    console.log(stageDetail);

    this.data.stages.forEach((val: any) => (val.clicked = false));

    stageDetail.clicked = true;

    this.stageName = stageDetail.stageName;

    this.stages = stageDetail;

    this.datatouchPointStakeHolders = stageDetail.touchPointStakeHolders;
    this.touchpoint = stageDetail.touchPoint;
    this.stagelineChart = stageDetail.lineChart;
    this.questionListWithOptionCount = stageDetail.questionListWithOptionCount;
    this.touchPointEfficiencies = stageDetail.touchPointEfficiencies;

    this.setChartData(this.touchPointEfficiencies);
    this.showQuestionGraph(this.questionListWithOptionCount);
    const labels = this.stagelineChart.map((item: any) => item.label);
    this.surveyValues2 = this.stagelineChart.map(
      (item: any) => item.surveyValue
    );
    this.realityValues2 = this.stagelineChart.map(
      (item: any) => item.realityValue
    );
    this.qualityValues2 = this.stagelineChart.map(
      (item: any) => item.qualityValue
    );

    this.touchPointStakeHoldersLabels = this.datatouchPointStakeHolders.map(
      (stage: any) => stage.label
    );
    this.touchPointLabels = this.touchpoint.map(
      (itemLabel: any) => itemLabel.subphaseName
    );

    const ownershipCategories = new Set<string>();
    const ownershipCategories2 = new Set<string>();

    this.touchpoint.forEach((stage: any) => {
      Object.keys(stage.touchPointData).forEach((categoryData) => {
        ownershipCategories2.add(categoryData);
      });
    });

    this.datatouchPointStakeHolders.forEach((stage: any) => {
      Object.keys(stage.ownershipData).forEach((category) => {
        ownershipCategories.add(category);
      });
    });

    const datasets = Array.from(ownershipCategories).map((category, index) => {
      return {
        label: category,
        data: this.datatouchPointStakeHolders.map(
          (stage: any) => stage.ownershipData[category] || 0
        ),
        backgroundColor: this.colors[index % this.colors.length],
      };
    });

    const datasets2 = Array.from(ownershipCategories2).map(
      (category, index) => {
        return {
          label: category,
          data: this.touchpoint.map(
            (stage: any) => stage.touchPointData[category] || 0
          ),
          backgroundColor: this.colors[index % this.colors.length],
        };
      }
    );

    this.efficiencyData = {
      labels: this.touchPointStakeHoldersLabels,
      datasets: datasets,
    };

    this.efficiencyData2 = {
      labels: this.touchPointLabels,
      datasets: datasets2,
    };

    setTimeout(() => {
      this.barChart2 = new Chart('barChartCanva2', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: this.surveyValues2,
              label: 'EX foundations satisfaction ',
              borderColor: '#70c4fe',
              backgroundColor: '#70c4fe',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#069de0',
              pointBorderColor: 'white',
            },
            {
              data: this.realityValues2,
              label: 'EX foundations  reality',
              borderColor: '#2980b9',
              backgroundColor: '#2980b9',
              tension: 0.4,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#2155a3',
              pointBorderColor: 'white',
            },
            {
              data: this.qualityValues2,
              label: 'EX foundations Quality',
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
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }, 1000);
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  private colors: string[] = [
    '#70c4fe',
    '#2980b9',
    '#747687',
    '#2155a3',
    '#2B3A67',
    '#70c4fe',
    '#2155a3',
  ];

  public efficiencyLegend = true;
  public efficiencyPlugins = [];

  public efficiencyData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  public efficiencyData2: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  public efficiencyData3!: ChartConfiguration<'bar'>['data'];

  public efficiencyOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  setChartData(data: any) {
    const labels = data.map((item: any) => item.subphaseName);
    const partiallyAutomated = data.map((item: any) => item.partiallyAutomated);
    const internalSystem = data.map((item: any) => item.internalSystem);
    const externalSystem = data.map((item: any) => item.externalSystem);
    const automated = data.map((item: any) => item.automated);
    const manual = data.map((item: any) => item.manual);

    this.efficiencyData3 = {
      labels: labels,
      datasets: [
        {
          label: 'Partially Automated',
          data: partiallyAutomated,
          backgroundColor: '#70c4fe',
        },
        {
          label: 'Internal System',
          data: internalSystem,
          backgroundColor: '#2980b9',
        },
        {
          label: 'External System',
          data: externalSystem,
          backgroundColor: '#747687 ',
        },
        {
          label: 'Automated',
          data: automated,
          backgroundColor: '#2155a3 ',
        },
        {
          label: 'Manual',
          data: manual,
          backgroundColor: '#2B3A67 ',
        },
      ],
    };
  }

  showQuestionGraph(res: any) {
    const xAxisCategories = res.map((item: any) => item.question);
    const agreeData = res.map((item: any) => item.agree);
    const stronglyAgreeData = res.map((item: any) => item.stronglyAgree);
    const disagreeData = res.map((item: any) => item.disagree);
    const stronglyDisagreeData = res.map((item: any) => item.stronglyDisagree);
    const neitherAgreeNorDisagreeData = res.map(
      (item: any) => item.neitherAgreeNorDisagree
    );

    const seriesData = [
      {
        name: 'Agree',
        data: agreeData,
        backgroundColor: '#2980b9',
      },
      {
        name: 'Strongly Agree',
        data: stronglyAgreeData,
        backgroundColor: '#70c4fe',
      },
      {
        name: 'Disagree',
        data: disagreeData,
        backgroundColor: '#2155a3',
      },
      {
        name: 'Strongly Disagree',
        data: stronglyDisagreeData,
        backgroundColor: '#2B3A67',
      },
      {
        name: 'Neither Agree Nor Disagree',
        data: neitherAgreeNorDisagreeData,
        backgroundColor: '#747687',
      },
    ];

    this.chartOptions = {
      series: seriesData,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: xAxisCategories,
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val + '';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
      colors: ['#2980b9', '#70c4fe', '#2155a3', '#2B3A67', '#747687'],
    };
  }
}
