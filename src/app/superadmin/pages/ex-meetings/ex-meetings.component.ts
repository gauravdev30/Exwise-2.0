import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import dayjs from 'dayjs';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-ex-meetings',
  templateUrl: './ex-meetings.component.html',
  styleUrl: './ex-meetings.component.css',
})
export class ExMeetingsComponent implements OnInit {
  selected: Date | null | undefined;
  cardsCircle2: any[] = [];
  selectDated: any;
  highlightDate: MatCalendarCellCssClasses = [];
  isLoading:boolean=false;
  isDataLoaded: Observable<any> = new Observable<any>();
  page: any = 1;
  size:any = 10;
  orderBy:string = 'desc';
  sortBy : string = 'id';
  totalItems: number = 0;


  
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.getAllMeeting(this.page);
  }
  getAllMeeting(page:number) {
    this.isLoading=true
    this.service.getAllOnetoOneInterview(this.orderBy,page-1,this.size,this.sortBy).subscribe({
      next: (res: any) => {
        this.isLoading=false
        this.cardsCircle2 = res.data;
        this.totalItems=res.totalItems;
        this.isDataLoaded = new Observable((subscriber) => {
          subscriber.next(this.cardsCircle2);
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  openMeeting(link: string) {
    window.open(link, '_blank');
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    let isHighlighted = false;
      isHighlighted = this.cardsCircle2.some(
        (data: any) =>
          dayjs(data.meetingDate).format('DD/MM/YYYY') ==
          dayjs(date).format('DD/MM/YYYY')
      );
    return isHighlighted ? 'highlightDate' : '';
  };

  onDateSelected(event:any){

  }

  onMonthSelected(event:any){

  }

  onPageChange(page: number) {
    this.page = page;
    this.getAllMeeting(page);
  }
}
