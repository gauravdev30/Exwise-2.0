import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'app-info2',
  templateUrl: './info2.component.html',
  styleUrl: './info2.component.css'
})

export class Info2Component implements OnInit {
  exConsultantClientsList:any;
  items: any;
  isPopupOpen: boolean = false;
  surveyList: any[] = [];
  orderBy: any = 'desc';
  page: any = 1;
  size: any = 10;
  sortBy: any = 'id';
  isLoading: boolean = false;
  itemPerPage: number = 10;
  totalItems: number = 0;
  displayMesg: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<Info2Component>,
    @Inject(DIALOG_DATA) public data: { id: number },
    private service: ProjectService
  ) {}

  ngOnInit(): void {
    this.getAllClientsByEXConsultantID();
  }

  getAllClientsByEXConsultantID(){
    this.service.getAllClientByEXConsultantID(this.data?.id,this.page-1,this.size).subscribe({next:(res:any)=>{
      this.exConsultantClientsList=res?.data;
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  onClose(): void {
    this.dialogRef.close();
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllClientsByEXConsultantID();
  }
}
