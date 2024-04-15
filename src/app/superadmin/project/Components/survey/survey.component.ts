import { Component, OnInit } from '@angular/core';
import { CreateSurveyComponent } from '../create-survey/create-survey.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})

export class SurveyComponent  implements OnInit{
  sendSurvey:any=true;
  show:any=true;
  send:any=false;
  assign:any=false;
  info:any=false;
  main:any=true;
  total:any;
completed:any;
cancelled:any;
pending:any;
  constructor(public dialog: MatDialog, private router: Router,private route: ActivatedRoute,private service:ProjectService) {}

   ngOnInit(): void {
    const id = sessionStorage.getItem("id");
       this.service.getCount(id).subscribe((res:any)=>{console.log(res);
        if(res.success){
          this.total = res.data.total;
          this.completed = res.data.completed;
          this.pending = res.data.pending;
          this.cancelled = res.data.cancelled;
        }
        else{
console.log("API RESPONCE FAILED");

        }
       })
   }
  items: any[] = [
    { id:'1', name: 'Name 1', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Name 2', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },
    { id:'3', name: 'Name 3', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'4', name: 'Name 4', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
  ];
  onsend(){
    this.sendSurvey=false;
    this.send=true;
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(CreateSurveyComponent, {
      width: '450px',
      height: '500px',
      disableClose: true,
      data: { name: 'create-project'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
      this.router.navigate(['../assign-question-to-survey'], { relativeTo: this.route });
    });
  }
  share: any[] = [
    { id:'1', name: 'Name 1', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Name 2', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },

  ];
  sharesurvey: any[] = [
    { id:'1', name: 'Send Your Surveys', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Complete' },
    { id:'2', name: 'Focus Group', type:'FUDS', description:'survey demo descrition', date: '2022-01-01', createdby:'kate', status: 'Pending' },

  ];
  cardsCircle:any[]=[
    { name: 'Total Survey', count: '2' },
    { name: 'Completed survey', count: '2' },
    { name: 'Pending survey', count: '2' },
    { name: 'Cancelled survey', count: '2' },
  ]
  infoDetails(){
    this.sendSurvey=false;
    this.assign=false;
    this.show=false;
    this.main=false;
    this.info=true;
  }
  check(){
    console.log("test");
    this.main=false;
    this.sendSurvey=false;
this.assign=true;
this.show=false;
  }
}

