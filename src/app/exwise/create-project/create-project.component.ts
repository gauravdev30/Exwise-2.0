import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  showcontainer:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CreateProjectComponent>) {
    if (data.name!==null) {
      this.showcontainer = data.name;
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
