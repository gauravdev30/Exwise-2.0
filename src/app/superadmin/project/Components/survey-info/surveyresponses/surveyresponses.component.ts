import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-surveyresponses',
  templateUrl: './surveyresponses.component.html',
  styleUrl: './surveyresponses.component.css'
})
export class SurveyresponsesComponent implements OnInit {

  surveyResponses:any;
  surveyassignmentId:any

  constructor(private dialogRef: MatDialogRef<SurveyresponsesComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private api : ProjectService){}

  ngOnInit(): void {
    if(this.data){
      this.surveyassignmentId=this.data.id
    }

  this.api.getAllSurveyResponseDetailsByAssignmentId(this.surveyassignmentId).subscribe({next:(res)=>{
    this.surveyResponses=res.data;
  },error:(err)=>{console.log(err)},complete:()=>{}})

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
