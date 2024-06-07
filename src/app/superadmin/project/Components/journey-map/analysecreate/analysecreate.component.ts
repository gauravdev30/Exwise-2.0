import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-analysecreate',
  templateUrl: './analysecreate.component.html',
  styleUrl: './analysecreate.component.css',
})
export class AnalysecreateComponent implements OnInit {
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
  details: any;
  orderBy: any = 'desc';
  page: any = 1;
  size: any = 10;
  sortBy: any = 'id';
  internalOwners: string[] = [
    'External Communications', 'Facilities Management', 'HR Shared Services', 'HR', 'Internal Communications', 'IT', 
    'Learning & Development', 'Line Manager', 'Onboarding Team', 'Operations', 'Other', 'Recruitment Team', 'Security'
  ];
  formResponses:any;
  constructor(
    private dialogRef: MatDialogRef<AnalysecreateComponent>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: { name: string; id: number },
    private service: ProjectService,
    private tosatr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllSurveyByClientId();
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
  onOptionChange(item: any, field: string, value: string) {
    if (!this.formResponses[item.id]) {
      this.formResponses[item.id] = {};
    }
    this.formResponses[item.id][field] = value;
  }
  onOwnerChange(item: any, owner: string, event: any) {
    const isChecked=event.target.value;
    console.log(isChecked);
    console.log(item);
    
    
    // if (!this.formResponses[item.id]) {
    //   this.formResponses[item.id] = {};
    // }
    // if (!this.formResponses[item.id].owners) {
    //   this.formResponses[item.id].owners = [];
    // }
    // if (isChecked) {
    //   this.formResponses[item.id].owners.push(owner);
    // } else {
    //   const index = this.formResponses[item.id].owners.indexOf(owner);
    //   if (index > -1) {
    //     this.formResponses[item.id].owners.splice(index, 1);
    //   }
    // }
  }


  getAllSurveyByClientId() {
    this.service
      .getAllSurveyByClientID(
        sessionStorage.getItem('ClientId'),
        this.orderBy,
        this.page - 1,
        this.size,
        this.sortBy
      )
      .subscribe({
        next: (res) => {
          if (res.message === 'Failed to retrieve survey assignments.') {
          } else {
            this.details = res.data;
            console.log(this.details);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

  createProject() {
    if (this.buttonName === 'Create') {
      // if (this.createForm.valid) {
      const form = this.createForm.value;
      console.log(form);

      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document: this.file,
        isSharedWithCPOC: true,
        exHighlights: form.exHighlights,
        executiveSummary: form.executiveSummary,
        recommendedNextSteps: form.recommendedNextSteps,
        surveyAssignment: form.surveyAssignment,
      };
      console.log(obj);

      this.service.addPeopleMetricsWithExcel(obj).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'Metrics created successfully.') {
          console.log('Metrics created successfully.');
          this.tosatr.success(res.message);
          this.createForm.reset();
          this.onClose();
        } else {
        }
      });
    } else if (this.buttonName === 'Update') {
      const form = this.createForm.value;
      console.log(form);
      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document: this.file,
        isSharedWithCPOC: true,
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
    } else {
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

  validateFile() {
    if (
      ![
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ].includes(this.file.type)
    ) {
      this.isSelectedFileValid = false;
    } else {
      this.isSelectedFileValid = true;
      const formData = new FormData();
      formData.append('profilePicture', this.file);
      this.formData = formData;
      this.service.saveeDoc(this.formData).subscribe({
        next: (val) => {
         console.log(val);
         
        },
        error: (err) => {
       console.log(err);
       
        },
      });
    }
  }

  uploadFile() {
  
  }
  onFileBrowse(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement?.files?.[0]; // Get the selected file
    if (this.file) {
      this.validateFile();
    }
  }

}
