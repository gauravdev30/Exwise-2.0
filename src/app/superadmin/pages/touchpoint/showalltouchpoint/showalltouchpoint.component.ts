import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TouchpointService } from '../../../services/touchpoint.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-showalltouchpoint',
  templateUrl: './showalltouchpoint.component.html',
  styleUrl: './showalltouchpoint.component.css'
})
export class ShowalltouchpointComponent implements OnInit {
  touchpoints:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private dialogRef: MatDialogRef<ShowalltouchpointComponent>,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private service:TouchpointService,){}

  ngOnInit(): void {
    this.service.getAllTouchPoints().subscribe({next:(res)=>{
      this.touchpoints=res.data;
    },error:(err)=>{console.group(err)},complete:()=>{}})
  }

  onClose() {
    this.dialogRef.close();
  }

}
