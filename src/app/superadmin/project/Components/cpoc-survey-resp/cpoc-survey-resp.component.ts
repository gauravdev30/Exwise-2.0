import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../client-employee/service/employee.service';
import { GenericDialogComponent } from '../../../../client-employee/pages/generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cpoc-survey-resp',
  templateUrl: './cpoc-survey-resp.component.html',
  styleUrl: './cpoc-survey-resp.component.css'
})
export class CpocSurveyRespComponent {
  questionnaireForm!: FormGroup;
  surveyAssignmentId: any;
  data: any;
  totalQuestions: number = 0;
  attemptedQuestions: number = 0;
  unattemptedQuestions: number = 0;
  selectedEmojiIndex: any;
  instructions = [
    'First instruction here.',
    'Second instruction here.',
    'Third instruction here.',
  ];

  numbers: number[] = [
    1,2,3,4,5,6,7,8,9,10
  ];

  exitSurveyList: string[] = [
    'Career change',
    'Compensation',
    'Further education',
    'Growth opportunities',
    'Health',
    'Interpersonal conflict',
    'Job Satisfaction',
    'Organisation purpose',
    'Personal/Family',
    'Promotion',
    'Relocation',
    'Work environment',
    'Work life balance',
    'Other'
  ];


  constructor(
    private route: ActivatedRoute,
    private api: EmployeeService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private tosatr: ToastrService,
    private router: Router,
    private location:Location
  ) {
    this.questionnaireForm = this.fb.group({ questions: this.fb.array([]) });
  }
  ngOnInit(): void {
    this.surveyAssignmentId = +this.route.snapshot.paramMap.get('id')!;
    this.api.getSurveyBysurveyAssignmentId(this.surveyAssignmentId).subscribe({
      next: (res) => {
        this.data = res.data;
        console.log(this.data);

        const surveyQuestions =
          this.data.surveyWithDetailResponseDto.dto[0]
            .subphaseWithQuestionAnswerResponseDtos[0]
            .questionsAnswerResponseDtos;
        this.totalQuestions = surveyQuestions.length;
        surveyQuestions.forEach((question: any) => {
          const questionGroup = this.fb.group({
            question: question,
            ansForDescriptive: new FormControl(null),
            answer: new FormControl(null),
            surveyQuestionId: question.questionId,
          });

          this.getSurveyDetailsFormArray().push(questionGroup);

          questionGroup.valueChanges.subscribe(() => {
            this.updateQuestionCounts();
          });
        });

        this.updateQuestionCounts();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  updateQuestionCounts() {
    const controls = this.getSurveyDetailsFormArray().controls as FormGroup[];
    this.attemptedQuestions = controls.filter((questionGroup: FormGroup) => {
      const question = questionGroup.value.question;
      if (question.questionType === 'descriptive' && questionGroup.value.ansForDescriptive) {
        return true;
      }
      if ((question.questionType === 'mcq' || question.questionType === 'reasonForEXIT') && questionGroup.value.answer) {
        return true;
      }
      if (question.questionType === 'eNPS' && questionGroup.value.answer !== null) {
        return true;
      }
      return false;
    }).length;
    this.unattemptedQuestions = this.totalQuestions - this.attemptedQuestions;
  }

  getSurveyDetailsFormArray() {
    return this.questionnaireForm.get('questions') as FormArray;
  }

  submitSurvey() {
    console.log(this.data);
    const unansweredQuestions = (this.getSurveyDetailsFormArray().controls as FormGroup[]).filter(
      (questionGroup: FormGroup) => {
        const question = questionGroup.value.question;
        if (question.questionType === 'descriptive' && !questionGroup.value.ansForDescriptive) {
          return true;
        }
        if ((question.questionType === 'mcq' || question.questionType === 'reasonForEXIT') && !questionGroup.value.answer) {
          return true;
        }
        return false;
      }
    );

    if (unansweredQuestions.length > 0) {
      this.tosatr.error('Please answer all the questions before submitting the survey.');
      return;
    }

    const employeeAns = this.getSurveyDetailsFormArray().value.map(
      (val: any) => ({
        ansForDescriptive: val.ansForDescriptive,
        answer: val.answer,
        surveyQuestionId: val.surveyQuestionId,
      }),
    );

    console.log(employeeAns);

    const responseObject = {
      clientEmployeeId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
      clientId: this.data.assignmentToCLient.clientId,
      completion_date: new Date(),
      employeeAns: employeeAns,
      surveyAssignmentId: this.surveyAssignmentId,
      survey_assigned_date: this.data.assignmentToCLient.startDate,
      timeToComplete: 'string',
    };

    console.log(responseObject);

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        message: `Do you really want to submit the survey?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.api
          .submitEmployeeResponse(responseObject)
          .subscribe((res: any) => {
            if (res.success) {
              this.tosatr.success(res.message);
              this.router.navigate(['/clientEmployee/dashboard']);
            }
          });
      }
    });
  }

  selectEmojiSCore(score: number,index: number, emojiIndex: number) {
    const control = this.getSurveyDetailsFormArray().at(index).get('answer');
    if (control) {
      control.setValue(score);
      this.selectedEmojiIndex = emojiIndex;
    }
  }

  goBack(){

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        message: `Do you really want to cancel the survey?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.location.back();
      }
    });
  }

}