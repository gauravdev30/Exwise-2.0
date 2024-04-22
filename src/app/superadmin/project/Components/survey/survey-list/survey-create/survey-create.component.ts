import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyApiService } from '../../service/survey-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent implements OnInit {
  SurveyId:number=0;
  buttonName:any='Create survey';
  createSurveyForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<SurveyCreateComponent>, private fb: FormBuilder,private api:SurveyApiService,private tostr:ToastrService){
    if (data) {
      this.SurveyId = data.surveyId;
      this.buttonName='Update survey'
    }
    else{
      this.buttonName='Create survey'
    }
  }

  ngOnInit(): void {
    this.createSurveyForm = this.fb.group({
      survey_name: ['', [Validators.required, Validators.pattern('[^0-9]*')]],
      survey_Type: [''],
      survey_description: [''],
      id:[''],
      loggedUserId: [''],
      createdForClientId:['']
    });

    if(this.SurveyId>0){
      this.getSurveyByClientId();
    }
  }

  onClose(){
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


  onSubmit(){
    if(this.buttonName==='Create survey'){
      if(this.createSurveyForm.valid){
        const form = this.createSurveyForm.value;
        const obj = {
          survey_name: form.survey_name,
          survey_Type: form.survey_Type,
          survey_description: form.survey_description,
          createdForClientId: 1,
          loggedUserId: 1,
          id:5,
        }
        console.log(obj);
        this.api.createSurvey(obj).subscribe((res)=>{
          if(res.success){
            // console.log(res.message);
            this.onClose();
            this.tostr.success(res.message);
          }
          else{
            this.tostr.error(res.message);
          }
        })
      }
      else{
        this.createSurveyForm.markAllAsTouched();
     }
    }
      else if(this.buttonName==='Update survey'){
        if(this.createSurveyForm.valid){
          const form = this.createSurveyForm.value;
          const obj = {
            survey_name: form.survey_name,
            survey_Type: form.survey_Type,
            survey_description: form.survey_description,
            createdForClientId: 1,
            loggedUserId: 1,
            id:5,
          }
          this.api.updateSurveyById(this.SurveyId,obj).subscribe((res)=>{
            if(res.success){
              this.onClose();
              this.tostr.success(res.message);
              this.createSurveyForm.reset();
            }
            else{
              this.tostr.error(res.message);
            }
          });
        }
        else{
          this.createSurveyForm.markAllAsTouched();
       }
    }
  }

  getSurveyByClientId(){
    this.api.getSurveyById(this.SurveyId).subscribe((res)=>{
      if(res.success){
        const surveyData = res.data;
        this.createSurveyForm.patchValue({
          survey_name: surveyData.survey_name,
          survey_Type: surveyData.survey_Type,
          survey_description: surveyData.survey_description,
          createdForClientId: 1,
          loggedUserId: 1,
          id:5,
        });
      }
    });
  }
}
