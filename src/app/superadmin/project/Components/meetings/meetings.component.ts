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
  providers: [DatePipe]
})
export class MeetingsComponent implements OnInit {
  filterToggle: boolean = false;
  interviewCount: any;
  schedulecount:number = 0;
  reschedulecount:number = 0;
  cancelcount:number = 0;
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
  allUser: any;
  selectedCard:any = "schedule"
  clientId: any;
  selectedOption: any = '';
  reminders: any;
  form!: FormGroup;
  isLoading: boolean = false;
  isLoadingReminder: boolean = false;
  allDates: any;
  constructor(private service: ProjectService,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private searchservice: SearchService,
    private datePipe: DatePipe) {

  }


  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  ngOnInit(): void {

    const id = sessionStorage.getItem("ClientId")

    // this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     this.allUser = res.data;
    //   }, error: (err: any) => {
    //     console.log(err);
    //   }, complete: () => { }

    // })

    this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.getOneToOneInterviewByStatus('schedule');
        } else {
          if (res.success) {
            this.cardsCircle2 = res.data;
          } else {
            this.cardsCircle2 = [];
          }
        }
      },
      error: (err: any) => { },
      complete: () => { },
    });

    this.getOneToOneInterviewByStatus('schedule');
    const currentDate = new Date();
    this.getAllMeetingDatesByMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  getOneToOneInterviewByStatus(status: any) {
    this.isLoading=true;
    this.selectedCard=status;
    const formattedDate = this.formatDate(new Date());
    this.service.getOneToOneInterviewByStatus(formattedDate, status, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        this.cardsCircle2 = res.data.sortedList;
        this.schedulecount = res.data.schedule;
        this.reschedulecount = res.data.reSchedule;
        this.cancelcount = res.data.cancel
        this.isLoading=false;
      }, error: (err: any) => { console.log(err) }, complete: () => { }
    });
  }


  onDeleteInterview(meet: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to delete the records for ${meet?.title} ?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.service.softDeleteInterviewOneToOne(meet.id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toaster.success('Meeting cancelled successfully', 'Success');
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


  getEventOnDateByUserID(date: any) {
    this.service.getEventOnDateByUserID(date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res) => {
        this.reminders = res.data;
      }, error: (err) => { console.log(err) }, complete: () => { }
    })
  }

  openPopup(): void {
    const dailogRef = this.dialog.open(ScheduleComponent, {
      width: '800px',
      height: '500px',
      disableClose: true,
    });
    dailogRef.afterClosed().subscribe(() => {
      this.getOneToOneInterviewByStatus('schedule');
      const currentDate = new Date();
      this.getAllMeetingDatesByMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
    });
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

  openMeetingInBrowser(link: string) {
    window.open(link, '_blank');
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    let isHighlighted = false;
    isHighlighted = this.allDates.some(
      (data: any) =>
        dayjs(data).format('DD/MM/YYYY') ==
        dayjs(date).format('DD/MM/YYYY')
    );
    return isHighlighted ? 'highlightDate' : '';
  };

}