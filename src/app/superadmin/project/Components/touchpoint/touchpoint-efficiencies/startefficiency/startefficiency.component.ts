import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-startefficiency',
  templateUrl: './startefficiency.component.html',
  styleUrl: './startefficiency.component.css'
})
export class StartefficiencyComponent {
  efficiencyOptions = [
    'Manual', 
    'Partially automated', 
    'Automated', 
    'Internal system', 
    'External system', 
  ];
  
  constructor(private dialogRef: MatDialogRef<StartefficiencyComponent>){}

onClose(): void {
    this.dialogRef.close();
}

submitEfficiency(){

}
}
