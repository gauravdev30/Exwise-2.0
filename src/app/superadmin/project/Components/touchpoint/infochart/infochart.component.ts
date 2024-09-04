import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StartstekholderComponent } from '../touchpoint-stakeholders/startstekholder/startstekholder.component';

import { TouchpointService } from '../../../../services/touchpoint.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
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
  selector: 'app-infochart',
  templateUrl: './infochart.component.html',
  styleUrl: './infochart.component.css',
})
export class InfochartComponent implements OnInit {
  barChart: any = [];
  public lineChartLegend = true;
  public lineChartPlugins = [];
  lineChartData: any;
  id: any;
  graphData: any;
  realityValues: any;
  qualityValues: any;
  stageName: any;
  touchpoint: any;
  datatouchPointStakeHolders: any;
  touchPointStakeHoldersLabels: any;
  touchPointLabels: any;
  touchPointEfficiencies:any;
  touchPointEfficiencies2:any;
  stages: any;
  survey:any;
  private colors: string[] = [
    '#70c4fe',
    '#2980b9',
    '#747687',
    '#2155a3',
    '#2B3A67',
    '#70c4fe',
    '#2155a3',
  ];
  constructor(
    private dialogRef: MatDialogRef<StartstekholderComponent>,
    @Inject(DIALOG_DATA) public data: { id: number },
    private api: TouchpointService
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem("ClientId")
    console.log(this.id);
    this.api.toucpointGraph(this.id).subscribe((res: any) => {
      console.log(res);
      this.graphData = res.data;
      this.stageName = this.graphData.stageName;
      this.survey = this.graphData.stages;
      this.clickOnStage(this.survey[0]);
      // this.touchpoint = this.graphData.touchPoint;
      // this.datatouchPointStakeHolders =  this.graphData.touchPointStakeHolders;
      // this.touchPointEfficiencies = this.graphData.touchPointEfficiencies;
      // this.setChartData(this.touchPointEfficiencies);
      // const ownershipCategories2 = new Set<string>();
   
      // this.touchPointLabels = this.touchpoint.map(
      //   (itemLabel: any) => itemLabel.subphaseName
      // );

      // this.touchpoint.forEach((stage: any) => {
      //   Object.keys(stage.touchPointData).forEach((categoryData) => {
      //     ownershipCategories2.add(categoryData);
      //   });
      // });
     
      // const datasets2 = Array.from(ownershipCategories2).map(
      //   (category, index) => {
      //     return {
      //       label: category,
      //       data: this.touchpoint.map(
      //         (stage: any) => stage.touchPointData[category] || 0
      //       ),
      //       backgroundColor: this.colors[index % this.colors.length],
      //     };
      //   }
      // );

      // this.efficiencyData2 = {
      //   labels: this.touchPointLabels,
      //   datasets: datasets2,
      // };

      // const ownershipCategories = new Set<string>();
     
      // this.touchPointStakeHoldersLabels = this.datatouchPointStakeHolders.map(
      //   (stage: any) => stage.label
      // );

      // this.datatouchPointStakeHolders.forEach((stage: any) => {
      //   Object.keys(stage.ownershipData).forEach((category) => {
      //     ownershipCategories.add(category);
      //   });
      // });
      // const datasets = Array.from(ownershipCategories).map(
      //   (category, index) => {
      //     return {
      //       label: category,
      //       data: this.datatouchPointStakeHolders.map(
      //         (stage: any) => stage.ownershipData[category] || 0
      //       ),
      //       backgroundColor: this.colors[index % this.colors.length],
      //     };
      //   }
      // );

      // this.efficiencyData = {
      //   labels: this.touchPointStakeHoldersLabels,
      //   datasets: datasets,
      // };

      this.lineChartData = this.graphData.lineOuterChart;
      const labels = this.lineChartData.map((item: any) => {
        const trimmedLabel = item.label.trim();
        const words = trimmedLabel.split(' ');
        const firstTwoWords = words.slice(0, 1).join('');
        return firstTwoWords;
      });
      this.realityValues = this.lineChartData.map(
        (item: any) => item.realityValue
      );
      this.qualityValues = this.lineChartData.map(
        (item: any) => item.qualityValue
      );
      setTimeout(() => {
        this.barChart = new Chart('barChartCanvas', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
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
    });
  }

clickOnStage(stageDetail: any){
  console.log(stageDetail);

  this.graphData.stages.forEach((val: any) => (val.clicked = false));

  stageDetail.clicked = true;

  this.stageName = stageDetail.stageName;

  this.stages = stageDetail;

  this.datatouchPointStakeHolders = stageDetail?.touchPointStakeHolders;
  this.touchpoint = stageDetail?.touchPoint;
  this.touchPointEfficiencies = stageDetail?.touchPointEfficiencies;
  this.touchPointEfficiencies2 = stageDetail?.touchPointEfficiencies2;

   this.setChartData(this.touchPointEfficiencies);
   this.setChartDataForInternalExternal(this.touchPointEfficiencies2);
      const ownershipCategories2 = new Set<string>();
   
      this.touchPointLabels = this.touchpoint.map(
        (itemLabel: any) => itemLabel.subphaseName
      );

      this.touchpoint.forEach((stage: any) => {
        Object.keys(stage.touchPointData).forEach((categoryData) => {
          ownershipCategories2.add(categoryData);
        });
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

      this.efficiencyData2 = {
        labels: this.touchPointLabels,
        datasets: datasets2,
      };

      const ownershipCategories = new Set<string>();
     
      this.touchPointStakeHoldersLabels = this.datatouchPointStakeHolders.map(
        (stage: any) => stage.label
      );

      this.datatouchPointStakeHolders.forEach((stage: any) => {
        Object.keys(stage.ownershipData).forEach((category) => {
          ownershipCategories.add(category);
        });
      });
      const datasets = Array.from(ownershipCategories).map(
        (category, index) => {
          return {
            label: category,
            data: this.datatouchPointStakeHolders.map(
              (stage: any) => stage.ownershipData[category] || 0
            ),
            backgroundColor: this.colors[index % this.colors.length],
          };
        }
      );

      this.efficiencyData = {
        labels: this.touchPointStakeHoldersLabels,
        datasets: datasets,
      };
}


  setChartData(data: any) {
    const labels = data.map((item: any) => item.subphaseName);
    const partiallyAutomated = data.map((item: any) => item.partiallyAutomated);
    // const internalSystem = data.map((item: any) => item.internalSystem);
    // const externalSystem = data.map((item: any) => item.externalSystem);
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
        // {
        //   label: 'Internal System',
        //   data: internalSystem,
        //   backgroundColor: '#2980b9',
        // },
        // {
        //   label: 'External System',
        //   data: externalSystem,
        //   backgroundColor: '#747687 ',
        // },
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

  setChartDataForInternalExternal(data: any) {
    const labels = data.map((item: any) => item.subphaseName);
    // const partiallyAutomated = data.map((item: any) => item.partiallyAutomated);
    const internalSystem = data.map((item: any) => item.internalSystem);
    const externalSystem = data.map((item: any) => item.externalSystem);
    // const automated = data.map((item: any) => item.automated);
    // const manual = data.map((item: any) => item.manual);

    this.efficiencyData4 = {
      labels: labels,
      datasets: [
        // {
        //   label: 'Partially Automated',
        //   data: partiallyAutomated,
        //   backgroundColor: '#70c4fe',
        // },
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
        // {
        //   label: 'Automated',
        //   data: automated,
        //   backgroundColor: '#2155a3 ',
        // },
        // {
        //   label: 'Manual',
        //   data: manual,
        //   backgroundColor: '#2B3A67 ',
        // },
      ],
    };
  }
  public touchpointLegend = true;
  public touchpointPlugins = [];



  public touchpointOptions: ChartConfiguration<'bar'>['options'] = {
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

  public efficiencyLegend = true;
  public efficiencyPlugins = [];
  public efficiencyData3!: ChartConfiguration<'bar'>['data'];
  public efficiencyData4!: ChartConfiguration<'bar'>['data'];

  public efficiencyData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

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

  public efficiencyData2: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  onClose(): void {
    this.dialogRef.close();
  }
}
