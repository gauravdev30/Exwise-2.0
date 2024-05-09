import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-survey-info',
  templateUrl: './survey-info.component.html',
  styleUrl: './survey-info.component.css'
})
export class SurveyInfoComponent {
  details1:any[]=[];
  details: any[] = [
    {
      surveyName: 'Survey 1',
      description: 'Description',
      status: 'Active',
      createdDate: '2024-04-22',
      id: 1
    },
    {
      surveyName: 'Survey 2',
      description: 'Description',
      status: 'Inactive',
      createdDate: '2024-04-20',
      id: 2 
    },
  ]
  constructor(private service: ProjectService,private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe((res: any) => {
      console.log(res);
      this.details = res.data;
    })
  }
  onClick(id:any){
    let url = this.router.url.replace("surveyInfo", `/dashboard/${id}/phase-one`)
    this.router.navigate([url])
  }
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Survey 1', 'Survey 2', 'Survey 3', 'Survey 4'],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Attempted' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: ' Not Attempted' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}
