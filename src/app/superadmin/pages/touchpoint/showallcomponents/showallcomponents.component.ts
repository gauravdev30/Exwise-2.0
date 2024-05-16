import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TouchpointService } from '../../../services/touchpoint.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-showallcomponents',
  templateUrl: './showallcomponents.component.html',
  styleUrl: './showallcomponents.component.css'
})
export class ShowallcomponentsComponent implements OnInit {
  allComponents: any;
  collapseCreateComponent: any;
  createComponentForm!: FormGroup;
  btnName:any='Create component';
  componentId:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShowallcomponentsComponent>,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private service: TouchpointService,) { }

  ngOnInit(): void {
    this.getAllComponents();
    this.createComponentForm = this.fb.group({
      componentName: ['', Validators.required],
      weightage: [''],
      description: [''],
      loggedUserId: [''],
    });
  }

  getAllComponents() {
    this.service.getAllComponents().subscribe({
      next: (res) => {
        this.allComponents = res.data;
      }, error: (err) => {
        console.log(err)
      }, complete: () => { }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  toggleComponentForm() {
    this.btnName='Create component'
    const componentRef = document.getElementById('component')!;
    this.collapseCreateComponent = new bootstrap.Collapse(componentRef);
    this.collapseCreateComponent.toggle();
  }

  createComponent() {
   if(this.btnName==='Create component'){
    if (this.createComponentForm.valid) {
      const form = this.createComponentForm.value;
      const obj = {
        componentName: form.componentName,
        weightage: form.weightage,
        description: form.description,
        loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      }

      this.service.createComponentForReality(obj).subscribe({
        next: (res) => {
          this.tostr.success(res.message, 'Success');
          this.getAllComponents();
          this.collapseCreateComponent.hide();
        }, error: (err) => { console.log(err) }, complete: () => { }
      });
    }
    else {
      this.createComponentForm.markAllAsTouched();
    }
   }
   else if(this.btnName==='Update component'){
    if (this.createComponentForm.valid) {
      const form = this.createComponentForm.value;
      const obj = {
        componentName: form.componentName,
        weightage: form.weightage,
        description: form.description,
        loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      }

      this.service.updateComponentForRealityById(this.componentId,obj).subscribe({
        next: (res) => {
          this.tostr.success(res.message, 'Success');
          this.getAllComponents();
          this.collapseCreateComponent.hide();
        }, error: (err) => { console.log(err) }, complete: () => { }
      });
    }
    else {
      this.createComponentForm.markAllAsTouched();
    }
   }
  }

  onEdit(componentId: any) {
    this.btnName='Update component';
    this.componentId=componentId;
    this.service.getComponentForRealityById(componentId).subscribe({
      next: (res) => {
        const form = res.data;
        this.createComponentForm.patchValue({
          componentName: form.componentName,
          weightage: form.weightage,
          description: form.description,
        })
      }, error: (err) => { console.log(err) }, complete: () => { }
    })

    const componentRef = document.getElementById('component')!;
    this.collapseCreateComponent = new bootstrap.Collapse(componentRef);
    this.collapseCreateComponent.show();
  }

  onDelete(componenetId: any) {
    this.collapseCreateComponent.hide();
    this.service.deleteComponentForRealityById(componenetId).subscribe({
      next: (res) => {
        this.tostr.success(res.message, 'Success');
        this.getAllComponents();
      }, error: (err) => { console.log(err) }, complete: () => { }
    })
  }


  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
