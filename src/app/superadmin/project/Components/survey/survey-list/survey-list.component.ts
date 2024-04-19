import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyApiService } from '../service/survey-api.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent implements OnInit {
  surveyList:any;

  constructor(private dialog:MatDialog,private api:SurveyApiService){}

  ngOnInit(): void {
    this.api.getAllSurvey().subscribe((res)=>{
      if(res.success){
        this.surveyList=res.data;
      }
    })
  }

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
