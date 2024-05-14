import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMatricsComponent } from '../create-matrics/create-matrics.component';

@Component({
  selector: 'app-info-matrix',
  templateUrl: './info-matrix.component.html',
  styleUrl: './info-matrix.component.css'
})
export class InfoMatrixComponent implements OnInit {
  items:any;
  isPopupOpen: boolean=false;
  surveyList:any;
  

  constructor(@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute,private dialogRef: MatDialogRef<CreateMatricsComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }


  next(){
    this.dialogRef.close();
  }
}
