import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ex-meetings',
  templateUrl: './ex-meetings.component.html',
  styleUrl: './ex-meetings.component.css'
})
export class ExMeetingsComponent implements OnInit {
  selected: Date | null | undefined;
  cardsCircle2:any;
constructor(private service:ApiService){

}
ngOnInit(): void {
    this.getAllMeeting();
}
  getAllMeeting(){
    this.service.getAllOnetoOneInterview().subscribe({next:(res:any)=>{console.log(res);
      this.cardsCircle2=res.data;
    
      },error:(err:any)=>{console.log(err);
      },complete:()=>{}
      
      })
  }
  openMeeting(link: string) {
    window.open(link, '_blank');
  }
}
