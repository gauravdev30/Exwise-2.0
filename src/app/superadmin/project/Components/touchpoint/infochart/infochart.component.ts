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

  public lineChartLegend = true;
public lineChartPlugins = [];

constructor(private dialogRef: MatDialogRef<StartstekholderComponent>){}

ngOnInit(): void {
  
}


public lineChartData: ChartConfiguration<'line'>['data'] = {
  labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin','Preboarding','Welcome','Familiansation-riles & paid','Toas,system and passes','corporateinduction','Farmingconnections','Raeqarity and responsibilities','Raeapeafictraining',
  'Transition from traning to job','On the job support','Progressaneaking'],
  datasets: [
    { data: [ 65, 59, 80, 81, 56, 55, 40, 86, 64, 72, 34, 55, 67, 56, 46, 59, 83, 54], label: 'EX Satisfaction Score' },
    { data: [ 28, 48, 40, 19, 46, 77, 90, 67, 84, 56, 73, 74, 62, 75, 83, 74, 72, 74], label: 'EX Fondations Reality' },
    { data: [ 83, 39, 60, 11, 96, 35, 60, 66, 94, 72, 44, 95, 55, 73, 26, 89, 45, 34], label: 'EX Fondations Quality' },
  ]
};

public lineChartOptions: ChartConfiguration<'line'>['options'] = {
  responsive: true
};

  public touchpointLegend = true;
  public touchpointPlugins = [];

  public touchpointData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin'],
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
    labels: [ 'Discovery','Reflection','Application','Shortlisted','Interview','offer','Joining admin'],
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
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
  };


  onClose(): void {
    this.dialogRef.close();
  }
}
