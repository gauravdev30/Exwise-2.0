import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { ToastrService } from 'ngx-toastr';
import { SurveyApiService } from '../service/survey-api.service';


@Component({
  selector: 'app-stagelist',
  templateUrl: './stagelist.component.html',
  styleUrl: './stagelist.component.css'
})
export class StagelistComponent implements OnInit {
stageList:any;

constructor(private dialog:MatDialog,private api:SurveyApiService,private tosatr:ToastrService){}

ngOnInit(): void {
  this.api.getAllStagesList().subscribe((res)=>{
    if(res.success){
      this.stageList=res.data;
    }
  })
}

editStage(stageId:number){

}

deleteStage(stageId:number){

}

pinStage(stageId:number){

}

openPopup(): void {
  const dialogRef = this.dialog.open(CreateComponent, {
    width: '450px',
    height: '500px',
    disableClose: true,
    data: { id: 1},
  })
}
  
}
