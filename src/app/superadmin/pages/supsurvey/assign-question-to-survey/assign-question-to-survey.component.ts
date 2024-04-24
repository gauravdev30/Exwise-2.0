import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assign-question-to-survey',
  templateUrl: './assign-question-to-survey.component.html',
  styleUrls: ['./assign-question-to-survey.component.css'],
})
export class AssignQuestionToSurveyComponent implements OnInit {
  qas = [
    { question: 'Question 1', answer: 'Answer to question 1' },
    { question: 'Question 2', answer: 'Answer to question 2' },
    { question: 'Question 3', answer: 'Answer to question 3' }
  ];

  questions:any;
  isCollapsed: boolean[] = [];
  dragedQuestion: any[] = [];


  constructor(private api:ApiService,private route: ActivatedRoute) {
    this.qas.forEach(() => {
      this.isCollapsed.push(true);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });
    this.api.getAllQuestions().subscribe((res:any)=>{
      if(res.success){
        this.questions=res.data;
        console.log(this.questions);
      }
    })
  }

  makeCollapse(index: number) {
      this.isCollapsed[index] = !this.isCollapsed[index];
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.dragedQuestion);
  }

  onSubmit(){
    // const questionIds = this.assignmentForm.value.assignedQuestions.map((question: any) => question.id);
    // console.log(questionIds)
    console.log(this.dragedQuestion);
  }
}
