import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit {
  showContainer:number=1;
  meetingForm!: FormGroup;
  vissible: boolean = true;
  selectedUserForInfo:any;
  isVissible: boolean = false;
  name:any;
  dataId: any;
  index: any;
  users:any[]=['Gaurav','soham','Gotu','Yogesh','Gaurav1','soham1','Gotu1','Yogesh1','Gaurav2','soham2','Gotu2','Yogesh2','Hari','Rohit','Virat','Vijay','Sai']
  clientId: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CreateGroupComponent>,private toaster:ToastrService,private service:ProjectService){}
  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

  selectedUsers: string[] = []; 

  toggleSelectedUser(user: string) {
    if (this.selectedUsers.includes(user)) {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    } else {
      this.selectedUsers.push(user);
    }
  }

  onNext(){
    this.showContainer=2;
  }
  loadDataForSecondContainer() {
    this.selectedUserForInfo = ['User1', 'User2', 'User3'];
     this.selectedUserForInfo=this.selectedUsers;
  }

  onBack(){
    this.showContainer=1;
    this.data.name='createGroup'
  }

  createGroup(){
    const form=this.meetingForm.value;
    const obj={
      
      clientId: sessionStorage.getItem("ClientId"),
      createdDate: new Date(),
      criteria:form.criteria,
      description: form.description,
     
      loggedUserId: JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).id,
      title: form.title
    }
    this.service.createGroup(obj).subscribe({next:(res:any)=>{console.log(res);
      this.meetingForm.reset();
      document.getElementById('closeOffCanvas')?.click();
      this.toaster.success('Group Created Successfully');
    },error:(err:any)=>{console.log(err);
    },complete:()=>{}})
  }
  
  onUpdate(id: any) {
    this.index = id;
    this.vissible = false;
    this.isVissible = true;
    this.service.getMeetingByID(id).subscribe((res: any) => {
      this.dataId = res.data;
      const offcanvasElement = document.getElementById('offcanvasRight3');
      const offcanvas = new (window as any).bootstrap.Offcanvas(
        offcanvasElement
      );
      offcanvas.toggle();
      this.meetingForm.patchValue({
        active: true,
        name: this.dataId.name,
        employeeId: parseInt(this.dataId.employeeId),
        contact: this.dataId.contact,
      });
    });
  }


  updateMeeting(){
    if(this.meetingForm.valid){
      const form=this.meetingForm.value;
      const obj={
        active: true,
        clientId: 0,
        consultantId: 0,
        createdDate: new Date(),
        description: form.description,
        id: 0,
        location: "nashik",
        loggedUserId: 0,
        meetingDate: form.meetingDate,
        meeting_link: form.meeting_link,
        status: "active",
        timeDuration: form.timeDuration,
        title: form.title,
        userId: form.userId  
      }
      const id=this.clientId
      this.service.updateMeeting(obj,id).subscribe({next:(res:any)=>{console.log(res);
      },error:()=>{},complete:()=>{}})
    }else{}
  }
  

}
