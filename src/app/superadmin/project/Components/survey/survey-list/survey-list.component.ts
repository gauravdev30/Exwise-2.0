import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyApiService } from '../survey-api.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent {
  surveyList:any;
  p: number = 0;
  page:number=1;
  totalPages: number = 1;
  size:number=10;
  orderBy:any='asc';
  sortBy:any='id';
  constructor(private dialog:MatDialog,private api:SurveyApiService){}

  editSurvey(surveyId:number){
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
      data: { surveyId: surveyId},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSurveyList();
    });
  }

  deleteSurvey(surveyId:number){

  }

  pinSurvey(surveyId:number){

  }
  getSurveyList(){
    this.api.getAllSurveyPagination(this.p,this.size,this.orderBy,this.sortBy).subscribe((res:any)=>{
      if(res.success){
        this.surveyList=res.data;
        console.log(res.data);
        this.totalPages = Math.ceil(res.totalItems / this.size);
      }
    })
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(SurveyCreateComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
      // data: { id: 1},
    });
  }
}
