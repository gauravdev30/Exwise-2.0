import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  orderBy:any = 'desc'; 
  page:any = 1;
  size:any = 10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 10;
  totalItems: any;
  details: any[] = [];
  isLoading:boolean=false;
  displayMesg:boolean=false;
  
constructor(private router:Router,private service:GraphService) {}

ngOnInit(): void {
    this.getAllSurveyAssignmentByClientID();
}
surveyName:any;
getAllSurveyAssignmentByClientID(){
  this.isLoading=true
    this.service.getAllSurveyAssignmentByClientID(sessionStorage.getItem("ClientId")).subscribe({next:(res)=>{
 
      if(res.message==="Failed to retrieve survey assignments."){
        this.isLoading=false
        this.displayMesg=true
      }else{
        this.details=res.data;

        this.isLoading=false
        this.totalItems=res.totalItems
        console.log(this.details);
      }
   
      
    },error:(err)=>{console.log(err)
      this.isLoading=false
      this.displayMesg=true
    },complete:()=>{}})
}

onClick(id: number, surveyName: any,isStaticSurvey:boolean) {   
  let url = this.router.url.replace("report", `chartReport/${id}/${surveyName}/${isStaticSurvey}`);
  this.router.navigateByUrl(url);
}

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllSurveyAssignmentByClientID();
  }

  navigateToDemographic(surveyId:number,isStaticSurvey:boolean) {
    let url = this.router.url.replace("report", `demographic-survey`);
    this.router.navigateByUrl(url);
  }


  stopPropagation(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    }
  }
}
