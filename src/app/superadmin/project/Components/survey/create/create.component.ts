import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  showContainer:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateComponent>,private fb: FormBuilder, private api: ProjectService, private toastr: ToastrService){
    this.showContainer=data.id;
  }

  onClose(){
    this.dialogRef.close();
  }
}
