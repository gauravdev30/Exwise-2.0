import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import dayjs from 'dayjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { PeopleComponent } from '../../people/people.component';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
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
  showcontainer:number=2;
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
  selectedUsers: string[] = [];
allUser:any;
clientId:any;

toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

constructor(private service:ProjectService,private formBuilder: FormBuilder, private toaster:ToastrService, private dialog: MatDialog,  private router: Router, private route: ActivatedRoute,){}
ngOnInit(): void {
const id=sessionStorage.getItem("ClientId")
   
  this.meetingForm = this.formBuilder.group({
  
    Title:[''],
    criteria:[''],
    description: ['',[Validators.required]],
  
   
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

onSelectionChange(event: Event) {
  console.log('called')
  const target = event.target as HTMLSelectElement;
  const selectedOptions = Array.from(target.selectedOptions).map(option => option.value);
  this.selectedUsers = selectedOptions;
}
onDeleteFocusGroup(id:any){
  this.service.onDeleteFocusGroup(id).subscribe({next:(res:any)=>{console.log(res);
 
      },error:(err:any)=>{console.log(err);
      },complete:()=>{}})
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