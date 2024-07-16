import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyApiService } from '../../project/Components/survey/service/survey-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-survey-indetails',
  templateUrl: './survey-indetails.component.html',
  styleUrl: './survey-indetails.component.css'
})
export class SurveyIndetailsComponent  implements OnInit{
  stageList:any;
  detailInfo:any;
  id:any;
  status:any;
  isStatic:any;
  subphase: any;
  stages: any;
  activeIcon: string = 'add-circle-outline';
  substageQuestions: any = [];
  constructor(private dialog:MatDialog,private api:SurveyApiService,private tosatr:ToastrService,private activatedroute:ActivatedRoute,private location:Location){}
ngOnInit(): void {
    this.activatedroute.params.subscribe((param:any)=>{console.log(param);
      this.id=param['id']
      this.status=param['status']
      console.log(this.id,this.status);
      if(this.status=='dynamic'){
this.isStatic=false
      }else{
        this.isStatic=true;
      }
      this.getSurveyDetailsById()
      
    })
}
getSurveyDetailsById(){
  this.api.getSurveyDetailsById(this.id,this.isStatic).subscribe({next:(res)=>{
    this.detailInfo=res.data;
    console.log(this.detailInfo);
    this.detailInfo.dto[0].clicked = true;
    this.subphase = this.detailInfo.dto[0].subphaseWithQuestionAnswerResponseDtos;
    this.substage(this.subphase[0]);
    
  },error:(err)=>{console.log(err)},complete:()=>{}})
}

// stage(stageDetail: any) {
//   this.detailInfo.dto.forEach(
//     (val: any) => (val.clicked = val.stageId == stageDetail.stageId)
//   );
//   this.stages = stageDetail;
//   this.subphase = this.stages.subphaseWithQuestionAnswerResponseDtos;
// }

stage(stageDetail: any) {
  this.detailInfo.dto.forEach((val: any) => {
    val.clicked = val.stageId === stageDetail.stageId;
  });

  this.stages = stageDetail;

  this.subphase = this.stages.subphaseWithQuestionAnswerResponseDtos;
  if (this.subphase.length > 0) {
    this.substage(this.subphase[0]);
  } else {
    this.substageQuestions = [];
  }
}


substage(sub: any) {
  this.subphase.forEach(
    (val: any) => (val.clicked = val.subphaseId == sub.subphaseId)
  );
  this.substageQuestions = sub;
}
change(iconName: string) {
  this.activeIcon = iconName;
}

goBack(){
  this.location.back();
}
}
