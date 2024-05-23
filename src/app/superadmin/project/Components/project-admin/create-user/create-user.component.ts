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
  isLoading:boolean=false;

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
        tenure:[''],
        contactNumber: ['',[Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
        email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        gender: ['',Validators.required],
        jobType: ['',Validators.required],
        name: ['',Validators.required],
        type_of_user: [''],
   
    });

    if(this.data?.name==='edit-user' && this.data.id!==null){
      this.btnName='Update User'
      this.onEdit();
    }
  }

  createUser(){
  
   if(this.btnName==='Create User'){
    console.log(this.createForm.value);
    
    console.log('Called')
    if(this.createForm.valid){
      this.isLoading=true;
      const form=this.createForm.value;
      const obj = {
        address: form.address,
        birthDate: form.birthDate,
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        email: form.email,
        gender: form.gender,
        grade: "A",
        jobType: form.jobType,
        loggedUserId: JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).loggedUserId,
        name: form.name,
        password: "string@123",
        type_of_user: form.type_of_user,
        verified: true,
        workLocation: ''

      }
      console.log(obj);
      
      this.service.createUser(obj).subscribe((res)=>{
        if(res.success){
          this.isLoading=false;
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
      this.isLoading=true;
      const form=this.createForm.value;
      const obj = {
        address: form.address,
        birthDate: form.birthDate,
        city: form.city,
        client_id: sessionStorage.getItem("ClientId"),
        contactNumber: form.contactNumber,
        email: form.email,
        gender: form.gender,
        grade: "A",
        jobType: form.jobType,
        loggedUserId: JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).loggedUserId,
        name: form.name,
        password: "string@123",
        type_of_user: form.type_of_user,
        verified: true,
        workLocation: ''

      }
      this.service.updateUser(this.data.id,obj).subscribe((res)=>{
        if(res.success){
          this.isLoading=false;
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
    this.isLoading=true;
    this.service.getByUserID(this.data.id).subscribe((res)=>{
      this.isLoading=false;
        const form = res;
        this.createForm.patchValue({
          address: form.address,
          birthDate:form.birthDate,
          city: form.city,
          client_id: sessionStorage.getItem("ClientId"),
          contactNumber: form.contactNumber,
        
          email: form.email,
          gender: form.gender,
          grade: "A",
          jobType: form.jobType,
          loggedUserId: 1,
          name: form.name,
          
          password: "string",
         
          tenure: form.tenure,
          type_of_user: form.type_of_user,
          verified: true,
        
        })
    })
  }


  file: any;
isSelectedFileValid: boolean = false;
formData: any;
onDrop(event: any) {
  event.preventDefault();
  [...event.dataTransfer.items].forEach((item, i) => {
    // If dropped items aren't files, reject them
    if (item.kind === 'file') {
      this.file = item.getAsFile();
      this.validateFile();
    }
  });
  document.getElementById('dropzone')!.style.background = 'white';
}
validateFile() {
  if (
    ![
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ].includes(this.file.type)
  ) {
    this.isSelectedFileValid = false;
  } else {
    this.isSelectedFileValid = true;
    const formData = new FormData();
    formData.append('file', this.file);
    this.formData = formData;
  }
}

onDragOver(event: any) {
  event.stopPropagation();
  event.preventDefault();
  document.getElementById('dropzone')!.style.background = '#c8dadf';
}
ondragleave(event: any) {
  document.getElementById('dropzone')!.style.background = 'white';
}

uploadFile() {
  
}
onFileBrowse(event: any) {
  const inputElement = event.target as HTMLInputElement;
  this.file = inputElement?.files?.[0]; // Get the selected file
  if (this.file) {
    this.validateFile();
  }
}
  
}
