import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-create-matrics',
  templateUrl: './create-matrics.component.html',
  styleUrl: './create-matrics.component.css',
})
export class CreateMatricsComponent implements OnInit {
  showcontainer: string = '';
  clientId: any;
  createForm!: FormGroup;
  addMatrixForm!: FormGroup;
  buttonName: any = 'Add metric';
  selectedOption: any = '';
  file: any;
  isSelectedFileValid: boolean = false;
  formData: any;
  constructor(
    private dialogRef: MatDialogRef<CreateMatricsComponent>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: { name: string; id: number },
    private service: ProjectService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      value: ['', Validators.required],
      phaseId: ['', Validators.required],
      nextDataDueDate: [new Date(), [Validators.required]],
      metricsName: ['', [Validators.required]],
      frequencyOfDataCollection: [''],
      calculationsOrDefination: [''],
      additionalInformation: [''],
      loggedUserId: '',
      selectedOption: [''],
      historicData: this.fb.array([]),
    });

    this.addMatrixForm = this.fb.group({});

    if (this.data?.name === 'edit-Matrix' && this.data.id !== null) {
      console.log(this.data.id);

      this.buttonName = 'Update';
      this.onEdit();
    }
  }

  createProject() {
    if (this.buttonName === 'Add metric') {
      // if (this.createForm.valid) {
      const form = this.createForm.value;
      console.log(form);

      if (form.selectedOption === 'excel') {
        const obj = {
          additionalInformation: form.additionalInformation,
          file: this.file,
          metricsName: form.metricsName,
          phaseId: form.phaseId,
          frequencyOfDataCollection: form.frequencyOfDataCollection,
          calculationsOrDefination: form.calculationsOrDefination,
          nextDataDueDate: form.nextDataDueDate,
          value: form.value,
          loggedUserId: JSON.parse(
            sessionStorage.getItem('currentLoggedInUserData')!
          ).loggedUserId,
        };
        
        const formData = new FormData();
        Object.entries(obj).forEach((val) => {
          formData.append(val[0], val[1]);
        });

        this.service
          .addPeopleMetricsWithExcel(formData)
          .subscribe((data: any) => {
            console.log(data);
          });
      }
     else if (form.selectedOption === 'manually'){
      const obj={
        additionalInformation:  form.additionalInformation,
        calculationsOrDefination:form.calculationsOrDefination,
        clientId: sessionStorage.getItem("ClientId"),
        createdDate: new Date(),
        frequencyOfDataCollection: form.frequencyOfDataCollection,
        historicData: form.historicData,
    
        loggedUserId:JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).loggedUserId,
        metricsName: form.metricsName,
        nextDataDueDate: form.date,
        phaseId: form.paseId,
        value:  form.value
      }
this.service.peoplemetrics(obj).subscribe((res:any)=>{console.log(res);
})
     }
 

      // console.log(obj);
      // this.service.peoplemetrics(obj).subscribe((res: any) => {
      //   console.log(res);
      // });

      // }
      // else {
      //   this.createForm.markAllAsTouched();
      // }
    } else if (this.buttonName === 'Update') {
    }
  }

  onEdit() {
    this.service.getMatrixById(this.data.id).subscribe((res: any) => {
      console.log(res);
    });
  }
  historicData(): FormArray {
    return this.createForm.get('historicData') as FormArray;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  addRow() {
    const dataItem = this.fb.group({
      monthYear: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.historicData().push(dataItem);
  }

  deleteRow(i: number) {
    this.historicData().removeAt(i);
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
      // const formData = new FormData();
      // formData.append('file', this.file);
      // this.formData = formData;
    }
  }

  uploadFile() {
    // this.service.uploadHolidayFile(this.formData).subscribe({
    //   next: (val) => {
    //     const { data, message, success } = val;
    //     success
    //       ? (this.notificationService.showSuccess(message, ''),
    //         location.reload())
    //       : this.notificationService.showError(message, '');
    //   },
    //   error: (err) => {
    //     this.notificationService.showError(
    //       'Error uploading holiday file',
    //       'Please try again'
    //     );
    //   },
    // });
  }
  onFileBrowse(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement?.files?.[0]; // Get the selected file
    if (this.file) {
      this.validateFile();
    }
  }
}
