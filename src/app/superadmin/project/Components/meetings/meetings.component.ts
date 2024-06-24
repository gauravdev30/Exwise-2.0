import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ScheduleComponent } from './schedule/schedule.component';
import { DateAdapter } from '@angular/material/core';
import { CreateGroupComponent } from './create-group/create-group.component';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { DatePipe } from '@angular/common';
import { DeleteComponent } from '../../../pages/delete/delete.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css',
  providers:[DatePipe]
})
export class MeetingsComponent implements OnInit {
  filterToggle: boolean = false;
  interviewCount: any;
  columnSelection: any = '';
  filterTable: any = '';
  dept: any[] = [];
  deptToFilter: any[] = [];
  highlightDate: MatCalendarCellCssClasses = [];
  isDataLoaded: Observable<any> = new Observable<any>();
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
  highlightedDates: Date[] = [new Date('2024-04-15'), new Date('2024-04-20')];
  cardsCircle2: any;
  meetingDay: any;
  meetingMonth: any;
  meetingDate2: any;
  meetingForm!: FormGroup;
  allUser: any;
  clientId: any;
  selectedOption: any = '';
  reminders:any;
  form!: FormGroup;
  isLoading:boolean=false;
  isLoadingReminder:boolean=false;
  allDates: any;
  constructor(private service: ProjectService,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialog,
    private toaster: ToastrService,
  private searchservice:SearchService,
  private datePipe: DatePipe) {

  }


  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  ngOnInit(): void {
    
    const id = sessionStorage.getItem("ClientId")

    this.meetingForm = this.formBuilder.group({
      selectedOption: [''],
      // active: [true],
      // clientId: [0],
      // consultantId: [0],
      createdDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // location: ['string'],
      meetingDate: ['', [Validators.required]],
      meeting_link: ['', [Validators.required]],
      // status: ['string'],
      timeDuration: [''],
      title: ['', [Validators.required]],
      userId: ['', [Validators.required]]
    });

    this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUser = res.data;
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }

    })

    this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.getAllOneToOneInterviews();
        } else {
          if (res.success) {
            this.cardsCircle2 = res.data;
          } else {
            this.cardsCircle2 = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });

    this.getOnetoOneInterviewCount()
    this.getAllOneToOneInterviews();
    const currentDate = new Date();
    this.getAllMeetingDatesByMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  }


  getAllOneToOneInterviews(){
    this.isLoading=true
    this.service.getOneToOneInterview(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cardsCircle2 = res.data;
        this.isLoading=false;
        console.log(this.cardsCircle2.meetingDate)
        this.meetingDate2 = dayjs(this.cardsCircle2.meetingDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
        this.meetingDay = dayjs(this.meetingDate2).format('DD');
        this.meetingMonth = dayjs(this.meetingDate2).format('MMMM');
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }
    })
  }


  modelChangeFn(event: any) {

  }
  openMeeting(link: string) {
    window.open(link, '_blank');
  }
  getAllMeeting() {
    this.service.getAllOnetoOneInterview().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUser = res.data;
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }

    })
  }

  getOnetoOneInterviewCount(){
    this.service.getOneToOneInterviewCountByUserId(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next:(res)=>{
        this.interviewCount=res.data;
      },error:(err)=>{console.log(err)},complete:()=>{}
    })
  }


  createMeeting() {
    console.log(this.meetingForm.value);

    if (this.meetingForm.value) {

      const form = this.meetingForm.value;
      const obj = {
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

      const id = this.clientId
      this.service.createMeeting(obj).subscribe({
        next: (res: any) => {
          console.log(res);
          this.meetingForm.reset();
        }, error: () => { }, complete: () => { }
      })
    } else {
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
  updateMeeting() {
    if (this.meetingForm.valid) {
      const form = this.meetingForm.value;
      const obj = {
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
      const id = this.clientId
      this.service.updateMeeting(obj, id).subscribe({
        next: (res: any) => {
          console.log(res);
        }, error: () => { }, complete: () => { }
      })
    } else { }
  }

  getOneToOneInterviewByStatus(status: any) {
    this.service.getOneToOneInterviewByStatus(status,JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        this.cardsCircle2 = res.data;
      }, error: (err: any) => { console.log(err) }, complete: () => { }
    });
  }


  onDeleteInterview(meet: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to delete the records for ${meet?.clientName} ?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) =>{
      if (result.action == 'ok') {
        this.service.deleteInterviewOneToOne(meet.id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toaster.success(res.message, 'Success');
            this.getAllMeeting();
          }, error: (err: any) => {
            console.log(err);
          }, complete: () => { }
        })
      }
    })
    
  }
  hideOffCanvas() { }
  cardsCircle: any[] = [
    { name: 'Schedule', count: '2' },
    { name: 'Reschedule', count: '2' },
    { name: 'Cancel', count: '2' }
  ]


  formatTime(time: string): string | null {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return this.datePipe.transform(date, 'hh:mm a');
  }

  getAllMeetingDatesByMonth(month: number, year: number): void {
    this.service.getMeetingsDateByMonth(month, year, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        this.allDates = res.data;
        console.log(res.data);
        this.isDataLoaded = new Observable((subscriber) => {
          subscriber.next(this.allDates);
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  onDateSelected(selectedDate: Date | null): void {
    console.log('printing')
    console.log(selectedDate)
    if (selectedDate) {
      this.selected = selectedDate;
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      this.getEventOnDateByUserID(formattedDate);
    }
  }

  onMonthSelected(event: Date): void {
    this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
  }

  onYearSelected(event: Date): void {
    // this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
  }


  getEventOnDateByUserID(date:any){
    this.service.getEventOnDateByUserID(date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({next:(res)=>{
      this.reminders=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  openPopup(): void {
    const dailogRef = this.dialog.open(ScheduleComponent, {
      width: '800px',
      height: '500px',
      disableClose: true,
    });
    dailogRef.afterClosed().subscribe(()=>{
      this.getAllOneToOneInterviews();
    })
  }
  createGroups() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '1100px',
      height: '700px',
      disableClose: true,
      data: { name: 'createGroup' }
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getAllFocusGroup();
    })

  }

  editMetting(id: any) {
    console.log(id)
    this.dialog.open(ScheduleComponent, {
      width: '800px',
      height: '500px',
      disableClose: true,
      data: { id: id }
    });
  }

  openMeetingInBrowser(link:string){
    window.open(link, '_blank');
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    let isHighlighted = false;
    // this.isDataLoaded.subscribe((val) => {
      isHighlighted = this.allDates.some(
        (data: any) =>
          dayjs(data).format('DD/MM/YYYY') ==
          dayjs(date).format('DD/MM/YYYY')
      );
    // });
    return isHighlighted ? 'highlightDate' : '';
  };

}