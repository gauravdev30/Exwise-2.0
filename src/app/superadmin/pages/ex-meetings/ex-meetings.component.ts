import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import dayjs from 'dayjs';

@Component({
  selector: 'app-ex-meetings',
  templateUrl: './ex-meetings.component.html',
  styleUrl: './ex-meetings.component.css',
})
export class ExMeetingsComponent implements OnInit {
  selected: Date | null | undefined;
  cardsCircle2: any[]=[];
  selectDated: any;
  highlightDate: MatCalendarCellCssClasses = [];
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.getAllMeeting();
  }
  getAllMeeting() {
    this.service.getAllOnetoOneInterview().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cardsCircle2 = res.data;
       
        console.log(this.cardsCircle2);
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

  // dateClass() {
  //   return (date: Date): MatCalendarCellCssClasses =>
  //     this.cardsCircle2.some((data: any) => {
  //       console.log(dayjs(data.createdDate).isSame(dayjs(date)));
  //       return dayjs(data.createdDate).isSame(dayjs(date));
     
        
  //     })
  //       ? 'highlightDate'
  //       : '';
   
  // }
  dateClass = (date: Date): MatCalendarCellCssClasses => {
    if (!this.cardsCircle2 || !Array.isArray(this.cardsCircle2)) {
      return '';
    }

    const isHighlighted = this.cardsCircle2.some((data: any) =>
      dayjs(data.createdDate).isSame(dayjs(date), 'day')
    );
    return isHighlighted ? 'highlightDate' : '';
  }


}
