import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TouchpointService } from '../../../services/touchpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignpopup',
  templateUrl: './assignpopup.component.html',
  styleUrl: './assignpopup.component.css'
})
export class AssignpopupComponent implements OnInit {
  selectedStage: any;
  selecetdSubPhase: any;
  subphasename: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private dialogRef: MatDialogRef<AssignpopupComponent>,
 private fb: FormBuilder,
 private tostr: ToastrService,
 private service:TouchpointService,
 private router: Router){}

  ngOnInit(): void {
    
  }

  onClose() {
    this.dialogRef.close();
  }

  next(id:any) {
    this.dialogRef.close();
    console.log(this.subphasename);
    console.log(this.selectedStage);

    if(id===1){
      this.router.navigate(['superadmin/assign-touchpoint'], {
        queryParams: {
          stage: this.selectedStage,
          subPhase: this.subphasename,
        },
      });
    }
    else if(id===2){
      this.router.navigate(['superadmin/assign-component'], {
        queryParams: {
          stage: this.selectedStage,
          subPhase: this.subphasename,
        },
      });
    }
  }
}
