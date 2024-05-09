import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-starttouchpoint',
  templateUrl: './starttouchpoint.component.html',
  styleUrl: './starttouchpoint.component.css'
})
export class StarttouchpointComponent {

  touchpointOptions = [
    'Very satisfied', 
    'Satisfied', 
    'Neutral', 
    'Dissatisfied', 
    'Very dissatisfied', 
    'Not Applicable'
  ];

  constructor(private dialogRef: MatDialogRef<StarttouchpointComponent>){}

  onClose(): void {
    this.dialogRef.close();
  }

  submitTouchpoints(){
    
  }

}
