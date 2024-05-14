import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-matrix',
  templateUrl: './info-matrix.component.html',
  styleUrl: './info-matrix.component.css'
})
export class InfoMatrixComponent {
  items:any;
  // isPopupOpen: boolean=false;
  surveyList:any;
  

  constructor(private dialogRef: MatDialogRef<InfoMatrixComponent>,@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute){}

  onClose(): void {
    this.dialogRef.close();
  }


  // next(){
  //   this.dialogRef.close();
  // }
}
