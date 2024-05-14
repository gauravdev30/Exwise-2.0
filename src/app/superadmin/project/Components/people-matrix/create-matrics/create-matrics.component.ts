import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

@Component({
  selector: 'app-create-matrics',
  templateUrl: './create-matrics.component.html',
  styleUrl: './create-matrics.component.css'
})
export class CreateMatricsComponent implements OnInit{
  showcontainer: string = '';
  clientId: any;
  createForm!: FormGroup;
  addMatrixForm!:FormGroup;
  buttonName: any = 'Add Metric'
  selectedOption: any='';
constructor(private dialogRef: MatDialogRef<CreateMatricsComponent>,private fb:FormBuilder){}
onClose(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.createForm = this.fb.group({
    value: ['', Validators.required],
    phaseId: ['', Validators.required],
    nextDataDueDate: ['', [Validators.required]],
    metricsName: ['', [Validators.required]],
    frequencyOfDataCollection: [''],
    calculationsOrDefination: [''],
    additionalInformation: [''],
    loggedUserId: '',
    selectedOption:[''],
    historicData:this.fb.array([])
  });

  this.addMatrixForm = this.fb.group({
    
  })
}


createProject() {
  if (this.buttonName === 'Add Metric') {
console.log(this.createForm.value);

    if (this.createForm.valid) {
      const form = this.createForm.value;
      console.log(form);
      
      const obj = {
        additionalInformation: form.additionalInformation,
        calculationsOrDefination: form.calculationsOrDefination,
        createdDate: new Date(),
        frequencyOfDataCollection: form.frequencyOfDataCollection,
        historicData:form.historicData,
      
        loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).loggedUserId,
        metricsName: form.metricsName,
        nextDataDueDate: form.date,
        phaseId: form.paseId,
        value: form.value
      }

      console.log(obj);
  
    }
    else {
      this.createForm.markAllAsTouched();
    }
  }
  else if(this.buttonName==='Update'){

  }
}

historicData(): FormArray {
  return this.createForm.get('historicData') as FormArray;
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
file: any;
isSelectedFileValid: boolean = false;
formData: any;
onDrop(event: any) {
  event.preventDefault();
  [...event.dataTransfer.items].forEach((item, i) => {
    // If dropped items aren't files, reject them
    if (item.kind === 'file') {
      this.file = item.getAsFile();
      this.validateFile();
    }
  });
  document.getElementById('dropzone')!.style.background = 'white';
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
    formData.append('file', this.file);
    this.formData = formData;
  }
}

onDragOver(event: any) {
  event.stopPropagation();
  event.preventDefault();
  document.getElementById('dropzone')!.style.background = '#c8dadf';
}
ondragleave(event: any) {
  document.getElementById('dropzone')!.style.background = 'white';
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
