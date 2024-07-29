import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalysecreateComponent } from '../journey-map/analysecreate/analysecreate.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from '../../../pages/delete/delete.component';

import { Chart, ChartConfiguration } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { CreateGroupComponent } from '../meetings/create-group/create-group.component';
import dayjs from 'dayjs';
import { PhasetwoComponent } from '../dashboard/phasetwo/phasetwo.component';

import * as moment from "moment";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};


@Component({
  selector: 'app-projectdash',
  templateUrl: './projectdash.component.html',
  styleUrl: './projectdash.component.css',
  providers: [DatePipe]
})
export class ProjectdashComponent implements OnInit {
  // viewMore: boolean = false;
  // share: Boolean = false;
  // coCreate: Boolean = false;
  // analyse: boolean = false;
  // isLoading: boolean = false;
  // isCpoc: boolean = false;
  // data: any;
  // msg: any;
  // btnDisplay:boolean=false;
  // details: any;
  // listendata: any;
  // listencount: any;
  // oneToOneInterview: any;
  // focusGroupMeeting: any;
  // clientEmployee: any;
  // focusGroup: any;
  // assignedStagesOfSurvey: any;
  // numberOfRespinses: any;
  // barChart: any = [];
  // savepdf:any;
  // public barChartLegend = true;
  // public barChartPlugins = [];
  // displayClientData: any;
  // rate = 0;
  // feedbackFormShared: boolean = false;
  // JourneyMap: boolean = false;
  // clientData: any;
  // id: any;
  // visibleToClient: boolean = false;
  // visibleToClient2: boolean = false;
  // visibilityOn:boolean=false;
  // display1: any;
  // display2: any;
  // feedbackForm: FormGroup;
  // reminderSurveyList:any;
  // surveyList:any;surveyList2
  // :any;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  
  constructor(
    private service: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private toaster: ToastrService
    ,private fb: FormBuilder,
    private searchservice: SearchService,
    private datePipe: DatePipe,
    private api:ApiService
  ) {
    // this.feedbackForm = this.fb.group({
    //   feedback: ['', Validators.required],
    //   rate: [0, Validators.required]
    // });
  }

