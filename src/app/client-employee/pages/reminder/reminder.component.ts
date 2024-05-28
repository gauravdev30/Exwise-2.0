import { Component } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import dayjs from 'dayjs';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  total:any=0;
  upcoming:any=0;
  selected: Date | null | undefined;
  highlightDate: MatCalendarCellCssClasses = [];
  eventData:any = []
  filteredEventData:any = [];
  selectedCard:any = "totalEvent"
  allDates:any;
  reminders:any;
  isLoadingReminder:boolean=false;

  constructor(private service:EmployeeService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.getAllMeetingDatesByMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
    this.getUpcomingEvents();
  }
  

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }

  getAllMeetingDatesByMonth(month: number, year: number): void {
    this.service.getMeetingsDateByMonth(month, year, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
      next: (res: any) => {
        this.allDates = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  getUpcomingEvents(){
    const { id: userId } = JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!)
    this.service.getUpcomingEventsById(userId, 0, 100).subscribe((data) => {
      this.eventData = data.data;
      this.total = this.eventData.totalEvent.count;
      this.upcoming = this.eventData.upcomingEvent.count
      this.filteredEventData = this.eventData.totalEvent.values
    });
  }

  onDateSelected(selectedDate: Date | null): void {
    if (selectedDate) {
      this.selected = selectedDate;
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      this.getEventOnDateByUserID(formattedDate);
    }
  }


  getEventOnDateByUserID(date:any){
    this.service.getEventOnDateByUserID(date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({next:(res)=>{
      this.reminders=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  getRemindersByStatus(status: any){
    this.selectedCard = status
    this.filteredEventData = this.eventData[status].values
  }

  onMonthSelected(event: Date): void {
    this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
  }

  relativePercentage(statusCount: any) {
    return (statusCount / this.total) * 100;
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

}