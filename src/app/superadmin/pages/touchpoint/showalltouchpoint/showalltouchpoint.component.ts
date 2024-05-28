import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TouchpointService } from '../../../services/touchpoint.service'; 
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-showalltouchpoint',
  templateUrl: './showalltouchpoint.component.html',
  styleUrl: './showalltouchpoint.component.css'
})
export class ShowalltouchpointComponent implements OnInit {
  touchpoints:any;
  btnName:any='Create touchpoint';
  isLoading:boolean=false;
  collapseCreateTouchpoint:any;
  createTouchPointForm!:FormGroup;
  touchpointId:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private dialogRef: MatDialogRef<ShowalltouchpointComponent>,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private service:TouchpointService,){}

  ngOnInit(): void {
    this.getAllTouchpoints();
    this.createTouchPointForm = this.fb.group({
      touchpoints: ['', Validators.required],
      created_date:[''],
      loggedUserId: [''],
    });
  }

  getAllTouchpoints(){
    this.isLoading=true;
    this.service.getAllTouchPoints().subscribe({next:(res)=>{
      this.touchpoints=res.data;
      this.isLoading=false;
    },error:(err)=>{console.group(err)},complete:()=>{}});
  }

  onClose() {
    this.dialogRef.close();
  }

  toggleTouchpointForm() {
    this.btnName='Create touchpoint'
    const touchPointRef = document.getElementById('touchpoint')!;
    this.collapseCreateTouchpoint = new bootstrap.Collapse(touchPointRef);
    this.collapseCreateTouchpoint.toggle();
  }

  createTouchpoint(){
   if(this.btnName==='Create touchpoint'){
    if (this.createTouchPointForm.valid) {
      const form = this.createTouchPointForm.value;
      const obj = {
        touchpoints:form.touchpoints,
        created_date:new Date(),
        loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      }

      this.service.createTouchpoint(obj).subscribe({
        next: (res) => {
          this.tostr.success(res.message, 'Success');
          this.getAllTouchpoints();
          this.collapseCreateTouchpoint.hide();
        }, error: (err) => { console.log(err) }, complete: () => { }
      });
    }
    else {
      this.createTouchPointForm.markAllAsTouched();
    }
   }

   else if(this.btnName==='Update touchpoint'){
    if (this.createTouchPointForm.valid) {
      const form = this.createTouchPointForm.value;
      const obj = {
        touchpoints:form.touchpoints,
        loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      }

      this.service.updateToucpointById(this.touchpointId,obj).subscribe({
        next: (res) => {
          this.tostr.success(res.message, 'Success');
          this.getAllTouchpoints();
          this.collapseCreateTouchpoint.hide();
        }, error: (err) => { console.log(err) }, complete: () => { }
      });
    }
    else {
      this.createTouchPointForm.markAllAsTouched();
    }
   }
  }

  onEdit(touchpointId:any){
    this.btnName='Update touchpoint';
    this.touchpointId=touchpointId;
    this.service.getTouchpointById(touchpointId).subscribe({next:(res)=>{
      const form=res.data;
      this.createTouchPointForm.patchValue({
        touchpoints:form.touchpoints,
        created_date:form.created_date
      });
    },error:(err)=>{console.log(err);},complete:()=>{}});

    const touchPointRef = document.getElementById('touchpoint')!;
    this.collapseCreateTouchpoint = new bootstrap.Collapse(touchPointRef);
    this.collapseCreateTouchpoint.show();
  }

  onDelete(touchpointId:any){
    this.collapseCreateTouchpoint.hide();
    this.service.deleteTouchpointById(touchpointId).subscribe({next:(res)=>{
      this.tostr.success(res.message,'Success');
      this.getAllTouchpoints();
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

}
