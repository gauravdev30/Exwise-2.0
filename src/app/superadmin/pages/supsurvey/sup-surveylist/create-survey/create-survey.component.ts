import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyApiService } from '../../../../project/Components/survey/service/survey-api.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent implements OnInit{
  step = 1;
  // stages: any[] = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
  selectedStage: any;
  selecetdSubPhase:any;
  subphaseList:any;
  stagesList:any;
  stageSelection: boolean = true;
  subphaseSelection: boolean = true;

  constructor(private dialogRef: MatDialogRef<CreateSurveyComponent>,private api:SurveyApiService,private router:Router,private route: ActivatedRoute){}


  ngOnInit(): void {
    this.api.getAllStagesList().subscribe((res)=>{
      if(res.success){
        this.stagesList=res.data;
      }
    });
  }

  getAllSubphases(){
    this.api.getAllSubPhasesList().subscribe((res)=>{
      if(res.success){
        this.subphaseList=res.data;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // change(number:any){
  //   this.step=number;
  // }

  next(){
    this.dialogRef.close();
    this.router.navigate(['superadmin/assign-question-to-survey']);
  }

  onStageChange(event:any) {
    this.selectedStage = event.target.value;
    this.stageSelection=false;
    this.getAllSubphases();
  }

  onSubPhaseChange(event:any){
    this.selecetdSubPhase = event.target.value;
    this.subphaseSelection=false;
  }
}
