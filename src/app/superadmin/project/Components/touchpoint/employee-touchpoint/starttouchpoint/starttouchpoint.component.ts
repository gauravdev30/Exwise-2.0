import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TouchpointService } from '../../../../../services/touchpoint.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  formResponses: any
  realityQuality: any;
  extouchpoints: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!:FormGroup;
  starttouchpointId:any;
  touchPoints:any;
  realityComponent:any;
  constructor(
    private api: TouchpointService, private route: ActivatedRoute,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);

      this.starttouchpointId = params.get('id');
      console.log('starttouchpointId:', this.starttouchpointId);

    });
   this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.api.getAssignFormById(this.starttouchpointId).subscribe((res:any)=>{
      console.log(res);
      this.realityComponent=res.data.realityComponent
      console.log(this.realityComponent);
      this.touchPoints=res.data.touchPoints
      console.log(this.touchPoints);
      
      
    })

  }

  onOptionChange(item: any, field: string, value: string) {
    if (!this.formResponses[item.id]) {
      this.formResponses[item.id] = {};
    }
    this.formResponses[item.id][field] = value;
  }

  onOwnerChange(item: any, owner: string, event: any) {
    const isChecked = event.target.value;
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





}
