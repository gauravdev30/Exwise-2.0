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
  showSubphase: boolean = false;
  stageId: any;
  isStatic: boolean = true;
  subsstageId:any;
  whyThisIsImportant: any;
  subphaseList:any;
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
      isStaticSurvey: [''],
    });

  }
  getAllSurveyByClientId(){
    this.service.getAllSurveyByClientID(sessionStorage.getItem("ClientId"),'desc', 1- 1, 10, 'id').subscribe({next:(res)=>{
    },error:(err)=>{console.log(err)
    },complete:()=>{}})
  }

  getSurveySategByID() {
    this.service
      .getSurveySategByID(this.surveyId, this.isStatic)
      .subscribe((res: any) => {
        console.log(res);
        this.stageList = res.data;
        console.log(this.stageList);
      });
  }
  getSubphaseByID() {
    this.service
      .getSatebysubphasegByID(this.stageId, this.isStatic)
      .subscribe((res: any) => {
        console.log(res);
        this.subphaseList = res.data;
        console.log(this.subphaseList);
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
    const selectedSurvey = this.surveyList.data.find(
      (item: any) => item.id == this.surveyId
    );
    if (selectedSurvey?.tableName === 'static_survey') {
      this.isStatic = true;
    } else if (selectedSurvey?.tableName === 'dynamic_survey') {
      this.isStatic = false;
    }
    this.showstages = true;
    this.getSurveySategByID();
  }

  getStageId(event: any) {
    this.stageId = event.target.value;
    this.showSubphase = true;
    this.getSubphaseByID()
  }
  getSubStageId(event:any){
    this.subsstageId = event.target.value;
    this.showSubphase = true;
  }

  AssignSuvreyTOclient() {
    const obj = {
      active: true,
      clientEmployeesWithSurveys: [0],
      clientId: sessionStorage.getItem('ClientId'),
      end_date: '',
      id: 0,
      instruction: '',
      loggedUserId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
      phaseId: JSON.parse(sessionStorage.getItem('ClientData')!).phaseid,
      stageId: this.stageId,
      startDate: new Date(),
      status: 'Active',
      subPhaseId:this.subsstageId,
      surveyId: this.surveyId,
      whyThisIsImportant: this.whyThisIsImportant,
      isStaticSurvey: this.isStatic,
    };
    console.log(obj);
    this.service.surveyAssignToClient(obj).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Survey already assigned to client.') {
        this.tostr.error("This employee experience phase is already assign to the client");
        this.dialogRef.close();
      } else if (res.message == 'Survey assignment created successfully.') {
        this.tostr.success(res.message);
        this.dialogRef.close();
      }
    });
  }


}
