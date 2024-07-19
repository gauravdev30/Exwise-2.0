import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectComponent } from '../../exwise/create-project/create-project.component';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrl: './createclient.component.css'
})
export class CreateclientComponent {
  showcontainer: string = '';
  clientId: any;
  createForm!: FormGroup;
  buttonName: any = 'Create'
consultants:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateProjectComponent>, private fb: FormBuilder, private api: ApiService, private toastr: ToastrService) {
    if (data.name !== null) {
      this.showcontainer = data.name;
      if (data.clientId > 0) {
        this.clientId = data.clientId;
        console.log(this.clientId);
      }
    }
  }

  ngOnInit() {
    this.api.getCousultants().subscribe((res:any)=>{console.log(res);
      this.consultants=res.data
    })
    this.createForm = this.fb.group({
      client_Name: ['', Validators.required],
      contact_Person: ['', Validators.required],
      contact_Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact_Phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      additional_Information: [''],
      industry: ['',Validators.required],
      location: [''],
      loggedUserId: '',
      status:[''],
      consultantId:['']
    });
    if (this.clientId > 0) {
      this.buttonName = 'Update'
      this.getClientById();
    }
   
  }

  createProject() {
    if (this.buttonName === 'Create') {
      if (this.createForm.valid) {
        const form = this.createForm.value;
        const obj = {
          client_Name: form.client_Name,
          contact_Person: form.contact_Person,
          contact_Email: form.contact_Email,
          contact_Phone: form.contact_Phone,
          additional_Information: form.additional_Information,
          industry: form.industry,
          location: form.location,
          consultantId:form.consultantId,
          status:form.status,
          loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
        }

        console.log(obj);
        this.api.createClient(obj).subscribe((res) => {
          if (res.success && res.message==='Client registered successfully...!!') {
            this.toastr.success(res.message);;
            this.onClose();
            window.location.reload();
            this.createForm.reset();
          }
          else if(res.message==='Mobile number is already registered.'){
            this.toastr.error(res.message);
          }
          else if(res.message==='Email number is already registered.'){
            this.toastr.error('Email ID is already registered.');
          }
        })
      }
      else {
        this.createForm.markAllAsTouched();
        this.toastr.error('Please enter valid details');
      }
    }
    else if(this.buttonName==='Update'){
      if(this.createForm.valid){
        const form = this.createForm.value;
        const obj = {
          client_Name: form.client_Name,
          contact_Person: form.contact_Person,
          contact_Email: form.contact_Email,
          contact_Phone: form.contact_Phone,
          additional_Information: form.additional_Information,
          industry: form.industry,
          location: form.location,
          loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
          id:this.clientId,
          status:form.status,
          consultantId:form.consultantId,
        }

        console.log(obj);
        this.api.updateClientById(this.clientId,obj).subscribe((res)=>{
          if(res.success){
            console.log(res)
            this.toastr.success(res.message);
            this.createForm.reset();
            window.location.reload();
            this.onClose();
          }
        })
      }
    }
  }



  getClientById() {
    this.api.getClientById(this.clientId).subscribe((res) => {
      if (res.success) {
        const clientData = res.data;
        const selectedConsultant = this.consultants.find((consultant: any) => consultant.id === clientData.consultantId);
        console.log('Selected Consultant:', selectedConsultant);
        
        console.log(res.data)
        this.createForm.patchValue({
          id:this.clientId,
          client_Name: clientData.clientName,
          contact_Person: clientData.contactPerson,
          contact_Email: clientData.contactEmail,
          contact_Phone: clientData.contactPhone,
          additional_Information: clientData.additional_Information,
          industry: clientData.industry,
          location: clientData.location,
          status: clientData.status,
       consultantId: selectedConsultant ? selectedConsultant.id : ''
        });
      }
    });
  }

  onUpdate(){

  }

  onClose(): void {
    this.dialogRef.close();
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
