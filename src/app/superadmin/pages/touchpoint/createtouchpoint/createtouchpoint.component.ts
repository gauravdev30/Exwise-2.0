import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createtouchpoint',
  templateUrl: './createtouchpoint.component.html',
  styleUrl: './createtouchpoint.component.css'
})
export class CreatetouchpointComponent implements OnInit{
  SurveyId: number = 0;
  buttonName: any = 'Create Touchpoint';
  createTouchpointForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreatetouchpointComponent>, private fb: FormBuilder,private tostr: ToastrService) {
    if (data) {
      this.buttonName = 'Update Touchpoint'
    }
    else {
      this.buttonName = 'Create Touchpoint'
    }
  }

  ngOnInit(): void {
    
  }

  stages(): FormArray {
    return this.createTouchpointForm.get('stages') as FormArray;
  }
  addRow() {
    const formControl = new FormControl('');
    this.stages().push(formControl);
  }
  deleteRow(i: number) {
    this.stages().removeAt(i)
  }

  onClose() {
    this.dialogRef.close();
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }


  onSubmit() {
    if (this.buttonName === 'Create survey') {

    }
    else if (this.buttonName === 'Update survey') {
      
    }
    else{
      console.log("Something is wrong");
    }
  }
}
