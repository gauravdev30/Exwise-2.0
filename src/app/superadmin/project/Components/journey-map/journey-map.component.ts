import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalysecreateComponent } from './analysecreate/analysecreate.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from '../../../pages/delete/delete.component';

import { Chart, ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrl: './journey-map.component.css',
})
export class JourneyMapComponent implements OnInit {
  viewMore: boolean = false;
  share: Boolean = false;
  coCreate: Boolean = false;
  analyse: boolean = false;
  isLoading: boolean = false;
  isCpoc: boolean = false;
  data: any;
  msg: any;
  details: any;
  listendata: any;
  listencount: any;
  oneToOneInterview: any;
  focusGroupMeeting: any;
  clientEmployee: any;
  focusGroup: any;
  assignedStagesOfSurvey: any;
  numberOfRespinses: any;
  barChart: any = [];
  public barChartLegend = true;
  public barChartPlugins = [];
  displayClientData:any;
  constructor(
    private service: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.isCpoc = sessionStorage.getItem('isCpoc') == 'true';
this.displayClientData=JSON.parse(sessionStorage.getItem("ClientData")!);
console.log(this.displayClientData);

    this.listen('Listen');
    this.getAllCocreate();
    this.getallreports();
    this.getAllListenCount();
    this.getAllListenList();
  }
  listen(tab: string) {
    this.viewMore = true;
    this.share = false;
    this.coCreate = false;
    this.analyse = false;
    this.activeTab = tab;
  }
  Analyse(tab: string) {
    this.viewMore = false;
    this.share = false;
    this.coCreate = false;
    this.analyse = true;
    this.activeTab = tab;
  }
  Share(tab: string) {
    this.viewMore = false;
    this.share = true;
    this.coCreate = false;
    this.analyse = false;
    this.activeTab = tab;
  }
  cocreate(tab: string) {
    this.viewMore = false;
    this.share = false;
    this.analyse = false;
    this.coCreate = true;
    this.activeTab = tab;
  }
  getAllListenList() {
    this.isLoading=true
    this.service
      .getListen(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        this.isLoading=false;
        console.log(res);
        this.listendata = res.data;
   
      });
  }

  updateBarChartData(data: any) {
    console.log(Object.values(data));
    
    this.barChartData = {
      labels: ['Interview','Survey responce','Focus group meeting','Focus group','Employee', 'Survey stages'],      
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: '#70C4fe',
          label: 'Score'
        },
      ],
    };
  }
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#70C4fe',
      },
    ],
  };
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  getAllListenCount() {
    this.isLoading=true;
    this.service
      .getListenCount(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        this.isLoading=false;
        console.log(res);
        this.listencount = res.data;
        this.oneToOneInterview = res.data.oneToOneInterview;
        this.focusGroupMeeting = res.data.focusGroupMeeting;
        this.clientEmployee = res.data.clientEmployee;
        this.focusGroup = res.data.focusGroup;
        this.assignedStagesOfSurvey = res.data.assignedStagesOfSurvey;
        this.numberOfRespinses = res.data.numberOfRespinses;
        this.updateBarChartData(this.listencount);
      });
  }

  onCocreateData() {
    if (this.msg !== null && this.msg !== undefined) {
      const obj = {
        clientId: sessionStorage.getItem('ClientId'),
        createdDate: new Date(),
        doc: 'string',

        loggedUserId: JSON.parse(
          sessionStorage.getItem('currentLoggedInUserData')!
        ).id,
        msg: this.msg,
      };
      console.log(obj);
      this.service.Cocreate(obj).subscribe((res: any) => {
        console.log(res);
        this.msg = '';
        this.getAllCocreate();
      });
    } else {
      this.toaster.error('please enter valid data');
    }
  }

  getAllCocreate() {
    this.isLoading=true;
    this.service
      .getAllCoCreate(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        this.isLoading=false;
        console.log(res);
        this.data = res.data;
      });
  }

  getallreports() {
    this.isLoading=true;
    this.service.getAllanalyseById().subscribe((res: any) => {
      console.log(res);
      this.isLoading=false
      this.details = res.data;
      console.log(this.details);
    });
  }

  createAnalyse() {
    const dialogRef = this.dialog.open(AnalysecreateComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getAllMatrixData();
    });
  }

  updateanalyse(id: number) {
    console.log(id);

    const dialogRef = this.dialog.open(AnalysecreateComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
      data: { name: 'edit-report', id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getallreports();
    });
  }

  deleteanalyse(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to delete the records ?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.service.deleteanalyse(id).subscribe((res: any) => {
          console.log(res);
          this.toaster.success(res.message, 'Success');
          if (res.message === 'Metrics deleted successfully.') {
            this.toaster.success(res.message, 'Success');
            this.getallreports();
          }
        });
      }
    });
  }

  shareAnalyse(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to share report to client ?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        const obj = {
          isSharedWithCPOC: true,
        };
        this.service.updateanalysetById(id, obj).subscribe((res: any) => {
          console.log(res);
          this.toaster.success(res.message, 'Success');
          if (res.message === 'report share successfully.') {
            this.toaster.success(res.message, 'Success');
            this.getallreports();
          }
        });
      }
    });
  }

  activeTab: any;
  onclickTab(tab: string) {
    this.activeTab = tab;
  }
}
