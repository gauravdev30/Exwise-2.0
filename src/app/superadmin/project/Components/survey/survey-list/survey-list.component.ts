import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyCreateComponent } from './survey-create/survey-create.component';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent {
  surveyList:any;

  constructor(private dialog:MatDialog){}

  editSurvey(surveyId:number){

  }

  deleteSurvey(surveyId:number){

  }

  pinSurvey(surveyId:number){

  }

  openPopup(): void {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '800px',
      height: '530px',
      disableClose: true,
      // data: { id: 1},
    });
  }
}
