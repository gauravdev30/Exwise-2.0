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

  months = [
    { month: 'January', percentage: '4%' },
    { month: 'February', percentage: '3.5%' },
    { month: 'March', percentage: '4.2%' },
    { month: 'April', percentage: '5.8%' },
    { month: 'May', percentage: '4.5%' },
    { month: 'June', percentage: '5%' },
    { month: 'July', percentage: '4.2%' },
    { month: 'August', percentage: '3.8%' },
    { month: 'September', percentage: '4%' },
    { month: 'October', percentage: '4.5%' },
    { month: 'November', percentage: '4.2%' },
    { month: 'December', percentage: '5%' }
  ];

  firstHalf = this.months.slice(0, 6);
  secondHalf = this.months.slice(6, 12);
  

  constructor(@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute,private dialogRef: MatDialogRef<CreateMatricsComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }


  
}
