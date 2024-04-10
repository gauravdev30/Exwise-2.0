import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectComponent } from '../../../../exwise/create-project/create-project.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrl: './createclient.component.css'
})
export class CreateclientComponent {
  showcontainer:string='';
  createForm!: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CreateProjectComponent>,private fb: FormBuilder,private api:ApiService ) {
    if (data.name!==null) {
      this.showcontainer = data.name;
    }
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      client_Name: ['', Validators.required],
      contact_Person: ['', Validators.required],
      contact_Email: [''],
      contact_Phone: [''],
      additional_Information: [''],
      industry: [''],
      location: [''],
      loggedUserId:'3'
    });
  }

  createProject() {
    if(this.createForm.valid){
      const form = this.createForm.value;
      const obj ={
        client_Name:form.client_Name,
        contact_Person:form.contact_Person, 
        contact_Email: form.contact_Email,
        contact_Phone: form.contact_Phone,
        additional_Information:form.additional_Information,
        industry:form.industry,
        location:form.location,
        loggedUserId: "3"
      }

      console.log(obj);
      this.api.createClient(obj).subscribe((res)=>{
        console.log(res.message);
      })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
