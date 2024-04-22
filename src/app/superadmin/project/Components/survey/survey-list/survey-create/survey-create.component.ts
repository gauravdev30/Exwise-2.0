import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {

  constructor(private dialogRef: MatDialogRef<SurveyCreateComponent>){}

  onClose(){
    this.dialogRef.close();
  }
}
