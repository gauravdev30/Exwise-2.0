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
  activeTab: string = 'survey';

  survey: any;
datatouchPointStakeHolders:any;
  isLoading: boolean = false;
  responseData: any;
  lineChartData: any;
  dataLineChart: any;
  chartOptions: any;
  surveyValues: any;
  qualityValues: any;
  realityValues: any;
  stages: any;
  touchPointStakeHoldersLabels:any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private service: ProjectService) {}
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
        complete: () => {},
      });
  }

  clickOnStage(stageDetail: any) {
    console.log(stageDetail);
    
    this.survey.forEach(
      (val: any) => (val.clicked = val.stageName == stageDetail.stageName)
    );
    this.stages = stageDetail;
    this.datatouchPointStakeHolders=stageDetail.touchPointStakeHolders
    console.log(this.datatouchPointStakeHolders);
    this.touchPointStakeHoldersLabels=this.datatouchPointStakeHolders.map((item:any)=>{item.label})
    console.log(this.touchPointStakeHoldersLabels);
    
    
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

  public efficiencyLegend = true;
  public efficiencyPlugins = [];

  public efficiencyData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Discovery',
      'Reflection',
      'Application',
      'Shortlisted',
      'Interview',
      'offer',
      'Joining admin',
    ],
    datasets: [
      {
        label: 'Application Portal',
        data: [55, 40, 86, 64, 72, 34, 54],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Bot',
        data: [27, 90, 67, 74, 72, 74, 73],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Buddy',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
      {
        label: 'Company Website',
        data: [15, 25, 35, 45, 55, 65, 75],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Existing Employee/Friend',
        data: [20, 30, 40, 50, 60, 70, 80],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
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
}
