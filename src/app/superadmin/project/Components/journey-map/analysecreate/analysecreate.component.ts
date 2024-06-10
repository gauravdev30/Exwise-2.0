import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ids: any[] = [];

  formResponses: any;
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
      surveyAssignment: this.fb.array([]),
      recommendedNextSteps: ['',[Validators.required]],
      executiveSummary: ['',[Validators.required]],
      exHighlights: ['', [Validators.required]],
      isSharedWithCPOC: [''],
      document: [''],
      description: ['',[Validators.required]],
    });


    if (this.data?.name === 'edit-report' && this.data.id !== null) {
      console.log(this.data.id);

      this.buttonName = 'Update';
      this.onEdit();
    }
  }

  surveyAssignment(): FormArray {
    return this.createForm.get('surveyAssignment') as FormArray;
  }
  addRow() {
    const dataItem = this.fb.group({
      monthYear: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.surveyAssignment().push(dataItem);
  }
  onOptionChange(item: any, field: string, value: string) {
    if (!this.formResponses[item.id]) {
      this.formResponses[item.id] = {};
    }
    this.formResponses[item.id][field] = value;
  }
  onOwnerChange(item: any, event: any) {
    const isChecked = event.target.value;

    this.ids.push(item);
    console.log(this.ids);

    // if (!this.formResponses[item.id]) {
    //   this.formResponses[item.id] = {};
    // }
    // if (!this.formResponses[item.id].owners) {
    //   this.formResponses[item.id].owners = [];
    // }
    // if (isChecked) {
    //   this.formResponses[item.id].owners.push(owner);
    //   console.log(owner);

    // } else {
    //   const index = this.formResponses[item.id].owners.indexOf(owner);
    //   if (index > -1) {
    //     this.formResponses[item.id].owners.splice(index, 1);
    //   }
    // }
  }
  getallreports() {
    this.service.getAllanalyseById().subscribe((res: any) => {
      console.log(res);
      this.details = res.data;
      console.log(this.details);
    });
  }

  getAllSurveyByClientId() {
    this.service
      .getAllWthSurveyByClientID(sessionStorage.getItem('ClientId'))
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
      if (this.createForm.valid) {
      const form = this.createForm.value;
      console.log(form);

      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document: this.file,
        isSharedWithCPOC: false,
        exHighlights: form.exHighlights,
        executiveSummary: form.executiveSummary,
        recommendedNextSteps: form.recommendedNextSteps,
        surveyAssignment: this.ids,
      };
      console.log(obj);

      this.service.createanalyse(obj).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'EXDiagnosticReport created successfully.') {
          console.log('EXDiagnosticReport created successfully.');
          this.tosatr.success(res.message);
          this.createForm.reset();
          this.onClose();
        } else {
        }
      });
    }
    else{
      this.createForm.markAllAsTouched();
    }
    } else if (this.buttonName === 'Update') {
      const form = this.createForm.value;
      console.log(form);
      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document: this.file,
        
        exHighlights: form.exHighlights,
        executiveSummary: form.executiveSummary,
        recommendedNextSteps: form.recommendedNextSteps,
        surveyAssignment: form.surveyAssignment,
      };

      console.log(obj);

      this.service
        .updateanalysetById(this.data.id, obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.message === 'EXDiagnosticReport updated successfully.') {
            console.log('EXDiagnosticReport updated successfully.');
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
    this.service.getanalyseById(this.data.id).subscribe((res) => {
      console.log(res);

      const form = res.data;
      this.createForm.patchValue({
        clientId: sessionStorage.getItem('ClientId'),
        description: form.description,
        document: this.file,

        exHighlights: form.exHighlights,
        executiveSummary: form.executiveSummary,
        recommendedNextSteps: form.recommendedNextSteps,
        surveyAssignment: form.surveyAssignment,
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
          this.file = val;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  uploadFile() {}
  onFileBrowse(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement?.files?.[0]; // Get the selected file
    if (this.file) {
      this.validateFile();
      
    }
  }
}
