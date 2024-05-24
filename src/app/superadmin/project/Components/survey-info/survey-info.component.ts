import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Chart, ChartConfiguration } from 'chart.js';
import { PhasetwoComponent } from '../dashboard/phasetwo/phasetwo.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PinnedComponent } from '../dashboard/pinned/pinned.component';

@Component({
  selector: 'app-survey-info',
  templateUrl: './survey-info.component.html',
  styleUrl: './survey-info.component.css'
})
export class SurveyInfoComponent {
  details1:any[]=[];
  isCpoc:boolean=false;
  orderBy:any = 'asc'; 
  page:any = 1;
  size:any = 10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 10;
  totalItems: number = 10;
  details: any[] = [ ]
  constructor(private service: ProjectService,private router:Router,private route: ActivatedRoute,
    private tosatr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isCpoc=sessionStorage.getItem("isCpoc")=='true';
    // this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe((res: any) => {
    //   console.log(res);
    //   // this.details = res.data;
    // })
    this.getAllSurveyByClientId();
  }

  getAllSurveyByClientId(){
    this.service.getAllSurveyByClientID(sessionStorage.getItem("ClientId"),this.orderBy, this.page - 1, this.size, this.sortBy).subscribe({next:(res)=>{
      this.details=res.data;
      console.log(this.details);
      
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  onClick(id:any){
    console.log(id);
    
    let url = this.router.url.replace("surveyInfo", `detail/${id}`)
    this.router.navigate([url])
  }
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Survey 1','Survey 1','Survey 1','Survey 1','Survey 1','Survey 1','Survey 1',],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Attempted',    backgroundColor: '#70C4fe'},
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: ' Not Attempted' , backgroundColor: '#2980b9'}
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  openPopup2(): void {
    const dialogRef = this.dialog.open(PhasetwoComponent, {
      width: '550px',
      height: '400px',
      disableClose: true,
      data: { name: 'Survey List'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['/surveyInfo'], {
        relativeTo: this.route,
      });
      this.getAllSurveyByClientId();
    });
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(PinnedComponent, {
      width: '750px',
      height: '500px',
      disableClose: true,
      data: { },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['/surveyInfo'], {
        relativeTo: this.route,
      });
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllSurveyByClientId();
  }
}
