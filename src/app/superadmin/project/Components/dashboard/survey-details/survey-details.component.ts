import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.css'
})
export class SurveyDetailsComponent {
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
  onClick(){
    this.router.navigate(['dashboard']);
  }
}
