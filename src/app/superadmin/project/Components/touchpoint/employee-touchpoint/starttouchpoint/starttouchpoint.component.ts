import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-starttouchpoint',
  templateUrl: './starttouchpoint.component.html',
  styleUrl: './starttouchpoint.component.css'
})
export class StarttouchpointComponent {

  realityQuality = [
    {
      id: 1,
      question: 'Detailed careers',
      options: ['Yes', 'No']
    },
    {
      id: 2,
      question: 'Employee stories',
      options: ['Yes', 'No']
    },
    {
      id: 3,
      question: 'Accurate job adverts',
      options: ['Yes', 'No']
    },
    {
      id: 4,
      question: 'Plain English',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Contact point',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Pay scale',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Benefits advertised',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Recruitment overview',
      options: ['Yes', 'No']
    },
    
  ];

  extouchpoints = [
    {
      id: 1,
      question: 'Application portal',
      options: ['Yes', 'No']
    },
    {
      id: 2,
      question: 'Bot',
      options: ['Yes', 'No']
    },
    {
      id: 3,
      question: 'Company website',
      options: ['Yes', 'No']
    },
    {
      id: 4,
      question: 'Existing employee / friend',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'External venue',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Hiring Manager',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Interview panel',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Job fair',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Link Manager',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'LinkedIn',
      options: ['Yes', 'No']
    },
    {
      id: 1,
      question: 'Metting room',
      options: ['Yes', 'No']
    },
    
  ];
  
  

  constructor(private dialogRef: MatDialogRef<StarttouchpointComponent>){}

  onClose(): void {
    this.dialogRef.close();
  }

  submitTouchpoints(){
    
  }

}
