import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StartstekholderComponent } from '../touchpoint-stakeholders/startstekholder/startstekholder.component';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-infochart',
  templateUrl: './infochart.component.html',
  styleUrl: './infochart.component.css'
})
export class InfochartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin','Preboarding','Welcome','Familiansation-riles & paid','Toas,system and passes','corporateinduction','Farmingconnections','Raeqarity and responsibilities','Raeapeafictraining',
    'Transition from traning to job','On the job support','Progressaneaking'],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40, 86, 64, 72, 34, 55, 67, 56, 46, 59, 83, 54], label: 'Attempted' },
      { data: [ 28, 48, 40, 19, 86, 27, 90, 67, 84, 56, 73, 74, 62, 75, 83, 74, 72, 74 ], label: ' Not Attempted' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  public touchpointLegend = true;
  public touchpointPlugins = [];

  // public touchpointData: ChartConfiguration<'bar'>['data'] = {
  //   labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin'],
  //   datasets: [
  //     {
  //       label: 'Application Portal',
  //       data: [55, 40, 86, 64, 72, 34, 54],
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)' // Customize the color as needed
  //     },
  //     {
  //       label: 'Bot',
  //       data: [27, 90, 67, 74, 72, 74, 73],
  //       backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Buddy',
  //       data: [10, 20, 30, 40, 50, 60, 70],
  //       backgroundColor: 'rgba(255, 205, 86, 0.5)',
  //       borderColor: 'rgba(255, 205, 86, 1)',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Company Website',
  //       data: [15, 25, 35, 45, 55, 65, 75],
  //       backgroundColor: 'rgba(75, 192, 192, 0.5)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Existing Employee/Friend',
  //       data: [20, 30, 40, 50, 60, 70, 80],
  //       backgroundColor: 'rgba(153, 102, 255, 0.5)',
  //       borderColor: 'rgba(153, 102, 255, 1)',
  //       borderWidth: 1
  //     }
  //   ]
  // };

  // public touchpointOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true,
  // scales: {
  //   x: {
  //     stacked: true
  //   },
  //   y: {
  //     stacked: true
    // }
  // }
  // };

  public touchpointData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Discovery', 'Reflection', 'Application', 'Shortlisted', 'Interview', 'Offer', 'Joining admin'],
    datasets: [
      {
        label: 'Touchpoints',
        data: [
          1, // Application Portal
          1, // Bot
          1, // Buddy
          1, // Company Website
          1  // Existing Employee/Friend
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Application Portal
          'rgba(54, 162, 235, 0.5)', // Bot
          'rgba(255, 205, 86, 0.5)', // Buddy
          'rgba(75, 192, 192, 0.5)', // Company Website
          'rgba(153, 102, 255, 0.5)' // Existing Employee/Friend
        ]
      }
    ]
  };
  
  public touchpointOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function(value: number) {
            return value === 1 ? 'Touchpoint' : '';
          } as any
        }
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  


  constructor(private dialogRef: MatDialogRef<StartstekholderComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
