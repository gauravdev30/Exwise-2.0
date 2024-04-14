import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items: any[] = [
    {surveyId:'1', surveyName:'Name 1', status: 'Attempted' },
    {surveyId:'2', surveyName:'Name 2', status: 'Not attempted' },
    {surveyId:'3', surveyName:'Name 3', status: 'Attempted' }
  ];
}
