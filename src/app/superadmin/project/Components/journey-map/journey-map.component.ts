import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrl: './journey-map.component.css'
})
export class JourneyMapComponent implements OnInit{
  viewMore:boolean=false;
  share:Boolean=false;
  coCreate:Boolean=false;
  data:any;
  constructor(private service:ProjectService){}
  view(){
this.viewMore=true;
  }
  shareData(){
    this.share=true;
  }
  cocreateData(){
    this.coCreate=true;
  }
  ngOnInit(): void {
     this.service.getAllCoCreate(sessionStorage.getItem("ClientId")) .subscribe((res:any)=>{
      console.log(res);
      this.data=res.data
     })
  }
}
