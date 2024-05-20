import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  total:any=0;
  attempted:any=0;
  notAttempted:any=0;
  items: any;

  constructor(private api:EmployeeService,private router: Router, ){}

  ngOnInit(): void {
    this.api.getCountByClientEmpId(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({next:(res)=>{
      this.total=res.data.total;
      this.attempted=res.data.attempted;
      this.notAttempted=res.data.notAttempted;
    },error:(err)=>{console.log(err);},complete:()=>{}});

    this.api.getAllAssignedSurveyByClientEmpId(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({next:(res)=>{
      this.items=res.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  getSurveysByStatus(status:any){
    this.api.getAssignedSurveyByStatus(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,status).subscribe({next:(res)=>{
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
}