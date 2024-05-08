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
  isDataLoaded: Observable<any> = new Observable<any>();
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.getAllMeeting();
  }
  getAllMeeting() {
    this.service.getAllOnetoOneInterview().subscribe({
      next: (res: any) => {
        this.cardsCircle2 = res.data;
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
    this.isDataLoaded.subscribe((val) => {
      isHighlighted = val.some(
        (data: any) =>
          dayjs(data.meetingDate).format('DD/MM/YYYY') ==
          dayjs(date).format('DD/MM/YYYY')
      );
    });
    return isHighlighted ? 'highlightDate' : '';
  };
}
