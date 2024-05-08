import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  items:any;
  isPopupOpen: boolean=false;
  surveyList:any;
  btnName:any='Create User';
  createForm!:FormGroup;
  

  constructor(private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(DIALOG_DATA) public data: {name: string,id:number},
     private router:Router,
     private route: ActivatedRoute,
     private service:ProjectService,
    private fb:FormBuilder,
  private toster:ToastrService){}


  ngOnInit(): void {
    this.createForm = this.fb.group({
        address: ['',Validators.required],
        birthDate:[''],
        city: [''],
        client_id: [''],  
        contactNumber: ['',[Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
        country: [''],
        email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        gender: ['',Validators.required],
        grade: [''],
        jobType: ['',Validators.required],
        loggedUserId: [''],
        name: ['',Validators.required],
        // otp: [''],
        password: [''],
        // preferred_Communication_Channels: [''],
        // profile_image: [''],
        // role: [''],
        // state: [''],
        // tenure: [''],
        type_of_user: [''],
        verified: [''],
        workLocation: ['']
    });

    if(this.data?.name==='edit-user' && this.data.id!==null){
      this.btnName='Update User'
      this.onEdit();
    }
  }

  createUser(){
   if(this.btnName==='Create User'){
    console.log('Called')
    if(this.createForm.valid){
      const form=this.createForm.value;
      const obj = {
        address: form.address,
        birthDate: new Date(),
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        // country: "India",
        email: form.email,
        gender: form.gender,
        grade: "A",
        jobType: form.jobType,
        loggedUserId: 1,
        name: form.name,
        // otp: "string",
        password: "string",
        // preferred_Communication_Channels: "string",
        // profile_image: "string",
        // role: "string",
        // state: "Maharshtra",
        // tenure: "string",
        type_of_user: 2,
        verified: true,
        workLocation: form.workLocation

      }
      this.service.createUser(obj).subscribe((res)=>{
        if(res.success){
          this.toster.success(res.message,'Success');
          this.onClose();
        }
      })
    }
    else{
      this.createForm.markAllAsTouched();
    }
   }
   else if(this.btnName==='Update User'){
    console.log('Update working')
    if(this.createForm.valid){
      const form=this.createForm.value;
      const obj = {
        address: form.address,
        birthDate: new Date(),
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        // country: "India",
        email: form.email,
        gender: form.gender,
        grade: "A",
        jobType: form.jobType,
        loggedUserId: 1,
        name: form.name,
        // otp: "string",
        password: "string",
        // preferred_Communication_Channels: "string",
        // profile_image: "string",
        // role: "string",
        // state: "Maharshtra",
        // tenure: "string",
        type_of_user: 2,
        verified: true,
        workLocation: form.workLocation

      }
      this.service.updateUser(this.data.id,obj).subscribe((res)=>{
        if(res.success){
          this.toster.success(res.message,'Success');
          this.onClose();
        }
      })
    }
    else{
      this.createForm.markAllAsTouched();
    }
   }
  }

  onClose(): void {
    this.dialogRef.close();
  }


  next(){
    this.dialogRef.close();
  }

  onEdit(){
    this.service.getByUserID(this.data.id).subscribe((res)=>{
        const form = res;
        this.createForm.patchValue({
          address: form.address,
          birthDate:form.birthDate,
          city: form.city,
          client_id: sessionStorage.getItem("ClientId"),
          contactNumber: form.contactNumber,
          // country: "India",  
          email: form.email,
          gender: form.gender,
          grade: "A",
          jobType: form.jobType,
          loggedUserId: 1,
          name: form.name,
          // otp: "string",
          password: "string",
          // preferred_Communication_Channels: "string",
          // profile_image: "string",
          // role: "string",
          // state: "Maharshtra",
          // tenure: "string",
          type_of_user: 2,
          verified: true,
          workLocation: form.workLocation
        })
    })
  }
  
}
