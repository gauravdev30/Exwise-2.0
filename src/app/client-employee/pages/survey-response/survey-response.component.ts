import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrl: './survey-response.component.css',
})
export class SurveyResponseComponent implements OnInit {
  questionnaireForm!: FormGroup;
  surveyAssignmentId: any;
  data: any;
  totalQuestions: number = 0;
  attemptedQuestions: number = 0;
  unattemptedQuestions: number = 0;
  instructions = [
    'First instruction here.',
    'Second instruction here.',
    'Third instruction here.',
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
    private router: Router
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

  // ngOnInit(): void {
  //   this.surveyAssignmentId = +this.route.snapshot.paramMap.get('id')!;
  //   this.api.getSurveyBysurveyAssignmentId(this.surveyAssignmentId).subscribe({
  //     next: (res) => {
  //       this.data = res.data;
  //       console.log(this.data);

  //       const surveyQuestions =
  //         this.data.surveyWithDetailResponseDto.dto[0]
  //           .subphaseWithQuestionAnswerResponseDtos[0]
  //           .questionsAnswerResponseDtos;
  //           this.totalQuestions = surveyQuestions.length;
  //       surveyQuestions.forEach((question: any) => {
  //         this.getSurveyDetailsFormArray().push(
  //           this.fb.group({
  //             question: question,
  //             ansForDescriptive: new FormControl(null),
  //             answer: new FormControl(null),
  //             surveyQuestionId: question.questionAnswerId,
  //           })
  //         );
  //       });
  //       this.updateQuestionCounts();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {},
  //   });
  // }

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
}
