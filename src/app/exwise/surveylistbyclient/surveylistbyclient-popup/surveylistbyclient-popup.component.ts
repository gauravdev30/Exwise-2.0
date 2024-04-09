import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-surveylistbyclient-popup',
  templateUrl: './surveylistbyclient-popup.component.html',
  styleUrl: './surveylistbyclient-popup.component.css'
})
export class SurveylistbyclientPopupComponent {
  items: any[] = [
    {empId: '45', empName: 'Abc', emailID: 'abc@gmail.com', city:'pune', contactNumber:'8273733256' },
    {empId: '45', empName: 'Abc', emailID: 'abc@gmail.com', city:'pune', contactNumber:'8273733256' },
    {empId: '45', empName: 'Abc', emailID: 'abc@gmail.com', city:'pune', contactNumber:'8273733256' },
  ];

  showcontainer:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<SurveylistbyclientPopupComponent>) {
    if (data.name!==null) {
      this.showcontainer = data.name;
    }
  }


  onClose(): void {
    console.log('close')
    this.dialogRef.close();
  }

}
