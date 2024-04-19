import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import dayjs from 'dayjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { PeopleComponent } from '../../people/people.component';
@Component({
  selector: 'app-focusgroup',
  templateUrl: './focusgroup.component.html',
  styleUrl: './focusgroup.component.css'
})
export class FocusgroupComponent implements OnInit{
  filterToggle: boolean = false;
  columnSelection: any = '';
  filterTable: any = '';
  dept: any[] = [];
  deptToFilter: any[] = [];
  dataId: any;
  deptDetails: any;
  emp: any;
  index: any;
  vissible: boolean = true;
  isVissible: boolean = false;
  submitted: boolean = false;
  departmentForm!: FormGroup;
  p: number = 1;
  a: number = 1;
  itemPerPage: number = 10;
  sortDir: any = 'asc';
  totalItems: number = 0;
  selected: Date | null | undefined;
  cardsCircle2:any;
  meetingDay: any;
  meetingMonth: any;
  meetingDate2:any; 
  meetingForm!: FormGroup;
allUser:any;
clientId:any;
constructor(private service:ProjectService,private formBuilder: FormBuilder,  private dialog: MatDialog,  private router: Router, private route: ActivatedRoute,){}
ngOnInit(): void {
const id=sessionStorage.getItem("ClientId")
   
  this.meetingForm = this.formBuilder.group({
    expectedSessionDuration: ['',[Validators.required]],
    sessionDuration: ['',],
    focusGroupId: ['',[Validators.required]],
    description: ['',[Validators.required]],
    meetingDate: ['',[Validators.required]], 
    meeting_link: ['',[Validators.required]],
   
  });

this.service.focusgroup().subscribe({next:(res:any)=>{console.log(res);
this.allUser=res.data;
console.log(this.allUser);

},error:(err:any)=>{console.log(err);
},complete:()=>{}

})


    this.service.getOneToOneInterview().subscribe({next:(res:any)=>{console.log(res);
this.cardsCircle2=res.data;
this.meetingDate2=dayjs(this.cardsCircle2.meetingDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
this.meetingDay = dayjs(this.meetingDate2).format('DD');
    this.meetingMonth = dayjs(this.meetingDate2).format('MMMM');
    },error:(err:any)=>{console.log(err);
    },complete:()=>{}})
}
modelChangeFn(event: any) {

}
openMeeting(link: string) {
  window.open(link, '_blank');
}
openPopup(id:any): void {
  const dialogRef = this.dialog.open(PeopleComponent, {
    width: '750px',
    height: '500px',
    disableClose: true,
    data: { name: 'People List',id:id },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The popup was closed');
    // this.router.navigate(['./'], {
    //   relativeTo: this.route,
    // });
  });
}

createMeeting(){
if(this.meetingForm.value){
  const form=this.meetingForm.value;
  const obj={
    active: true,
    description: form.description,
    location: "nashik",
    meetingDate: form.meetingDate,
    meeting_link: form.meeting_link,
    expectedSessionDuration:form.expectedSessionDuration,
    focusGroupId: form.focusGroupId,
    sessionDuration:form.sessionDuration,
    status: "active"
  }
  console.log(obj);
  this.service.focusGroupMeeting(obj).subscribe({next:(res:any)=>{console.log(res);
  },error:()=>{},complete:()=>{}})
}else{
  
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
  hideOffCanvas(){}
  cardsCircle:any[]=[
    { name: 'Schedule', count: '2' },
    { name: 'Reschedule', count: '2' },
    { name: 'Cancel', count: '2' }
  ]

  // cardsCircle2:any[]=[
  //   { name: 'Schedule', count: '2' },
  //   { name: 'Reschedule', count: '2' },
  //   { name: 'Cancel', count: '2' },
  //   { name: 'Cancel', count: '2' }
  // ]
  reminders:any[]=[
    { title: 'Schedule', count: '2' },
    { title: 'Reschedule', count: '2' },
    { title: 'Cancel', count: '2' },
    { title: 'Cancel', count: '2' },
  ]
}
