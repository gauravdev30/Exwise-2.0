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
  msg:any;
  constructor(private service:ProjectService){}
  ngOnInit(): void {
    this.getAllCocreate();
  }
  view(){
this.viewMore=true;
this.share=false;
this.coCreate=false;
  }
  shareData(){
    this.viewMore=false;
    this.share=true;
    this.coCreate=false;
  }
  cocreateData(){
    this.viewMore=false;
    this.share=false;
    this.coCreate=true;
  }
  onCocreateData(){
    const obj={
      clientId:  sessionStorage.getItem("ClientId"),
      createdDate: new Date(),
      doc: "string",
  
      loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
      msg: this.msg
    }
    console.log(obj);
    this.service.Cocreate(obj).subscribe((res:any)=>{console.log(res);
      this.msg=''
      this.getAllCocreate()
    })
  }
 
  getAllCocreate(){
    this.service.getAllCoCreate(sessionStorage.getItem("ClientId")) .subscribe((res:any)=>{
      console.log(res);
      this.data=res.data
     })
  }
}
