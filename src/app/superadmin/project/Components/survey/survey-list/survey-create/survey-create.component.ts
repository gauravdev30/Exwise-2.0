import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyApiService } from '../../service/survey-api.service';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent implements OnInit {

  createSurveyForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<SurveyCreateComponent>, private fb: FormBuilder,private api:SurveyApiService){}

  ngOnInit(): void {
    this.createSurveyForm = this.fb.group({
      survey_name: ['', Validators.required],
      survey_Type: ['', Validators.required],
      survey_description: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      id:[''],
      loggedUserId: [''],
      createdForClientId:['']
    });
  }

  onClose(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.createSurveyForm.valid){
      const form = this.createSurveyForm.value;
      const obj = {
        survey_name: form.survey_name,
        survey_Type: form.survey_Type,
        survey_description: form.survey_description,
        createdForClientId: 1,
        loggedUserId: 1,
        id:1,
      }

      this.api.createSurvey(obj).subscribe((res)=>{
        if(res.success){
          console.log(res.message);
        }
      })
    }
  }
}
