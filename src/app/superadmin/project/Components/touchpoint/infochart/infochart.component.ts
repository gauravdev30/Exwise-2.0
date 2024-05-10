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
    responsive: true,
    scales: {
      // yAxes: [{
      //   ticks: {
      //     beginAtZero: true, 
      //     stepSize: 20,    
      //     max: 120
      //   }
      // }]
    }
  };

  constructor(private dialogRef: MatDialogRef<StartstekholderComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
