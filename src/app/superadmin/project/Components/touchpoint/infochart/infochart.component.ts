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
  styleUrl: './infochart.component.css'
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
  private colors: string[] = [
    '#70c4fe',
    '#2980b9',
    '#747687',
    '#2155a3',
    '#2B3A67',
    '#70c4fe',
    '#2155a3',
  ];
  constructor(private dialogRef: MatDialogRef<StartstekholderComponent>, @Inject(DIALOG_DATA) public data: { id: number }, private api: TouchpointService) { }

  ngOnInit(): void {
    this.id = this.data.id
    console.log(this.id);
    this.api.getGraph(this.id).subscribe((res: any) => {
      console.log(res);
      this.graphData = res.data
      this.stageName = this.graphData.stageName;
      this.touchpoint = this.graphData.touchPoint;

      this.touchPointLabels = this.touchpoint.map(
        (itemLabel: any) => itemLabel.subphaseName
      );
      const ownershipCategories2 = new Set<string>();
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
      this.datatouchPointStakeHolders = this.graphData.touchPointStakeHolders;

      this.touchPointStakeHoldersLabels = this.datatouchPointStakeHolders.map(
        (stage: any) => stage.label
      );

      const datasets = Array.from(ownershipCategories).map((category, index) => {
        return {
          label: category,
          data: this.datatouchPointStakeHolders.map(
            (stage: any) => stage.ownershipData[category] || 0
          ),
          backgroundColor: this.colors[index % this.colors.length],
        };
      });

      this.efficiencyData = {
        labels: this.touchPointStakeHoldersLabels,
        datasets: datasets,
      };

      this.lineChartData = this.graphData.lineChart
      const labels = this.lineChartData.map((item: any) => {
        const trimmedLabel = item.label.trim();
        const words = trimmedLabel.split(' ');
        const firstTwoWords = words.slice(0, 1).join(' ');
        return firstTwoWords;
      });
      this.realityValues = this.lineChartData.map(
        (item: any) => item.realityValue
      )
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
    })
  }




  public touchpointLegend = true;
  public touchpointPlugins = [];

  public touchpointData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Discovery', 'Reflection', 'Application', 'Shortlisted', 'Interview', 'offer', 'Joining admin'],
    datasets: [
      {
        label: 'Application Portal',
        data: [0, 40, 86, 64, 72, 34, 54],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Bot',
        data: [0, 90, 67, 74, 72, 74, 73],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Buddy',
        data: [0, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
      {
        label: 'Company Website',
        data: [0, 25, 35, 45, 55, 65, 75],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Existing Employee/Friend',
        data: [20, 30, 40, 50, 60, 70, 80],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      }
    ]
  };

  public touchpointOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  public efficiencyLegend = true;
  public efficiencyPlugins = [];

  public efficiencyData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Discovery', 'Reflection', 'Application', 'Shortlisted', 'Interview', 'offer', 'Joining admin'],
    datasets: [
      {
        label: 'Application Portal',
        data: [55, 40, 86, 64, 72, 34, 54],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
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
      }
    ]
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
