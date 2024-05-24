import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-survey-infoquestion',
  templateUrl: './survey-infoquestion.component.html',
  styleUrl: './survey-infoquestion.component.css'
})
export class SurveyInfoquestionComponent implements OnInit {


  constructor(private service:ProjectService){}
   
  ngOnInit(): void {
      // this.service.getDetailSurveyList().subscribe((res:any)=>{console.log(res);
      // })
  }

}
