import { Component } from '@angular/core';

@Component({
  selector: 'app-stat-reality',
  templateUrl: './stat-reality.component.html',
  styleUrl: './stat-reality.component.css'
})
export class StatRealityComponent {
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
      options: ['Yes','No']
    },
    {
      id: 2,
      question: 'Do you feel supported by your team members?',
      type: 'multiple-choice',
      options: ['Yes','No']
    },
    {
      id: 3,
      question: 'What improvements would you suggest for the workplace environment?',
      type: 'multiple-choice',
      options: ['Yes','No']

    },
    {
      id: 4,
      question: 'Additional comments (Optional)',
      type: 'multiple-choice',
      options: ['Yes','No']
    }
    // Add more questions as needed
  ];

  submitSurvey() {
      
  }
}
