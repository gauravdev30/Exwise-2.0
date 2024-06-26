import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { SearchuserService } from '../service/searchuser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  attempted:any=0;
  notAttempted:any=0;
  items: any[] = [];
  orderBy:any = 'desc'; 
  page:any = 1;
  size:any =10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 10;
  totalItems: number = 10;
  total:any;
  attemptedCount:any;
  notAttemptedCount:any;
  selectedCard:any = 'all';

  constructor(private api:EmployeeService,private router: Router, private searchservice:SearchuserService){}

  ngOnInit(): void {
    this.api.getCountByClientEmpId(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({next:(res)=>{
      this.total=res.data.total;
      this.attempted=res.data.attempted;
      this.notAttempted=res.data.notAttempted;
    },error:(err)=>{console.log(err);},complete:()=>{}});
 

    this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.getAllAssignedSurveyByUser();
        } else {
          if (res.success) {
            this.items = res.data;
          } else {
            this.items = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });
  }

  getAllAssignedSurveyByUser(){
    this.api.getAllAssignedSurveyByClientEmpId(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id ,this.page - 1, this.size, this.sortBy, this.orderBy).subscribe({next:(res)=>{
      this.items=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllAssignedSurveyByUser();
  }

  getSurveysByStatus(status:any){
    this.selectedCard = status
    if(status==='all'){
      this.getAllAssignedSurveyByUser();
      return;
    }
    this.api.getAssignedSurveyByStatus(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,this.page - 1, this.size, this.sortBy, this.orderBy,status).subscribe({next:(res)=>{
      this.items=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  onSurveyStart(id: number): void {
    this.router.navigate(['clientEmployee/survey-response/',id]);
    console.log(id);
    
  }

  relativePercentage(statusCount: any) {
    return (statusCount / this.total) * 100;
  }

}