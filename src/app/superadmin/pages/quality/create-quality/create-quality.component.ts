import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-quality',
  templateUrl: './create-quality.component.html',
  styleUrl: './create-quality.component.css'
})
export class CreateQualityComponent {
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<CreateQualityComponent>,){}

  onClose(): void {
    this.dialogRef.close();
  }
}
