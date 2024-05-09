import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TouchpointService } from '../../../services/touchpoint.service';

@Component({
  selector: 'app-showallcomponents',
  templateUrl: './showallcomponents.component.html',
  styleUrl: './showallcomponents.component.css'
})
export class ShowallcomponentsComponent implements OnInit {
allComponents:any;

constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private dialogRef: MatDialogRef<ShowallcomponentsComponent>,
 private fb: FormBuilder,
 private tostr: ToastrService,
 private service:TouchpointService,){}

ngOnInit(): void {
  this.service.getAllComponents().subscribe({next:(res)=>{
    this.allComponents=res.data;
  },error:(err)=>{
    console.log(err)
  },complete:()=>{}})
}

onClose() {
  this.dialogRef.close();
}


}