  ngOnInit(): void {

    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "Understand organisation needs and key people metrics ",
              y: [
                new Date("2019-08-02").getTime(),
                new Date("2019-08-03").getTime()
              ]
            },
            {
              x: "Capture key people metrics ",
              y: [
                new Date("2019-08-03").getTime(),
                new Date("2019-08-04").getTime()
              ]
            },
            {
              x: "Conduct Foundations observation across Reality, Touchpoints, Quality, Efficiency and Internal Owners",
              y: [
                new Date("2019-08-04").getTime(),
                new Date("2019-08-05").getTime()
              ]
            },
            {
              x: "Foundation observation data collation ",
              y: [
                new Date("2019-08-05").getTime(),
                new Date("2019-08-06").getTime()
              ]
            },
            {
              x: "Foundations Reality observation data analysis to prepare surveys",
              y: [
                new Date("2019-08-06").getTime(),
                new Date("2019-08-07").getTime()
              ]
            },
            {
              x: "Conduct Focus Groups to validate employee needs across life cycle ",
              y: [
                new Date("2019-08-07").getTime(),
                new Date("2019-08-08").getTime()
              ]
            },
            {
              x: "Collate Focus Group data",
              y: [
                new Date("2019-08-08").getTime(),
                new Date("2019-08-09").getTime()
              ]
            },
            {
              x: "Analyse Focus Group data",
              y: [
                new Date("2019-08-09").getTime(),
                new Date("2019-08-10").getTime()
              ]
            },
            {
              x: "Adapt Foundations surveys based on Foundations observation and Focus Group data",
              y: [
                new Date("2019-08-10").getTime(),
                new Date("2019-08-11").getTime()
              ]
            },
            {
              x: "Incorporate EE survey into Foundations survey if no exising EE survey",
              y: [
                new Date("2019-08-11").getTime(),
                new Date("2019-08-12").getTime()
              ]
            },
            {
              x: "Incorporate FUDS into Foundations survey",
              y: [
                new Date("2019-08-12").getTime(),
                new Date("2019-08-13").getTime()
              ]
            },
            {
              x: "Determine survey recipient groups for: Attract; Onboard; Develop: Retain and Separate",
              y: [
                new Date("2019-08-13").getTime(),
                new Date("2019-08-14").getTime()
              ]
            },
            {
              x: "Review and take sign off for survey messaging",
              y: [
                new Date("2019-08-14").getTime(),
                new Date("2019-08-15").getTime()
              ]
            },
            {
              x: "Upload survey recipient details",
              y: [
                new Date("2019-08-15").getTime(),
                new Date("2019-08-16").getTime()
              ]
            },
            {
              x: "Launch Foundations survey",
              y: [
                new Date("2019-08-16").getTime(),
                new Date("2019-08-17").getTime()
              ]
            },
            {
              x: "Send survey reminders",
              y: [
                new Date("2019-08-17").getTime(),
                new Date("2019-08-18").getTime()
              ]
            },
            {
              x: "UReview all standard, non day to day admin internal communications deployed throughout the EX",
              y: [
                new Date("2019-08-18").getTime(),
                new Date("2019-08-19").getTime()
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "datetime",
        tickAmount: 8,
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            const options = { month: 'short', day: 'numeric' };
            return date.toLocaleDateString(undefined, options as any);
          }
        }}
    };

  //   this.searchservice.sendResults().subscribe({
  //     next: (res: any) => {
  //       if (res.length == 0) {
  //           this.getAllMeetingsForAdminByStatus('schedule');

  //       } else {
  //         if (res.success) {
  //           this.cardsCircle2 = res.data;
  //         } else {
  //           this.cardsCircle2 = [];
  //         }
  //       }
  //     },
  //     error: (err: any) => { },
  //     complete: () => { },
  //   });


  //     this.getAllMeetingsForAdminByStatus('schedule');
  //     const currentDate = new Date();
  //   this.getAllMeetingDatesByMonthForAdmin(currentDate.getMonth() + 1, currentDate.getFullYear());

  //   setTimeout(() => {
  //     this.isLoading=true
  //     this.isCpoc = sessionStorage.getItem('isCpoc') == 'true';
  //     this.displayClientData = JSON.parse(sessionStorage.getItem('ClientData')!);
  //     this.id = JSON.parse(sessionStorage.getItem('ClientData')!).id;
  //     this.getClientById();
  //     this.listen('Listen');
  //     this.getAllCocreate();
  //     this.getallreports();
  //     this.getAllListenCount();
  //     this.getAllListenList();
  //   }, 200);

  //   const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10)
  //   this.getAllReminderSurveys(clientId);
  //   this.getAllSurveyByClientIdProjectDashBoard(clientId);
    
      }
    //   getClientById() {
    //     this.service.clientByID(this.id).subscribe((res: any) => {
    //       if (res.success) {
    //         this.clientData = res.data;
    //         console.log(this.clientData);
        
    
    //         this.feedbackFormShared = this.clientData.isSharedFeedback;
    //         this.JourneyMap = this.clientData.isSharedJourneyMap;
    //         console.log(this.feedbackFormShared);
    //       }
    //     });
    //   }
    //   toggleFeedbackForm(event: Event) {
    //     const checkbox = event.target as HTMLInputElement;
    //     this.feedbackFormShared = checkbox.checked;
    
    //     if (this.feedbackFormShared) {
    //       this.shareFeedbackForm();
    //     } else {
    //       this.doNotShareFeedbackForm();
    //     }
    //   }
    
    //   shareFeedbackForm() {
    //     console.log('Sharing feedback form');
    //     const obj = {
    //       isSharedFeedback: true,
    //     };
    //     this.service.updateclientByID(this.id, obj).subscribe((res: any) => {
    //       console.log(res);
    //       this.visibleToClient2=true;
    //       this.toaster.success('Feedback form is visible to client succesfully..!');
    //     });
    //   }
    //   openInvoice(id: any) {
    //     this.service.getanalyseById(id).subscribe((res:any)=>{
    // this.savepdf=res.data;
    // const responseByteData = this.savepdf.document ;
    // const url = responseByteData;
    // window.open(url)
    //     })
    //   }
    //   doNotShareFeedbackForm() {
    //     console.log('Not sharing feedback form');
    //     const obj = {
    //       isSharedFeedback: false,
    //     };
    //     this.service.updateclientByID(this.id, obj).subscribe((res: any) => {
    //       console.log(res);
    //         this.visibleToClient2=false;
    //       this.toaster.success('Feedback form is not visible to client succesfully..!');
    //     });
    //   }
    //   toggleJourneyMap(event: Event) {
    //     const checkbox = event.target as HTMLInputElement;
    //     this.JourneyMap = checkbox.checked;
    
    //     if (this.JourneyMap) {
    //       this.shareJourneyMap();
    //     } else {
    //       this.doNotShareJourneyMap();
    //     }
    //   }
    
    //   shareJourneyMap() {
    //     console.log('Sharing feedback form');
    //     const obj = {
    //       isSharedJourneyMap: true,
    //     };
    //     this.service.updateclientByID(this.id, obj).subscribe((res: any) => {
    //       console.log(res);
    //       this.visibleToClient=true;
    //       this.toaster.success('update phase');
    //     });
    //   }
    
    //   doNotShareJourneyMap() {
    //     console.log('Not sharing feedback form');
    //     const obj = {
    //       isSharedJourneyMap: false,
    //     };
    //     this.service.updateclientByID(this.id, obj).subscribe((res: any) => {
    //       console.log(res);
    //       this.visibleToClient=false;
    //       this.toaster.success('update phase');
    //     });
    //   }
    
    //   getAllListenCount() {
    //     this.isLoading = true;
    //     this.service
    //       .getListenCount(sessionStorage.getItem('ClientId'))
    //       .subscribe((res: any) => {
    //         this.isLoading = false;
    //         console.log(res);
    //         this.listencount = res.data;
    //         console.log(this.listencount);
    
    //         this.assignedStagesOfSurvey = res.data.assignedStagesOfSurvey;
    //         this.oneToOneInterview = res.data.oneToOneInterview;
    //         this.numberOfRespinses = res.data.numberOfRespinses;
    //         this.focusGroupMeeting = res.data.focusGroupMeeting;
    //         this.focusGroup = res.data.focusGroup;
    //         this.clientEmployee = res.data.clientEmployee;
    
    //         this.updateBarChartData(this.listencount);
    //       });
    //   }
    //   listen(tab: string) {
    //     this.viewMore = true;
    //     this.share = false;
    //     this.coCreate = false;
    //     this.analyse = false;
    //     this.activeTab = tab;
    //   }
    //   Analyse(tab: string) {
    //     this.viewMore = false;
    //     this.share = false;
    //     this.coCreate = false;
    //     this.analyse = true;
    //     this.activeTab = tab;
    //   }
    //   displayShare(){
    //     this.display1 = JSON.parse(
    //       sessionStorage.getItem('ClientData')!
    //     ).isSharedJourneyMap;
    //     if (this.display1 == true) {
    //       this.visibleToClient = true;
    //     } else {
    //       this.visibleToClient = false;
    //     }
    //     this.display2 = JSON.parse(
    //       sessionStorage.getItem('ClientData')!
    //     ).isSharedFeedback;
    
    //     if (this.display2 == true) {
    //       this.visibleToClient2 = true;
    //     } else {
    //       this.visibleToClient2 = false;
    //     }
    //   }
    //   Share(tab: string) {
    //     this.viewMore = false;
    //     this.share = true;
    //     this.coCreate = false;
    //     this.analyse = false;
    //     this.activeTab = tab;
    //     this.displayShare()
    //   }
    //   cocreate(tab: string) {
    //     this.viewMore = false;
    //     this.share = false;
    //     this.analyse = false;
    //     this.coCreate = true;
    //     this.activeTab = tab;
    //   }
    //   getAllListenList() {
    //     this.isLoading = true;
    //     this.service
    //       .getListen(sessionStorage.getItem('ClientId'))
    //       .subscribe((res: any) => {
    //         this.isLoading = false;
    //         console.log(res);
    //         this.listendata = res.data;
    //       });
    //   }
    //   feedback:any;
    //   feedbackMessage: string = '';
    //   feedbackMessageVisible: boolean = false;
    //   submitFeedback() {
    //     if (this.feedbackForm.invalid) {
    //       return;
    //     }
    
    //     const obj = {
    //       clientId: JSON.parse(sessionStorage.getItem('ClientData')!).id,
    //       feedback: this.feedbackForm.get('feedback')?.value,
    //       rating: this.feedbackForm.get('rate')?.value,
    //       userid: JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).id
    //     };
    
    //     console.log(obj);
    
    //     this.btnDisplay = true;
    
    //     this.service.createFeedback(obj).subscribe(
    //       (res: any) => {
    //         console.log(res);
    //         if (res.message === "Email sent successfully...!!") {
    //           this.feedbackForm.reset({ rate: 0 });
    //           this.btnDisplay = false;
    //           this.feedbackMessage = "Thank you for your feedback!";
    //           this.feedbackMessageVisible = true;
    //         }
    //       },
    //       (error) => {
    //         console.error('Error:', error);
    //         this.btnDisplay = false;
    //       }
    //     );
    //   }
    
    //   updateBarChartData(data: any) {
    //     console.log(data);
    
    //     console.log(Object.values(data));
    
    //     this.barChartData = {
    //       labels: Object.keys(data),
    //       datasets: [
    //         {
    //           data: Object.values(data),
    //           backgroundColor: '#70C4fe',
    //           label: 'Score',
    //         },
    //       ],
    //     };
    //   }
    //   public barChartData: ChartConfiguration<'bar'>['data'] = {
    //     labels: [],
    //     datasets: [
    //       {
    //         data: [],
    //         backgroundColor: '#70C4fe',
    //       },
    //     ],
    //   };
    
    //   public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    //     responsive: true,
    //   };
    
    //   confirmSelection(rate: any) {
    //     console.log(rate);
    //     this.rate = rate;
    //   }
    //   onCocreateData() {
    //     if (this.msg !== null && this.msg !== undefined) {
    //       const obj = {
    //         clientId: sessionStorage.getItem('ClientId'),
    //         createdDate: new Date(),
    //         doc: 'string',
    
    //         loggedUserId: JSON.parse(
    //           sessionStorage.getItem('currentLoggedInUserData')!
    //         ).id,
    //         msg: this.msg,
    //       };
    //       console.log(obj);
    //       this.service.Cocreate(obj).subscribe((res: any) => {
    //         console.log(res);
    //         this.msg = '';
    //         this.getAllCocreate();
    //       });
    //     } else {
    //       this.toaster.error('please enter valid data');
    //     }
    //   }
    
    //   getAllCocreate() {
    //     this.isLoading = true;
    //     this.service
    //       .getAllCoCreate(sessionStorage.getItem('ClientId'))
    //       .subscribe((res: any) => {
    //         this.isLoading = false;
    //         console.log(res);
    //         this.data = res.data;
    //       });
    //   }
    //   withcpoc: any;
    //   getallreports() {
    //     this.isLoading = true;
    //     this.service
    //       .getAllanalyseById(sessionStorage.getItem('ClientId'))
    //       .subscribe((res: any) => {
    //         console.log(res);
    //         this.isLoading = false;
    //         this.details = res.data;
    //         console.log(this.details);
    //         if (sessionStorage.getItem('isCpoc') == 'true') {
    //           this.details = res.data.filter(
    //             (report: any) => report.isSharedWithCPOC === true
    //           );
    
    //           console.log(this.details);
    //         }
    //       });
    //   }
    
    //   createAnalyse() {
    //     const dialogRef = this.dialog.open(AnalysecreateComponent, {
    //       width: '650px',
    //       height: '650px',
    //       disableClose: true,
    //     });
    //     dialogRef.afterClosed().subscribe(() => {

    //     });
    //   }
    
    //   updateanalyse(id: number) {
    //     console.log(id);
    
    //     const dialogRef = this.dialog.open(AnalysecreateComponent, {
    //       width: '650px',
    //       height: '650px',
    //       disableClose: true,
    //       data: { name: 'edit-report', id: id },
    //     });
    
    //     dialogRef.afterClosed().subscribe((result) => {
    //       this.getallreports();
    //     });
    //   }
    
    //   deleteanalyse(id: any) {
    //     const dialogRef = this.dialog.open(DeleteComponent, {
    //       data: {
    //         message: `Do you really want to delete the records ?`,
    //       },
    //       disableClose: true,
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result.action == 'ok') {
    //         this.service.deleteanalyse(id).subscribe((res: any) => {
    //           console.log(res);
    //           this.toaster.success(res.message, 'Success');
    //           if (res.message === 'Metrics deleted successfully.') {
    //             this.toaster.success(res.message, 'Success');
    //             this.getallreports();
    //           }
    //         });
    //       }
    //     });
    //   }
    
    //   shareAnalyse(id: any) {
    //     const dialogRef = this.dialog.open(DeleteComponent, {
    //       data: {
    //         message: `Do you really want to share report to client ?`,
    //       },
    //       disableClose: true,
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result.action == 'ok') {
    //         const obj = {
    //           isSharedWithCPOC: true,
    //         };
    //         this.service.updateanalysetById(id, obj).subscribe((res: any) => {
    //           console.log(res);
    //           this.toaster.success(res.message, 'Success');
    //           if (res.message === 'report share successfully.') {
    //             this.toaster.success(res.message, 'Success');
    //             this.getallreports();
    //           }
    //         });
    //       }
    //     });
    //   }
    
    //   activeTab: any;
    //   onclickTab(tab: string) {
    //     this.activeTab = tab;
    //   }


    //   filterToggle: boolean = false;
    //   interviewCount: any;
    //   schedulecount:number = 0;
    //   reschedulecount:number = 0;
    //   cancelcount:number = 0;
    //   columnSelection: any = '';
    //   filterTable: any = '';
    //   dept: any[] = [];
    //   deptToFilter: any[] = [];
    //   highlightDate: MatCalendarCellCssClasses = [];
    //   isDataLoaded: Observable<any> = new Observable<any>();
    //   dataId: any;
    //   deptDetails: any;
    //   emp: any;
    //   index: any;
    //   vissible: boolean = true;
    //   isVissible: boolean = false;
    //   submitted: boolean = false;
    //   departmentForm!: FormGroup;
    //   isTableVisible: boolean = true;
    //   p: number = 1;
    //   a: number = 1;
    //   itemPerPage: number = 10;
    //   sortDir: any = 'asc';
    //   totalItems: number = 0;
    //   selected: Date | null | undefined;
    //   highlightedDates: Date[] = [new Date('2024-04-15'), new Date('2024-04-20')];
    //   cardsCircle2: any;
    //   meetingDay: any;
    //   meetingMonth: any;
    //   meetingDate2: any;
    //   allUser: any;
    //   selectedCard:any = "schedule"
    //   clientId: any;
    //   selectedOption: any = '';
    //   reminders: any;
    //   form!: FormGroup;
    //   isLoading2: boolean = false;
    //   isLoadingReminder: boolean = false;
    //   allDates: any;
    //   typeOfUser:any;


    //   isSameDate(date1: Date, date2: Date): boolean {
    //     return date1.getFullYear() === date2.getFullYear() &&
    //       date1.getMonth() === date2.getMonth() &&
    //       date1.getDate() === date2.getDate();
    //   }
    
    //   formatDate(date: Date): string {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const hours = String(date.getHours()).padStart(2, '0');
    //     const minutes = String(date.getMinutes()).padStart(2, '0');
    //     const seconds = String(date.getSeconds()).padStart(2, '0');
    
    //     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //   }
    
    //   getAllMeetingsForAdminByStatus(status:string){
    //     this.isLoading=true;
    //     this.selectedCard=status;
    //     const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    //     const formattedDate = this.formatDate(new Date());
    //     this.api.getAdminInterviewByStatus(clientId,formattedDate, status, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
    //       next: (res: any) => {
    //         this.cardsCircle2 = res.data.sortedList;
    //         this.schedulecount = res.data.schedule;
    //         this.reschedulecount = res.data.reSchedule;
    //         this.cancelcount = res.data.cancel
    //         this.isLoading=false;
    //       }, error: (err: any) => { console.log(err) }, complete: () => { }
    //     });
    //   }
    
    //   getAllMeetingDatesByMonthForAdmin(month: number, year: number){
    //     this.isLoading = true;
    //     const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    //     const userID = JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
    //     this.api.getMeetingsByMonthForAdmin(clientId,month, userID, year).subscribe({
    //       next: (res: any) => {
    //         this.allDates = res.data;
    //         this.allDates.sort((a: string, b: string) => {
    //           return new Date(a).getTime() - new Date(b).getTime();
    //         });
      
    //         if (this.allDates.length > 0) {
    //           this.getEventOnDateForAdmin(this.allDates[0]);
    //         }
    //         // this.getEventOnDateForAdmin(this.allDates[0])
    //         this.isLoading=false;
    //         this.isDataLoaded = new Observable((subscriber) => {
    //           subscriber.next(this.allDates);
    //         });
    //       },
    //       error: (err: any) => {
    //         console.log(err);
    //       },
    //       complete: () => { },
    //     });
    //   }
    
    //   getEventOnDateForAdmin(date: any){
    //     const clientId = parseInt(sessionStorage.getItem("ClientId")!, 10);
    //     this.api.getEventOnDateForAdmin(clientId,date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
    //       next: (res) => {
    //         this.reminders = res.data;
    //       }, error: (err) => { console.log(err) }, complete: () => { }
    //     })
    //   }
    
    //   modelChangeFn(event: any) {
    
    //   }
    //   openMeeting(link: string) {
    //     window.open(link, '_blank');
    //   }
    //   getAllMeeting() {
    //     this.service.getAllOnetoOneInterview().subscribe({
    //       next: (res: any) => {
    //         console.log(res);
    //         this.allUser = res.data;
    //       }, error: (err: any) => {
    //         console.log(err);
    //       }, complete: () => { }
    
    //     })
    //   }
    
    //   getOneToOneInterviewByStatus(status: any) {
    //     this.isLoading=true;
    //     this.selectedCard=status;
    //     const formattedDate = this.formatDate(new Date());
    //     this.service.getOneToOneInterviewByStatus(formattedDate, status, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
    //       next: (res: any) => {
    //         this.cardsCircle2 = res.data.sortedList;
    //         this.schedulecount = res.data.schedule;
    //         this.reschedulecount = res.data.reSchedule;
    //         this.cancelcount = res.data.cancel
    //         this.isLoading=false;
    //       }, error: (err: any) => { console.log(err) }, complete: () => { }
    //     });
    //   }
    
    
    //   onDeleteInterview(meet: any) {
    //     const dialogRef = this.dialog.open(DeleteComponent, {
    //       data: {
    //         message: `Do you really want to delete the records for ${meet?.title} ?`,
    //       },
    //       disableClose: true,
    //     });
    
    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result.action == 'ok') {
    //         this.service.softDeleteInterviewOneToOne(meet.id).subscribe({
    //           next: (res: any) => {
    //             console.log(res);
    //             this.toaster.success('Meeting cancelled successfully', 'Success');
    //             this.getAllMeetingsForAdminByStatus('schedule');
    //             window.location.reload();
                
    //           }, error: (err: any) => {
    //             console.log(err);
    //           }, complete: () => { }
    //         })
    //       }
    //     })
    
    //   }
    
    //   formatTime(time: string): string | null {
    //     const [hours, minutes] = time.split(':').map(Number);
    //     const date = new Date();
    //     date.setHours(hours, minutes);
    //     return this.datePipe.transform(date, 'hh:mm a');
    //   }
    
    //   getAllMeetingDatesByMonth(month: number, year: number): void {
    //     this.service.getMeetingsDateByMonth(month, year, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
    //       next: (res: any) => {
    //         this.allDates = res.data;
    //         console.log(res.data);
    //         this.isDataLoaded = new Observable((subscriber) => {
    //           subscriber.next(this.allDates);
    //         });
    //       },
    //       error: (err: any) => {
    //         console.log(err);
    //       },
    //       complete: () => { },
    //     });
    //   }
    
    //   onDateSelected(selectedDate: Date | null): void {
    //     if (selectedDate) {
    //       this.selected = selectedDate;
    //       const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    //       // if(this.typeOfUser===0){
    //         this.getEventOnDateForAdmin(formattedDate);
    //       // }
    //       // else{
    //       //   this.getEventOnDateByUserID(formattedDate);
    //       // }
    //     }
    //   }
    
    //   onMonthSelected(event: Date): void {
    //     // if(this.typeOfUser===0){
    //       this.getAllMeetingDatesByMonthForAdmin(event.getMonth() + 1, event.getFullYear());
    //     // }
    //     // this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
    //   }
    
    //   onYearSelected(event: Date): void {
    //     // this.getAllMeetingDatesByMonth(event.getMonth() + 1, event.getFullYear());
    //   }
    
    
    //   getEventOnDateByUserID(date: any) {
    //     this.service.getEventOnDateByUserID(date, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
    //       next: (res) => {
    //         this.reminders = res.data;
    //       }, error: (err) => { console.log(err) }, complete: () => { }
    //     })
    //   }
    
    //   createGroups() {
    //     const dialogRef = this.dialog.open(CreateGroupComponent, {
    //       width: '1100px',
    //       height: '700px',
    //       disableClose: true,
    //       data: { name: 'createGroup' }
    //     });
    //     dialogRef.afterClosed().subscribe(() => {
    //       // this.getAllFocusGroup();
    //     })
    
    //   }

    //   openMeetingInBrowser(link: string) {
    //     window.open(link, '_blank');
    //   }
    
    //   dateClass = (date: Date): MatCalendarCellCssClasses => {
    //     let isHighlighted = false;
    //     isHighlighted = this.allDates.some(
    //       (data: any) =>
    //         dayjs(data).format('DD/MM/YYYY') ==
    //         dayjs(date).format('DD/MM/YYYY')
    //     );
    //     return isHighlighted ? 'highlightDate' : '';
    //   };   
      
    //   toggleDisplay() {
    //     this.isTableVisible = !this.isTableVisible;
    //   }

    //   openPopup2(): void {
    //     const dialogRef = this.dialog.open(PhasetwoComponent, {
    //       width: '550px',
    //       height: '400px',
    //       disableClose: true,
    //       data: { name: 'Survey List'},
    //     });
    
    //     dialogRef.afterClosed().subscribe((result) => {
    //     });
    //   }

    //   getAllReminderSurveys(clientId:number){
    //     this.service.getAllReminderSurveyByClientId(clientId).subscribe({next:(res)=>{
    //       this.reminderSurveyList=res.data;
    //     },error:(err)=>{console.log(err)},complete:()=>{}});
    //   }

    //   getAllSurveyByClientIdProjectDashBoard(clientId:number){
    //     this.service.getAllSurveysForProjectDashboardByClientId(clientId).subscribe(
    //       response => {
    //         this.surveyList = response.data.map((survey:any) => ({
    //           surveyName: survey.surveyWithDetailResponseDto.surveyName,
    //           stages: survey.surveyWithDetailResponseDto.dto.map((stage:any) => ({
    //             stageName: stage.stageName,
    //             subphases: stage.subphaseWithQuestionAnswerResponseDtos.map((subphase:any) => subphase.subPhaseName)
    //           }))
    //         }));

    //         console.log(response)
    //         this.surveyList2 =response.surveyList;
    //       },
    //       error => {
    //         console.error('Error fetching survey data:', error);
    //       }
    //     );
    //   }
    
}
