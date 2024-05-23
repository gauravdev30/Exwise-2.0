import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-journey-roadmap',
  templateUrl: './journey-roadmap.component.html',
  styleUrl: './journey-roadmap.component.css'
})
export class JourneyRoadmapComponent  implements OnInit {
data:any=[];
  constructor(private service :ProjectService,){}
  ngOnInit(): void {
      this.getjourneyMapData();
  }
  getjourneyMapData(){
    this.service.journeyMapnByClientId(sessionStorage.getItem('ClientId')).subscribe({next:(res:any)=>{console.log(res);
      this.data=res.data;
      console.log(this.data);
    },error:()=>{},complete:()=>{}})
  }
}
