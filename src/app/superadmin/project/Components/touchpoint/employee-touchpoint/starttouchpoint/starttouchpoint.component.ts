import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TouchpointService } from '../../../../../services/touchpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DeleteComponent } from '../../../../../pages/delete/delete.component';
@Component({
  selector: 'app-starttouchpoint',
  templateUrl: './starttouchpoint.component.html',
  styleUrl: './starttouchpoint.component.css'
})
export class StarttouchpointComponent implements OnInit {
  internalOwners: string[] = [
    'External Communications', 'Facilities Management', 'HR Shared Services', 'HR', 'Internal Communications', 'IT',
    'Learning & Development', 'Line Manager', 'Onboarding Team', 'Operations', 'Other', 'Recruitment Team', 'Security'
  ];
  formResponses: any = {};
  realityQuality: any;
  extouchpoints: any;
  reality!: FormGroup;
  touchpoint!: FormGroup;
  starttouchpointId: any;
  touchPoints: any;
  realityComponent: any;
  feedbackText: string = '';
  selectedRating: any;
  stageId: any;
  constructor(
    private api: TouchpointService, private route: ActivatedRoute, private _formBuilder: FormBuilder,
    private router: Router, private location: Location, private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.starttouchpointId = params.get('id');
      this.stageId = params.get('stageId');
    });

    this.reality = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.touchpoint = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.api.getAssignFormById(this.starttouchpointId).subscribe((res: any) => {
      this.realityComponent = res.data.realityComponent;
      this.touchPoints = res.data.touchPoints;

      this.formResponses = {};

  // Iterate over the touchPoints array
  res.data.touchPoints.forEach((touchPointData: any, index: number) => {
    const touchpoint = touchPointData.touchpoint; // Assuming touchpoint contains the needed details

    // Construct formResponses for each touchpoint
    this.formResponses[touchpoint.id] = {
      yes_no: touchPointData?.touchPointSelection, 
      internalExternal: touchPointData?.touchPointSystem, 
      automated: touchPointData?.touchPointAutomation,
      owners: touchPointData?.touchpointStakeholders
    };
  });

  console.log(this.formResponses);
    });
  }

  submitForm() {
    const obj = {
      clientId: sessionStorage.getItem("ClientId"),
      createdDate: new Date().toISOString(),
      realityTouchpointStageId: this.stageId,
      loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      phaseId: JSON.parse(sessionStorage.getItem("ClientData")!).phaseid,
      realityTouchpointAssignmentId: this.starttouchpointId,
      quality: {
        note: this.feedbackText,
        selectedOption: this.selectedRating
      },
      reality: this.realityComponent.map((component: any) => ({
        componentId: component?.componentForReality?.id,
        present: this.formResponses[component?.componentForReality?.id]?.yes_no || ""
      })),
      efficiency: this.touchPoints.map((point: any) => ({
        touchPointId: point?.touchpoint?.id,
        selectedOption: this.formResponses[point?.touchpoint?.id]?.automated || "",
        selectedOption2 : this.formResponses[point?.touchpoint?.id]?.internalExternal || ""
      })),
      stakeholder: this.touchPoints.map((point: any) => ({
        touchPointId: point?.touchpoint?.id,
        selectedOption: this.formResponses[point?.touchpoint?.id]?.owners || []
      })),
      touchpoint: this.touchPoints.map((point: any) => ({
        isPresent: this.formResponses[point?.touchpoint?.id]?.yes_no || "",
        touchPointId: point?.touchpoint?.id
      }))
    };
    console.log('Form submission object:', obj);


    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to submit the reality touchpoint?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        console.log('Form submission object:', obj);
        this.api.assignFormResonce(obj).subscribe((res: any) => {
          console.log(res);
          if (res.message === "RealityTouchpoint response captured successfully.") {
            this.toastr.success('RealityTouchpoint response captured successfully.');
            this.clearForm();
            this.navigateBack();
          } else {
            this.toastr.error('Something went wrong');
          }
        });
      }
    });
  }
  navigateBack() {
    this.location.back();
  }
  clearForm() {
    // Reset form groups
    this.reality.reset();
    this.touchpoint.reset();

    // Clear additional state
    this.feedbackText = "";
    this.selectedRating = "";
    this.formResponses = {};

    // Optionally, reset nested form controls if they exist
    this.realityComponent.forEach((component: any) => {
      const controlId = String(component.id);
      const control = this.reality.get(controlId);
      if (control) {
        control.reset();
      }
    });

    this.touchPoints.forEach((point: any) => {
      const controlId = String(point.id);
      const control = this.touchpoint.get(controlId);
      if (control) {
        control.reset();
      }
    });
  }


  onRatingChange(rating: string) {
    this.selectedRating = rating;
  }

  onInputScoreChange(event: any) {
    this.selectedRating = event?.target?.value;
    console.log(this.selectedRating);
    
  }
  
  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  
    const inputValue = evt.target.value + String.fromCharCode(charCode);
  
    if (parseInt(inputValue) > 100) {
      evt.preventDefault();
      return false;
    }
  
    return true;
  }
  

  onFeedbackChange(event: any) {
    this.feedbackText = event.target.value;
  }

  onOptionChange(item: any, field: string, value: string) {
    if (!this.formResponses[item.id]) {
      this.formResponses[item.id] = {};
    }
    this.formResponses[item.id][field] = value;
  }

  onOwnerChange(item: any, owner: string, event: any) {
    const isChecked = event.target.checked;
    if (!this.formResponses[item.id]) {
      this.formResponses[item.id] = {};
    }
    if (!this.formResponses[item.id].owners) {
      this.formResponses[item.id].owners = [];
    }
    if (isChecked) {
      this.formResponses[item.id].owners.push(owner);
    } else {
      const index = this.formResponses[item.id].owners.indexOf(owner);
      if (index > -1) {
        this.formResponses[item.id].owners.splice(index, 1);
      }
    }
  }

  goBack() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to cancel the reality touchpoint?`,
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
