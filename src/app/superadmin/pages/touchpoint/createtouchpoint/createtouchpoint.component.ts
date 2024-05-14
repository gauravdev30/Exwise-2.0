import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TouchpointService } from '../../../services/touchpoint.service';

@Component({
  selector: 'app-createtouchpoint',
  templateUrl: './createtouchpoint.component.html',
  styleUrl: './createtouchpoint.component.css'
})
export class CreatetouchpointComponent implements OnInit {
  SurveyId: number = 0;
  buttonName: any = 'Create Stage';
  createTouchpointForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreatetouchpointComponent>,
    private fb: FormBuilder,
    private service:TouchpointService,
    private tostr: ToastrService) {
    if (this.data) {
      this.buttonName = 'Update Stage'
    }
    else {
      this.buttonName = 'Create Stage'
    }
  }

  ngOnInit(): void {

    if(this.buttonName==='Update Stage'){
      this.getTouchpointStageById(this.data.stageId);
    }
    this.createTouchpointForm = this.fb.group({
      // description: [''],
      loggedUserId: [''],
      stageName: ['', Validators.required]
    })
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

  getTouchpointStageById(stageId:number){
    this.service.getTouchpointStageById(stageId).subscribe({next:(res)=>{
      const form = res.data;
      this.createTouchpointForm.patchValue({
        stageName: form.stageName
      })
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }


  onSubmit() {
    if (this.buttonName === 'Create Stage') {
      if (this.createTouchpointForm.valid) {
        const form = this.createTouchpointForm.value;
        const touchPointStages = {
          // description: '',
          loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
          stageName: form.stageName
        }
        this.service.createTouchpointStage(touchPointStages).subscribe(({next:(res)=>{
          this.tostr.success(res.message);
          this.onClose();
        },error:(err)=>{console.log(err)},complete:()=>{}}))
      }
      else{
        this.createTouchpointForm.markAllAsTouched();
      }
    }
    else if (this.buttonName === 'Update Stage') {

    }
    else {
      console.log("Something is wrong");
    }
  }
}
