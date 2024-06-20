import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TouchpointService } from '../../../../../services/touchpoint.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private api: TouchpointService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);

      const starttouchpointId = params.get('id');
      console.log('starttouchpointId:', starttouchpointId);

    });

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
