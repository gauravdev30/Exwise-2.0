import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-surveyresponses',
  templateUrl: './surveyresponses.component.html',
  styleUrl: './surveyresponses.component.css'
})
export class SurveyresponsesComponent implements OnInit {

  @Input() surveyResponses: any[] = [];
  surveyassignmentId:any;
  isLoading:boolean = false;

  constructor(private dialogRef: MatDialogRef<SurveyresponsesComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private api : ProjectService){}

  ngOnInit(): void {
    if(this.data){
      this.surveyassignmentId=this.data.id
    }
this.isLoading = true;
  this.api.getAllSurveyResponseDetailsByAssignmentId(this.surveyassignmentId).subscribe({next:(res)=>{
    this.surveyResponses=res.data;
    this.isLoading = false;
  },error:(err)=>{console.log(err); this.isLoading = false},complete:()=>{}})

  }

  getOptions(item: any): string[] {
    return Object.keys(item.optionsWiseCount);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}