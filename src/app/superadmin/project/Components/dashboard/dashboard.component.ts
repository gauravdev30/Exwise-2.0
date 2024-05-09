import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeIcon: string = 'add-circle-outline';
  data: any;
  attract: any = 20;
  onboard: any = 20;
  develop: any = 20;
  retain: any = 20;
  seperate: any = 20;
  detailInfo: any;
  subphase: any;
  stages:any;
  substageQuestions: any = [];
  constructor(private api: ProjectService, private tosatr: ToastrService,) { }

  ngOnInit(): void {
    this.api.getDetailSurveyList().subscribe((res: any) => {
      console.log(res);
      this.detailInfo = res.data
      console.log(this.detailInfo);
 

    })
  }
stage(id:any){
this.stages=id
console.log(id);
// this.subphase = this.stages.subphaseWithQuestionAnswerResponseDtos
// this.substageQuestions = this.subphase[0]
// this.substageQuestions.clicked = true
// console.log(this.subphase);
}

  substage(sub: any) {
    console.log(sub);
    this.subphase.forEach((val:any)=>  val.clicked = val.subphaseId==sub.subphaseId )
    this.substageQuestions = sub
  }
  change(iconName: string) {
    this.activeIcon = iconName;
  }
}
