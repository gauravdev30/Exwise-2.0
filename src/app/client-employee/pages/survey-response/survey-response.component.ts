import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrl: './survey-response.component.css'
})
export class SurveyResponseComponent implements OnInit {

  surveyAssignmentId:any;

  instructions = [
    'First instruction here.',
    'Second instruction here.',
    'Third instruction here.',
  ];
  surveyQuestions= [
    {
      id: 1,
      question: 'How satisfied are you with the company culture?',
      type: 'multiple-choice',
      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied', 'Not Applicable']
    },
    {
      id: 2,
      question: 'Do you feel supported by your team members?',
      type: 'multiple-choice',
      options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree', 'Not Applicable']
    },
    {
      id: 3,
      question: 'What improvements would you suggest for the workplace environment?',
      type: 'open-ended'
    },
    {
      id: 4,
      question: 'Additional comments (Optional)',
      type: 'mixed',
      options: ['Positive', 'Neutral', 'Negative', 'Not Sure', 'Other', 'Not Applicable'],
      includeTextarea: true
    }
    // Add more questions as needed
  ];

  constructor(private route: ActivatedRoute,private api:EmployeeService){}

  ngOnInit(): void {
    this.surveyAssignmentId = +this.route.snapshot.paramMap.get('id')!;
    this.api.getSurveyBysurveyAssignmentId(this.surveyAssignmentId).subscribe({next:(res)=>{
      this.surveyQuestions=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  submitSurvey() {
      
  }
}