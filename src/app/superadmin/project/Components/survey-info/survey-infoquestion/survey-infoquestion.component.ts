import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SurveyresponsesComponent } from '../surveyresponses/surveyresponses.component';

@Component({
  selector: 'app-survey-infoquestion',
  templateUrl: './survey-infoquestion.component.html',
  styleUrl: './survey-infoquestion.component.css'
})
export class SurveyInfoquestionComponent implements OnInit {
  isLoading:boolean=false;
paramsId:any;
surveyDetailsData:any[]=[];
questionList:any[]=[]
resData:any;
  constructor(private service:ProjectService,private activatedRoute:ActivatedRoute,private location:Location,private dialog : MatDialog){}
   
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      const id=params['id']
      this.paramsId=id
      console.log(id);
      
    })
  this.isLoading=true
      this.service.getDetailSurveyList(this.paramsId).subscribe((res:any)=>{console.log(res);
this.isLoading=false
        console.log(res.data);
        this.resData=res.data
        this.surveyDetailsData=res.data.surveyWithDetailResponseDto?.dto
        console.log(this.surveyDetailsData);
        this.questionList=this.surveyDetailsData[0].questionsAnswer
      })
  }

  onViewResponses(){
     this.dialog.open(SurveyresponsesComponent, {
      width: '1250px',
      height: '600px',
      disableClose: true,
      data: {id: this.paramsId },
    });
  }

  goBack(){
    this.location.back();
  }

}
