import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import dayjs from 'dayjs';
import { Observable, Subject, of } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-ex-meetings',
  templateUrl: './ex-meetings.component.html',
  styleUrl: './ex-meetings.component.css',
})
export class ExMeetingsComponent implements OnInit {
  selected: Date | null | undefined;
  cardsCircle2: any;
  selectDated: any;
  highlightDate: MatCalendarCellCssClasses = [];
  isLoading: boolean = false;
  isDataLoaded: Observable<any> = new Observable<any>();
  page: any = 1;
  size: any = 10;
  orderBy: string = 'desc';
  sortBy: string = 'id';
  totalItems: number = 0;
  isLoadingReminder: boolean = false;
  allDates: any;
  reminders: any;
  selectedCard:any = "schedule"
  schedulecount:any;
  reschedulecount:any;
  cancelcount:any;


  constructor(private service: ApiService,private searchservice:SearchService) { }
  ngOnInit(): void {
    // this.getAllMeeting();
    this.getAdminMeetingsByStatus('schedule');
    const currentDate = new Date();
    this.getAllMeetingDatesByMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          // this.getAllMeeting();
          this.getAdminMeetingsByStatus('schedule');
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
  }


  // getAllMeeting() {
  //   this.isLoading = true
  //   const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
  //   const formattedDate = this.formatDate(new Date());
  //   const userID = JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
  //   this.service.getAllOnetoOneInterview(clientId, formattedDate, userID).subscribe({
  //     next: (res: any) => {
  //       this.isLoading = false
  //       this.cardsCircle2 = res.data;
  //       this.totalItems = res.totalItems;
  //       this.isDataLoaded = new Observable((subscriber) => {
  //         subscriber.next(this.cardsCircle2);
  //       });
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => { },
  //   });
  // }

  getAllMeetingDatesByMonth(month: number, year: number): void {
    this.isLoading = true;
    const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    const userID = JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
    this.service.getMeetingsByMonthForAdmin(clientId,month, userID, year).subscribe({
      next: (res: any) => {
        this.allDates = res.data;
        this.isLoading=false;
        this.allDates.sort((a: string, b: string) => {
          return new Date(a).getTime() - new Date(b).getTime();
        });
  
        if (this.allDates.length > 0) {
          this.getEventOnDateByForAdmin(this.allDates[0]);
        }
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

  getAdminMeetingsByStatus(status: any) {
    this.isLoading=true;
    this.selectedCard=status;
    const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    const formattedDate = this.formatDate(new Date());
    this.service.getAdminInterviewByStatus(clientId,formattedDate, status, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        this.cardsCircle2 = res.data.sortedList;
        this.schedulecount = res.data.schedule;
        this.reschedulecount = res.data.reSchedule;
        this.cancelcount = res.data.cancel
        this.isLoading=false;
      }, error: (err: any) => { console.log(err) }, complete: () => { }
    });
  }

  
  openMeeting(link: string) {
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onDateSelected(selectedDate: Date | null): void {
    if (selectedDate) {
      this.selected = selectedDate;
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      this.getEventOnDateByForAdmin(formattedDate);
    }
  }


  getEventOnDateByForAdmin(date:any){
    const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    this.service.getEventOnDateForAdmin(clientId,date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res) => {
        this.reminders = res.data;
      }, error: (err) => { console.log(err) }, complete: () => { }
    })
  }

  onMonthSelected(event: any) {
    this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
  }

  // onPageChange(page: number) {
  //   this.page = page;
  //   this.getAllMeeting(page);
  // }
}
