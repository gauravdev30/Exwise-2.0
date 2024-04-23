import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  showcontainer: string = '';
  userId: any;
  createForm!: FormGroup;
  buttonName: any = 'Create'
constructor(private dialogRef: MatDialogRef<CreateUserComponent>,@Inject(DIALOG_DATA) public data: {name: string,id:number}, 
private router:Router,private route: ActivatedRoute,private api:ProjectService,
 private fb: FormBuilder,){
  if (data.name !== null) {
    this.showcontainer = data.name;
    if (data.id > 0) {
      this.userId = data.id;
      console.log(this.userId);
    }
  }
 }
ngOnInit(): void {
    console.log(this.data);
      this.createForm = this.fb.group({
        first_Name: ['', Validators.required],
        last_Name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contactNumber: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
        city: [''],
        type_of_user: [''],
      
    }); 
    if (this.userId > 0) {
      this.buttonName = 'Update'
      this.getUserById();
    console.log(this.userId);
    
    }
}
getUserById(){
  this.api.getByUserID(this.userId).subscribe((res) => {
    console.log(res);
    
    if (res.success) {
      const clientData = res.data;
      console.log(res.data)
      this.createForm.patchValue({
        first_Name: clientData.first_Name,
        last_Name: clientData.last_Name,
        email: clientData.email,
        contactNumber: clientData.contactNumber,
        city: clientData.city
      });
    }
  });
}
createProject() {
  if (this.buttonName === 'Create') {
    if (this.createForm.valid) {
      const form = this.createForm.value;
      const obj = {
        address: "",
        birthDate:new Date(),
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        country: "INDIA",
        email: form.email,
        first_Name: form.first_Name,
        gender: "male",
        grade: "string",
        jobType: "string",
        last_Name: form.last_Name,
        loggedUserId:  JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).id,
        name: "Ratan",
        otp: "string",
        password: "string@123",
        preferred_Communication_Channels: "string",
        profile_image: form.profile_image,
        role: "role",
        state: "string",
        tenure: "string",
        type_of_user: form.type_of_user,
        verified: true,
        workLocation: "string"
      }

      console.log(obj);
      this.api.createUser(obj).subscribe((res) => {
        if (res.success) {
          // this.toastr.success(res.message);
          this.onClose();
          this.createForm.reset();
          window.location.reload();
        }
      })
    }
    else {
      this.createForm.markAllAsTouched();
    }
  }
  else if(this.buttonName==='Update'){
    if(this.createForm.valid){
      const form = this.createForm.value;
      const obj = {
        address: "",
        birthDate:new Date(),
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        country: "INDIA",
        email: form.email,
        first_Name: form.first_Name,
        gender: "male",
        grade: "string",
        jobType: "string",
        last_Name: form.last_Name,
        loggedUserId:  JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).id,
        name: "Ratan",
        otp: "string",
        password: "string@123",
        preferred_Communication_Channels: "string",
        profile_image: form.profile_image,
        role: "role",
        state: "string",
        tenure: "string",
        type_of_user: form.type_of_user,
        verified: true,
        workLocation: "string"
      }

      console.log(obj);
      this.api.getByUpdateUserID(this.userId,obj).subscribe((res:any)=>{
        if(res.success){
          console.log(res)
          // this.toastr.success(res.message);
          this.createForm.reset();
          this.onClose();
        }
      })
    }
  }
}
onClose(): void {
  this.dialogRef.close();
}
updateUser(){}
isNumber(evt: any) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
}
