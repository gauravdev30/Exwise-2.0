import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrl: './survey-response.component.css'
})
export class SurveyResponseComponent {
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

  submitSurvey() {
    // Logic to submit survey answers
  
  }
}
