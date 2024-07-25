import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-question-to-survey',
  templateUrl: './assign-question-to-survey.component.html',
  styleUrls: ['./assign-question-to-survey.component.css'],
})
export class AssignQuestionToSurveyComponent implements OnInit {
  result: any;

  qas = [
    { question: 'Question 1', answer: 'Answer to question 1' },
    { question: 'Question 2', answer: 'Answer to question 2' },
    { question: 'Question 3', answer: 'Answer to question 3' }
  ];

  // basket  = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // items  = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  questions: any[] = [];
  isCollapsed: boolean[] = [];
  isDraggedCollapsed: boolean[] = [];
  dragedQuestion: any[] = [];
  getstageId: any;
  getSubphase: any;
  surveyName : any;
  surveyId : any;


  constructor(private api: ApiService, private route: ActivatedRoute, private tostr: ToastrService, private router: Router) {
    // this.qas.forEach(() => {
    //   this.isCollapsed.push(true);
    //   this.isDraggedCollapsed.push(true);
    // });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.getstageId = params['stage'];
      this.getSubphase = params['subPhase']
      this.surveyName = params['surveyName']
      this.surveyId = params['surveyId']
      console.log(this.getstageId);
      console.log(this.getSubphase);
    });
    this.api.getAllQuestionsWIthOptions().subscribe((res: any) => {
      if (res.success) {
        this.questions = res.data;
        console.log(this.questions);
      }
    })
  }

  makeCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  makeDraggedCollapse(index: number) {
    this.isDraggedCollapsed[index] = !this.isDraggedCollapsed[index];
  }


  drop(event: CdkDragDrop<string[]>) {
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
    this.result = this.dragedQuestion.map((data: any) => data.questionId)
    console.log(this.result);


  }
  // drop(event:CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,

  //     );
  //   }
  //   console.log(this.dragedQuestion);
  //  this.result = this.dragedQuestion.map(function(a:any) {return a.id;});
  //   console.log(this.result);

  // }

  onSubmit() {
    const obj = {
      createdDate: new Date(),
      description: "string",
      loggedUserId: 0,
      stageId: this.getstageId,
      subPhaseName: this.getSubphase,
      surveyQuestionId: this.result
    }
    console.log(obj);
    this.api.assignQuestiontoSurvey(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === "SubPhase created successfully.") {
          this.tostr.success("Questions Assign to survey successfully.");
          this.router.navigate(['superadmin/sup-survey'])
        }
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }
    })
  }
}
