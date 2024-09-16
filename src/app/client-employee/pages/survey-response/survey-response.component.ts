import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrl: './survey-response.component.css',

})
export class SurveyResponseComponent implements OnInit {
  questionnaireForm!: FormGroup;
  filterdQuestions!: FormGroup;
  filter: any;
  surveyAssignmentId: any;
  rankquestion: any[] = [];
  data: any;
  totalQuestions: number = 0;
  attemptedQuestions: number = 0;
  unattemptedQuestions: number = 0;
  selectedEmojiIndex: any;
  questionForm!: FormGroup;
  instructions = [
    'First instruction here.',
    'Second instruction here.',
    'Third instruction here.',
  ];
  public items: any[] = [
    {
      color: 'green',
    },
    {
      color: 'blue',
    },
    {
      color: 'grey',
    },
    {
      color: 'red',
    },
    {
      color: 'black',
    },
  ];

  numbers: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
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
    private location: Location
  ) {
    this.questionnaireForm = this.fb.group({ questions: this.fb.array([]) });
    this.filterdQuestions = this.fb.group({ questions: this.fb.array([]) })
  }
  // ngOnInit(): void {
  //   this.surveyAssignmentId = +this.route.snapshot.paramMap.get('id')!;

  //   // Fetch survey details by surveyAssignmentId
  //   this.api.getSurveyBysurveyAssignmentId(this.surveyAssignmentId).subscribe({
  //     next: (res) => {
  //       this.data = res.data;
  //       console.log(this.data);

  //       const surveyQuestions =
  //         this.data.surveyWithDetailResponseDto.dto[0]
  //           .subphaseWithQuestionAnswerResponseDtos[0]
  //           .questionsAnswerResponseDtos;

  //       this.totalQuestions = surveyQuestions.length;

  //       // Filter MCQ and Importance questions
  //       const mcqQuestions = surveyQuestions.filter((question: any) => question.questionType === 'mcq');
  //       const importanceQuestions = surveyQuestions.filter((question: any) => question.questionType === 'Importance');

  //       console.log(mcqQuestions);
  //       console.log(importanceQuestions);

  //       // Initialize form structure
  //       this.questionForm = this.fb.group({
  //         mcqQuestions: this.fb.array([]),
  //         importanceQuestions: this.fb.array([]),
  //         descriptiveQuestions: this.fb.array([]), // For descriptive type
  //       });

  //       // Create FormArray for MCQ questions
  //       mcqQuestions.forEach((question: any) => {
  //         const mcqGroup = this.fb.group({
  //           questionId: [question.questionId],
  //           question: [question.question],
  //           answer: [null, Validators.required], // Stores the selected answer
  //           options: this.fb.array(question.options) // Store options as a FormArray
  //         });
  //         this.getMcqFormArray().push(mcqGroup);
  //       });

  //       // Create FormArray for Importance questions
  //       importanceQuestions.forEach((question: any) => {
  //         const importanceGroup = this.fb.group({
  //           questionId: [question.questionId],
  //           question: [question.question],
  //           importanceLevel: [null, Validators.required], // Stores selected importance level
  //         });
  //         this.getImportanceFormArray().push(importanceGroup);
  //       });

  //       // Create FormArray for Descriptive questions (if needed)
  //       surveyQuestions
  //         .filter((question: any) => question.questionType === 'descriptive')
  //         .forEach((question: any) => {
  //           const descriptiveGroup = this.fb.group({
  //             questionId: [question.questionId],
  //             question: [question.question],
  //             ansForDescriptive: new FormControl(null), // Stores the descriptive answer
  //           });
  //           this.getDescriptiveFormArray().push(descriptiveGroup);
  //         });

  //       // Update the question counts if needed
  //       this.updateQuestionCounts();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {},
  //   });
  // }

  // getMcqFormArray(): FormArray {
  //   return this.questionForm.get('mcqQuestions') as FormArray;
  // }

  // getImportanceFormArray(): FormArray {
  //   return this.questionForm.get('importanceQuestions') as FormArray;
  // }

  // getDescriptiveFormArray(): FormArray {
  //   return this.questionForm.get('descriptiveQuestions') as FormArray;
  // }

  //   ngOnInit(): void {
  //     this.surveyAssignmentId = +this.route.snapshot.paramMap.get('id')!;
  //     this.api.getSurveyBysurveyAssignmentId(this.surveyAssignmentId).subscribe({
  //       next: (res) => {
  //         this.data = res.data;
  //         console.log(this.data);

  //         const surveyQuestions =
  //           this.data.surveyWithDetailResponseDto.dto[0]
  //             .subphaseWithQuestionAnswerResponseDtos[0]
  //             .questionsAnswerResponseDtos;
  //         this.totalQuestions = surveyQuestions.length;
  //         surveyQuestions.forEach((question: any) => {
  //           const questionGroup = this.fb.group({
  //             question: question,
  //             ansForDescriptive: new FormControl(null),
  //             answer: new FormControl(null),
  //             surveyQuestionId: question.questionId,
  //           });
  //           console.log(surveyQuestions);
  //           const mcqQuestions = surveyQuestions.filter((question:any) => question.questionType === 'mcq');
  //           const importanceQuestions = surveyQuestions.filter((question:any) => question.questionType === 'Importance');

  // console.log(mcqQuestions);
  // console.log(importanceQuestions);

  // this.questionForm = this.fb.group({
  //   mcqQuestions: this.fb.array(this.createMcqQuestions())
  // });


  //           this.getSurveyDetailsFormArray().push(questionGroup);

  //           questionGroup.valueChanges.subscribe(() => {
  //             this.updateQuestionCounts();
  //           });
  //         });

  //         this.updateQuestionCounts();
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //       complete: () => {},
  //     });
  //   }


  //   createMcqQuestions(): FormGroup[] {
  //     return this.mcqQuestions.map((question:any) => {
  //       return this.fb.group({
  //         questionId: [question.questionId],
  //         question: [question.question],
  //         answer: [null, Validators.required], // Will store the selected answer
  //         options: this.fb.array(question.options) // Store options as a FormArray if needed
  //       });
  //     });
  //   }


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
          this.getSurveyDetailsFormArray().push(
            this.fb.group({
              question: question,
              ansForDescriptive: new FormControl(null),
              answer: new FormControl(null),
              surveyQuestionId: question.questionAnswerId,
            })
          );
          if (question.questionType === 'Importance') {
            this.rankquestion.push(question);
          }
        });
        this.updateQuestionCounts();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
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
  mcqtype: any;

  // getSurveyDetailsFormArray() {
  //   console.log('executed');
  //   this.rankquestion = []
  //   const allQuestions = this.questionnaireForm.get('questions') as FormArray;
  //   allQuestions.controls.forEach((control: AbstractControl<any, any>) => {
  //     const questionType = control.value?.question?.questionType;
  //   });
  //   console.log(allQuestions);

  //   return this.questionnaireForm.get('questions') as FormArray;
  // }

  getSurveyDetailsFormArray() {
    console.log('executed');

    // Get the current FormArray (list of questions)
    const allQuestions = this.questionnaireForm.get('questions') as FormArray;
    const allQuestionsForImportance = this.filterdQuestions.get('questions') as FormArray;

    // const rankquestion = allQuestionsForImportance.controls.filter(
    //   (control: AbstractControl<any>) => control.value?.question?.questionType === 'Importance'
    // );
    console.log(this.rankquestion);

    const filteredQuestions = allQuestions.controls.filter(
      (control: AbstractControl<any>) => control.value?.question?.questionType !== 'Importance'
    );


    // Clear the existing FormArray
    while (allQuestions.length !== 0) {
      allQuestions.removeAt(0);
    }

    // Add the filtered questions back to the FormArray
    filteredQuestions.forEach((control: AbstractControl<any>) => {
      allQuestions.push(control);
    });

    console.log(allQuestions);
    return allQuestions;
  }



  submitSurvey() {
    console.log(this.data);
    const importanceLevels = [
      'Most important',
      'Important',
      'Slightly important',
      'Least important'
    ];

    const rankQuestionsWithImportance = this.rankquestion.map((question, index) => ({
      ansForDescriptive:question.ansForDescriptive,
      surveyQuestionId: question.questionAnswerId,
      answer: importanceLevels[index],
    }));

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

    const employeeAns = [...this.getSurveyDetailsFormArray().value.map(
      (val: any) => ({
        ansForDescriptive: val.ansForDescriptive,
        answer: val.answer,
        surveyQuestionId: val.surveyQuestionId,
      })),
      ...rankQuestionsWithImportance
    ]

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

  selectEmojiSCore(score: number, index: number, emojiIndex: number) {
    const control = this.getSurveyDetailsFormArray().at(index).get('answer');
    if (control) {
      control.setValue(score);
      this.selectedEmojiIndex = emojiIndex;
    }
  }

  goBack() {

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



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rankquestion, event.previousIndex, event.currentIndex);
  }
}
