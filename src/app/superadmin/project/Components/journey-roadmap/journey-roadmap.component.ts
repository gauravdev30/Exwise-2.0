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
  barChart3:any=[];
  activeTab: string = 'survey';

  survey: any;
  datatouchPointStakeHolders: any;
  touchpoint:any;
  questionListWithOptionCount:any;
  touchPointEfficiencies:any;
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
  touchPointLabels:any;
  touchPointEfficienciesLabels:any;
  stagelineChart:any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private service: ProjectService) { }
  ngOnInit(): void {
    this.getJourneyMapData();
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

          console.log(this.survey);
          this.responseData = this.data.responseOuterChart;
          this.lineChartData = this.data.lineOuterChart;

          const labels = this.lineChartData.map((item: any) => item.label);
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
                    label: 'Survey',
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
                    label: 'Reality',
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
                    label: 'Touchpoint',
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



  clickOnStage(stageDetail: any) {

    this.survey.forEach((val: any) => (val.clicked = val.stageName === stageDetail.stageName));


    this.stages = stageDetail;
    console.log(this.stages);
    
    this.datatouchPointStakeHolders = stageDetail.touchPointStakeHolders;
    this.touchpoint=stageDetail.touchPoint
    this.stagelineChart=stageDetail.lineChart
    this.questionListWithOptionCount=stageDetail.questionListWithOptionCount
   this.touchPointEfficiencies=stageDetail.touchPointEfficiencies;
    console.log(this.touchPointEfficiencies);
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

    this.touchPointStakeHoldersLabels = this.datatouchPointStakeHolders.map((stage: any) => stage.label);
    this.touchPointLabels=this.touchpoint.map((itemLabel:any)=>itemLabel.subphaseName)
    this.touchPointEfficienciesLabels=this.touchPointEfficiencies.map((labelsOfEfficinecy:any)=>labelsOfEfficinecy.subphaseName)
   
    
    const ownershipCategories = new Set<string>();
    const ownershipCategories2 = new Set<string>();
    const ownershipCategories3 = new Set<string>();

    this.touchpoint.forEach((stage:any)=>{
      Object.keys(stage.touchPointData).forEach(categoryData => {
        ownershipCategories2.add(categoryData);
      });
    })
    
    this.datatouchPointStakeHolders.forEach((stage: any) => {
      Object.keys(stage.ownershipData).forEach(category => {
        ownershipCategories.add(category);
      });
    });

    this.touchPointEfficiencies.forEach((data:any)=>{
      Object.keys(data).forEach(addData =>{
        ownershipCategories3.add(addData)
        console.log(addData);
        
      })
    })

    const datasets = Array.from(ownershipCategories).map(category => {
      return {
        label: category,
        data: this.datatouchPointStakeHolders.map((stage: any) => stage.ownershipData[category] || 0),
        backgroundColor: this.getRandomColor(),
      };
    });

    const datasets2 = Array.from(ownershipCategories2).map(category => {
      return {
        label: category,
        data: this.touchpoint.map((stage: any) => stage.touchPointData[category] || 0),
        backgroundColor: this.getRandomColor(),
      };
    });

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
              label: 'Survey',
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
              label: 'Reality',
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
              label: 'Touchpoint',
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
    }, 1000);

  }

   getRandomColor(){
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

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
  public efficiencyData3: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public efficiencyOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  


  showQuestionGraph(res: any) {
    const xAxisCategories = res.map((item: any) => item.question);
    const agreeData = res.map((item: any) => item.agree);
    const stronglyAgreeData = res.map((item: any) => item.stronglyAgree);
    const disagreeData = res.map((item: any) => item.disagree);
    const stronglyDisagreeData = res.map((item: any) => item.stronglyDisagree);
    const neitherAgreeNorDisagreeData = res.map((item: any) => item.neitherAgreeNorDisagree);

    const seriesData = [
      {
        name: 'Agree',
        data: agreeData
      },
      {
        name: 'Strongly Agree',
        data: stronglyAgreeData
      },
      {
        name: 'Disagree',
        data: disagreeData
      },
      {
        name: 'Strongly Disagree',
        data: stronglyDisagreeData
      },
      {
        name: 'Neither Agree Nor Disagree',
        data: neitherAgreeNorDisagreeData
      }
    ];

    this.chartOptions = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: xAxisCategories
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val + "";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      },
      colors: ['#2155a3', '#2980b9', '#069de0', '#70c4fe', '#7ec5f8']
    };
  }


}
