import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalysecreateComponent } from './analysecreate/analysecreate.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrl: './journey-map.component.css',
})
export class JourneyMapComponent implements OnInit {
  viewMore: boolean = false;
  share: Boolean = false;
  coCreate: Boolean = false;
  analyse:boolean=false;
  isLoading:boolean=false;
  data: any;
  msg: any;
  details:any;
  listendata:any;
  listencount:any;
  constructor(private service: ProjectService,private dialog:MatDialog,private router:Router,private toaster:ToastrService) {}
  ngOnInit(): void {
    this.listen('Listen')
    this.getAllCocreate();
    this.getallreports();
this.getAllListenCount();
this.getAllListenList();
  }
  listen(tab: string) {
    this.viewMore = true;
    this.share = false;
    this.coCreate = false;
    this.analyse=false;
    this.activeTab = tab;
  }
  Analyse(tab: string) {
    this.viewMore = false;
    this.share = false;
    this.coCreate = false;
    this.analyse=true;
    this.activeTab = tab;
  }
  Share(tab: string) {
    this.viewMore = false;
    this.share = true;
    this.coCreate = false;
    this.analyse=false;
    this.activeTab = tab;
  }
  cocreate(tab: string) {
    this.viewMore = false;
    this.share = false;
    this.analyse=false;
    this.coCreate = true;
    this.activeTab = tab;
  }
  getAllListenList() {
    this.service.getListen(sessionStorage.getItem('ClientId')).
      subscribe((res: any) => {
        console.log(res);
        this.listendata = res.data;
      });
  }
  getAllListenCount() {
    this.service
      .getListenCount(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        console.log(res);
        this.listencount = res.data;
      });
  }
  onCocreateData() {
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
  }

  getAllCocreate() {
    this.service
      .getAllCoCreate(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
      });
  }
  getallreports(){
    this.service.getAllanalyseById().subscribe((res:any)=>{console.log(res);
      this.details=res.data;
      console.log(this.details);
      
    })
  }
  createAnalyse(){
    const dialogRef = this.dialog.open(AnalysecreateComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getAllMatrixData();
    });
  }
  openPopup(id:any){}

  updateanalyse(id:number){
    console.log(id);
    
    const dialogRef = this.dialog.open(AnalysecreateComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
      data: { name: 'edit-report',id:id }
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getallreports();
    });
  }

  deleteanalyse(id:any){
this.service.deleteanalyse(id).subscribe((res:any)=>{console.log(res);
  this.toaster.success(res.message, 'Success');
  if(res.message==="Metrics deleted successfully."){
    this.toaster.success(res.message, 'Success');
   this.getallreports();
  }
})
  }
  activeTab: any;
  onclickTab(tab: string) {
    this.activeTab = tab;
  }
}
