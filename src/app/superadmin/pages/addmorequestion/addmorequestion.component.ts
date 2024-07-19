import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addmorequestion',
  templateUrl: './addmorequestion.component.html',
  styleUrl: './addmorequestion.component.css'
})
export class AddmorequestionComponent implements OnInit {

  curruntQuetionIds:any;

  constructor(private dialogRef: MatDialogRef<AddmorequestionComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    if (this.data && this.data.questionsAnswerResponseDtos) {
      this.curruntQuetionIds = this.data.questionsAnswerResponseDtos.map((q: any) => q.questionId);
    }
    this.getAllQuestions();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getAllQuestions(){
    
  }

}
