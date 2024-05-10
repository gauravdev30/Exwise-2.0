import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { StarttouchpointComponent } from './employee-touchpoint/starttouchpoint/starttouchpoint.component'; 
import { InfochartComponent } from './infochart/infochart.component';

@Component({
  selector: 'app-touchpoint',
  templateUrl: './touchpoint.component.html',
  styleUrl: './touchpoint.component.css'
})
export class TouchpointComponent {
 // employeeTouchpoint:any;
  
 employeeTouchpoint: any[] = [
  {
    stage: 'stage 1',
    subphase: 'subphase1',
    status: 'Completed',  
    created_date: new Date()
  },
  {
    stage: 'stage 2',
    subphase: 'subphase2',
    status: 'Not Completed',
    created_date: new Date()
  },

];

constructor(private dialog: MatDialog) {}

ngOnInit(): void {
  
}

openPopup(id:number){
  const dialogRef = this.dialog.open(InfochartComponent, {
    width: '1200px',
    height: '700px',
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe(() => {
  });
}

openEmpTouchpoint(): void {
  const dialogRef = this.dialog.open(StarttouchpointComponent, {
    width: '800px',
    height: '650px',
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe(() => {
  });
}
}
