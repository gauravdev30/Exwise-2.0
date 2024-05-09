import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-reality-assest',
  templateUrl: './create-reality-assest.component.html',
  styleUrl: './create-reality-assest.component.css'
})
export class CreateRealityAssestComponent {
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<CreateRealityAssestComponent>,){}

  onClose(): void {
    this.dialogRef.close();
  }
}
