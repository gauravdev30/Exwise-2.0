import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../services/project.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BackgroundProcessService } from '../background-process.service';


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
  subsstageId: any;
  whyThisIsImportant: any;
  subphaseList: any;
  allFocusGroup: any;
  surveyAssignSpinner: boolean = false;
  allUser: any;
  // selectedStage: any;
  stageIsDefault: boolean = false;
  selectedSubphases:any [] =[];
  selectedStage:any [] = [];
  showWhomeToAssign:boolean=false;
  surveyName:any;

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private dialogRef: MatDialogRef<PhasetwoComponent>,
    @Inject(DIALOG_DATA) public data: { name: string; id: number },
    private router: Router,
    private route: ActivatedRoute,
    private service: ProjectService,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private backgroundProcessService: BackgroundProcessService
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  next() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAllSurvey();
    this.getAllFocuseGroupByClientID();
    this.getAllUsersByClientId();
    this.assignSurveyForm = this.fb.group({
      active: [''],
      clientEmployeesWithSurveys: [[], Validators.required],
      clientId: [''],
      end_date: [''],
      id: [''],
      instruction: [''],
      loggedUserId: [''],
      phaseId: [''],
      stageId: [null],
      startDate: [''],
      status: [''],
      subPhaseId: [[]],
      surveyId: ['', Validators.required],
      whyThisIsImportant: [''],
      isStaticSurvey: [''],
      selectedOption: ['', Validators.required],
    });


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }
  getAllSurveyByClientId() {
    this.service.getAllSurveyByClientID(sessionStorage.getItem("ClientId"), 'desc', 1 - 1, 10, 'id').subscribe({
      next: (res) => {
      }, error: (err) => {
        console.log(err)
      }, complete: () => { }
    })
  }

  getSurveySategByID() {
    console.log(this.isStatic);

    this.service
      .getSurveySategByID(this.surveyId, this.isStatic)
      .subscribe((res: any) => {
        console.log(res);
        this.surveyName = res?.data?.surveyName;
        console.log(this.surveyName);
        this.stageList = res?.data?.dto?.map((stage:any) => ({
          id: stage?.stageId,
          name: stage?.stageName
        }));;
        console.log(this.stageList);
      });
  }
  getSubphaseByID() {
    console.log(this.isStatic);
    this.service
      .getSatebysubphasegByID(this.stageId, this.isStatic)

      .subscribe((res: any) => {
        console.log(res);
        // this.subphaseList = res.data;
        this.subphaseList = res.data.map((subphase:any) => ({
          id: subphase.subphaseId,
          name: subphase.subPhaseName
        }));
        
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

  //   getsurveyId(event:any){
  // console.log(event.target.value);

  //   }

  getsurveyId(event: any) {
    this.surveyId = event.target.value;
    this.stageList=[];
    this.subphaseList=[];
    this.showWhomeToAssign=true;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const tableName = selectedOption.getAttribute('data-table-name');
    console.log(this.surveyId, tableName);

    const selectedSurvey = this.surveyList.data.find((item: any) => item.id == this.surveyId);
    console.log(selectedSurvey);

    const stage = selectedSurvey.stages[0];
    this.showstages = false;
    this.selectedStage = [];


    // if (stage.stageName === 'default') {
    //   this.selectedStage = stage.id;
    //   console.log(this.selectedStage)
    //   this.getStageId({ target: { value: this.selectedStage } });
    // }

    if (tableName === 'static_survey') {
      this.isStatic = true;
    } else if (tableName === 'dynamic_survey') {
      this.isStatic = false;
    }
    this.assignSurveyForm.patchValue({
      surveyId: this.surveyId,
      isStaticSurvey: this.isStatic
    });
    // if (selectedSurvey?.tableName === 'static_survey') {
    //   this.isStatic = true;
    // } else if (selectedSurvey?.tableName === 'dynamic_survey') {
    //   this.isStatic = false;
    // }
    this.showstages = true;
    this.getSurveySategByID();

  }

  getStageId(event: any) {
    this.stageId = event.target.value;
    this.subphaseList=[]
    this.showSubphase = true;
    if(this.stageList.dto[0].stageName!=='default'){
    this.assignSurveyForm.patchValue({
      stageId: this.stageId
    });
  }
    this.getSubphaseByID()
  }


  getSubStageId(event: any) {
    this.subsstageId = event.target.value;
    this.assignSurveyForm.patchValue({
      subPhaseId: this.subsstageId
    });
    this.showSubphase = true;
  }

  AssignSuvreyTOclient() {
    const selectedStages = this.selectedStage?.map((stage:any) => stage.id);
    const selectedSubphaseIds = this.selectedSubphases?.map((subphase: any) => subphase.id)
    const obj = {
      active: true,
      clientEmployeesWithSurveys: this.assignSurveyForm?.value?.clientEmployeesWithSurveys,
      clientId: sessionStorage.getItem('ClientId'),
      end_date: '',
      id: 0,
      instruction: '',
      loggedUserId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
      phaseId: JSON.parse(sessionStorage.getItem('ClientData')!).phaseid,
      stageId: selectedStages,
      startDate: new Date(),
      status: 'Active',
      subPhaseId: selectedSubphaseIds,
      surveyId: this.surveyId,
      whyThisIsImportant: this.whyThisIsImportant,
      isStaticSurvey: this.isStatic,
    };
    console.log(obj);
    if (this.assignSurveyForm.valid) {
      this.surveyAssignSpinner = true;
      this.backgroundProcessService.showBackgroundMessage();
      this.dialogRef.close();
      this.service.surveyAssignToClient(obj).subscribe((res: any) => {
        console.log(res);
        this.surveyAssignSpinner = false;
        if (res?.errors && res?.errors?.length > 0) {
          res.errors.forEach((error: string) => {
            this.tostr.error(error);
            this.backgroundProcessService.hideBackgroundMessage();
            this.surveyAssignSpinner = false;
          });
        } else if (res.message == 'Survey assignments processed successfully.') {
          this.tostr.success('Survey assignment created successfully');
          this.backgroundProcessService.hideBackgroundMessage();
        }
      });
    }
    else {
      this.tostr.error('please enter valid data');
      this.assignSurveyForm.markAllAsTouched();
    }
  }

  getAllFocuseGroupByClientID() {
    this.service.getAllFocusGroupByClientId(sessionStorage.getItem("ClientId")).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allFocusGroup = res.data;
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }
    });
  }


  getAllUsersByClientId() {
    this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUser = res.data;
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }

    });
  }

  onOptionChange(event: any): void {
    const selectedOption = event.target.value;
    this.assignSurveyForm.patchValue({ selectedOption });
    const clientEmployeesControl = this.assignSurveyForm.get('clientEmployeesWithSurveys');
    clientEmployeesControl?.setValue([]);
    if (selectedOption === 'all') {
      this.assignSurveyForm.patchValue({ clientEmployeesWithSurveys: [] });
      this.assignSurveyForm.get('clientEmployeesWithSurveys')!.clearValidators();
    } else {
      this.assignSurveyForm.get('clientEmployeesWithSurveys')!.setValidators(Validators.required);
    }
    this.assignSurveyForm.get('clientEmployeesWithSurveys')!.updateValueAndValidity();
  }

  onEmployeeChange(event: any): void {
    const selectedEmployee = parseInt(event.target.value, 10);
    this.assignSurveyForm.patchValue({
      clientEmployeesWithSurveys: [selectedEmployee],
    });
  }

  onFocuseGroupChange(event: any): void {
    const selectedFocuseGroupId = parseInt(event.target.value, 10);
    const selectedFocuseGroup = this.allFocusGroup.find(
      (group: any) => group.focusGroup.id === selectedFocuseGroupId
    );
    if (selectedFocuseGroup) {
      const memberIds = selectedFocuseGroup.listOfMember.map((member: any) => member.userId);
      this.assignSurveyForm.patchValue({
        clientEmployeesWithSurveys: memberIds,
      });
    }
  }

  onSubphaseSelect(item: any) {
   console.log(item)
  }
  
  onSelectAllSubphases(items: any) {
    console.log(items)
  }

  onStageSelect(items : any){
    if (this.selectedStage.length === 1) {
    console.log(items);
    this.stageId = items.id;
    this.subphaseList=[]
    this.showSubphase = true;
    if(this.stageList[0]?.name!=='default'){
    this.assignSurveyForm.patchValue({
      stageId: this.stageId
    });
  }
    this.getSubphaseByID()
}else {
  this.showSubphase = false;
  this.subphaseList = [];
}
  }

  onSelectAllStages(items: any) {
    if (items?.length === 1) {
      const selectedStage = items[0];
      this.stageId = selectedStage.id;
      this.subphaseList = [];
      this.showSubphase = true;
  
      if (this.stageList[0]?.name !== 'default') {
        this.assignSurveyForm.patchValue({
          stageId: this.stageId
        });
      }
      this.getSubphaseByID();
    } else {
      this.showSubphase = false;
      this.subphaseList = [];
    }
  }

  onStageDselect(items:any){
    this.showSubphase = false;
    this.subphaseList = [];
  }

  onDselectAllStages(items:any){
    this.showSubphase = false;
    this.subphaseList = [];
  }
  
  
}
