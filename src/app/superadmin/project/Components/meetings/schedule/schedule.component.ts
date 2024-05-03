import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
 dept: any[] = [];
 dataId: any;
 deptDetails: any;
 emp: any;
 index: any;
 vissible: boolean = true;
 isVissible: boolean = false;
 submitted: boolean = false;
 meetingForm!: FormGroup;
clientId:any;
allUser:any;
constructor(private service:ProjectService,
  private formBuilder: FormBuilder,
  private dateAdapter: DateAdapter<Date>,
  private dialog:MatDialog,
  private dialogRef: MatDialogRef<ScheduleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
private toster:ToastrService){
}

ngOnInit(): void {
const id=sessionStorage.getItem("ClientId")
 this.meetingForm = this.formBuilder.group({
   selectedOption:[''],
   // active: [true],
   // clientId: [0],
   // consultantId: [0],
   createdDate: ['',[Validators.required]],
   description: ['',[Validators.required]],
   // location: ['string'],
   meetingDate: ['',[Validators.required]], 
   meeting_link: ['',[Validators.required]],
   // status: ['string'],
   timeDuration: [''],
   title: ['',[Validators.required]],
   userId: ['',[Validators.required]]
 });

 this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe({next:(res:any)=>{console.log(res);
  this.allUser=res.data;
  },error:(err:any)=>{console.log(err);
  },complete:()=>{}
  
  });

  if (this.data && this.data.id){
    this.getInterviewById(this.data.id);
    this.vissible=false;
    this.isVissible=true;
  }
  }
createMeeting(){
 console.log(this.meetingForm.value);
 
if(this.meetingForm.value){
 
 const form=this.meetingForm.value;
 const obj={
   active: true,
   clientId: sessionStorage.getItem("ClientId"),
   consultantId: 0,
   createdDate: new Date(),
   description: form.description,
   id: 0,
   location: "nashik",
   loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
   meetingDate: form.meetingDate,
   meeting_link: form.meeting_link,
   status: "active",
   timeDuration: form.timeDuration,
   title: form.title,
   userId: form.userId  
 }
 console.log(obj);
 
 const id=this.clientId
 this.service.createMeeting(obj).subscribe({next:(res:any)=>{console.log(res);
  this.toster.success(res.message,'Success');
  this.onClose();
  window.location.reload();
   this.meetingForm.reset();
 },error:()=>{},complete:()=>{}})
}else{
 this.meetingForm.markAllAsTouched();
}
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
     clientId: 1,
     consultantId: 0,
     createdDate: new Date(),
     description: form.description,
     id: 1,
     location: "nashik",
     loggedUserId: 1,
     meetingDate: form.meetingDate,
     meeting_link: form.meeting_link,
     status: "active",
     timeDuration: form.timeDuration,
     title: form.title,
     userId: form.userId  
   }
   const id=this.data.id
   this.service.updateMeeting(obj,id).subscribe({next:(res:any)=>{console.log(res);
    this.toster.success(res.message, 'Success');
    this.onClose();
   },error:()=>{},complete:()=>{}})
 }else{}
}

onClose(): void {
  this.dialogRef.close();
}

getInterviewById(id:any){
  this.service.getOneToOneInterviewById(id).subscribe((res)=>{
    if (res.success) {
      const form = res.data; 
      this.meetingForm.patchValue({
        selectedOption: form.selectedOption,
        createdDate: form.createdDate,
        description: form.description,
        meetingDate: form.meetingDate,
        meeting_link: form.meeting_link,
        timeDuration: form.timeDuration,
        title: form.title,
        userId: form.userId
      });
    }
  })
}

}
