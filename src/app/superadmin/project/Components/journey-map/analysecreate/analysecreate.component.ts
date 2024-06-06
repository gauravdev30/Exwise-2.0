import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-analysecreate',
  templateUrl: './analysecreate.component.html',
  styleUrl: './analysecreate.component.css'
})
export class AnalysecreateComponent implements OnInit{
  showcontainer: string = '';
  clientId: any;
  createForm!: FormGroup;
  addMatrixForm!: FormGroup;
  buttonName: any = 'Create';
  selectedOption: any = '';
  file: any;
  isSelectedFileValid: boolean = false;
  formData: any;
  isLoading: any;

constructor(
  private dialogRef: MatDialogRef<AnalysecreateComponent>,
  private fb: FormBuilder,
  @Inject(DIALOG_DATA) public data: { name: string; id: number },
  private service: ProjectService,
  private tosatr: ToastrService
){}

ngOnInit(): void {
  this.createForm = this.fb.group({
    surveyAssignment: ['', Validators.required],
    recommendedNextSteps: [''],
    executiveSummary: [''],
    exHighlights: ['', [Validators.required]],
    isSharedWithCPOC: [''],
    document: [''],
    description: [''],

  });

  this.addMatrixForm = this.fb.group({});

  if (this.data?.name === 'edit-report' && this.data.id !== null) {
    console.log(this.data.id);

    this.buttonName = 'Update';
    this.onEdit();
  }
}

createProject() {
  if (this.buttonName === 'Create') {
    // if (this.createForm.valid) {
    const form = this.createForm.value;
    console.log(form);


      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document:this.file,
        isSharedWithCPOC:true,
        exHighlights: form.exHighlights,
        executiveSummary: form.executiveSummary,
        recommendedNextSteps: form.recommendedNextSteps,
        surveyAssignment: form.surveyAssignment,
      };

      this.service
        .addPeopleMetricsWithExcel(obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.message === 'Metrics created successfully.') {
            console.log('Metrics created successfully.');
            this.tosatr.success(res.message);
            this.createForm.reset();
            this.onClose();
          } else {
          }
        });
  } 
  else if (this.buttonName === 'Update') {
    const form = this.createForm.value;
    console.log(form);
    const obj = {
      clientId: sessionStorage.getItem('ClientId'),
      description: form.description,
      document:this.file,
      isSharedWithCPOC:true,
      exHighlights: form.exHighlights,
      executiveSummary: form.executiveSummary,
      recommendedNextSteps: form.recommendedNextSteps,
      surveyAssignment: form.surveyAssignment,
    };

    console.log(obj);

    this.service.updateMetric(this.data.id, obj).subscribe((res: any) => {
      console.log(res);
      if (res.message === 'Metrics updated successfully.') {
        console.log('Metrics updated successfully.');
        this.tosatr.success(res.message);
        this.createForm.reset();
        this.onClose();
      } else {
      }
    });
  }
  else{

  }
}

onEdit() {
  this.isLoading = true;
  this.service.getMatrixById(this.data.id).subscribe((res) => {
    console.log(res);

    this.isLoading = false;
    const form = res.data.peopleMetrics;
    this.createForm.patchValue({
      additionalInformation: form.additionalInformation,
      calculationsOrDefination: form.calculationsOrDefination,
      dataPoint: form.dataPoint,
      createdDate: new Date(),
      getFromExcel: false,
      frequencyOfDataCollection: form.frequencyOfDataCollection,
      listOfData: form.listOfData,

      metricsName: form.metricsName,
      nextDataDueDate: form.nextDataDueDate,
      phaseId: form.phaseId,
      value: form.value,
    });
  });
}
onClose(): void {
  this.dialogRef.close();
}
}
