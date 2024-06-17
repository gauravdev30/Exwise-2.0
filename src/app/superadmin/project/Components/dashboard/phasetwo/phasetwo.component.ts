import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../services/project.service';
@Component({
  selector: 'app-phasetwo',
  templateUrl: './phasetwo.component.html',
  styleUrl: './phasetwo.component.css',
})
export class PhasetwoComponent {
  items: any;
  surveyList: any;
  stageList: any;
  assignSurveyForm!: FormGroup;
  surveyId: any;
  showstages: boolean = false;
  stageId: any;
  whyThisIsImportant:any;
  constructor(
    private dialogRef: MatDialogRef<PhasetwoComponent>,
    @Inject(DIALOG_DATA) public data: { name: string; id: number },
    private router: Router,
    private route: ActivatedRoute,
    private service: ProjectService,
    private fb: FormBuilder,
    private tostr: ToastrService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  next() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAllSurvey();
    this.assignSurveyForm = this.fb.group({
      clientId: ['', Validators.required],
      surveyId: ['', Validators.required],
      id: [''],
      phaseId: [''],
      loggedUserId: [''],
    });
    // this.service.getSurveyByID(this.data.id).subscribe({
    //   next: (res: any) => {
    //     this.items = res.data;
    //     console.log(res);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {},
    // });
  }

  getSurveySategByID() {
    this.service.getSurveySategByID(this.surveyId).subscribe((res: any) => {
      console.log(res);
      this.stageList = res.data;
      console.log(this.stageList);
    });
  }

  getAllSurvey() {
    this.service.getAllSurvey().subscribe((res) => {
      if (res.success) {
        this.surveyList = res.data;
        console.log(this.surveyList);
      } else {
        console.log(res.message);
      }
    });
  }

  getsurveyId(event: any) {
    this.surveyId = event.target.value;
    console.log(this.surveyId);
    this.showstages = true;
    this.getSurveySategByID();
    // this.assignSurveyForm.get('surveyId')?.setValue(this.surveyId);
  }

  getStageId(event: any) {
    this.stageId = event.target.value;
  }

  AssignSuvreyTOclient(){
    const obj={
      active: true,
      clientEmployeesWithSurveys: [
        0
      ],
      clientId: sessionStorage.getItem("ClientId"),
      end_date: '',
      // id: 0,
      instruction: "",
      loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      phaseId: JSON.parse(sessionStorage.getItem("ClientData")!).phaseid,
      stageId: this.stageId,
      startDate: new Date(),
      status: "",
      surveyId: this.surveyId,
      whyThisIsImportant: this.whyThisIsImportant
    }
    console.log(obj);
    // this.service.surveyAssignToClient(obj).subscribe((res:any)=>{console.log(res);
    //   if(res.message=="Survey already assigned to client."){
    //     this.tostr.error(res.message);
    //     this.dialogRef.close();
    //   }
    //   else if(res.message=="Survey assignment created successfully."){
    //     this.tostr.success(res.message);
    //     this.dialogRef.close();
    //   }
      
    // })
  }

  

  // assignSurvey() {
    
  //   const obj = this.assignSurveyForm.value;
  //   if (obj.surveyId) {
  //     obj.clientId = this.data.id;
  //     obj.id = 1;
  //     obj.phaseId = 1;
  //     obj.loggedUserId = 1;
  //     this.service.assignSurveyToClient(obj).subscribe((res) => {
  //       if (res.success) {
  //         this.tostr.success(res.message);
  //         this.onClose();
  //       } else {
  //         this.tostr.error(res.message);
  //       }
  //     });
  //   } else {
  //     this.tostr.error('Please select a survey.');
  //   }
  // }
}
