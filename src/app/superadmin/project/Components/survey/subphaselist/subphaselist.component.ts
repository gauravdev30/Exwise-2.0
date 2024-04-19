import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { SurveyApiService } from '../service/survey-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subphaselist',
  templateUrl: './subphaselist.component.html',
  styleUrl: './subphaselist.component.css'
})
export class SubphaselistComponent implements OnInit {
subphaseList:any;

constructor(private dialog:MatDialog,private api:SurveyApiService,private tosatr:ToastrService){}

ngOnInit(): void {
  this.api.getAllSubPhasesList().subscribe((res)=>{
    if(res.success){
      this.subphaseList=res.data;
    }
  })
}

editSubphase(subPhaseId:number){

}

deleteSubphase(subPhaseId:number){

}

pinSubphase(subPhaseId:number){

}


openPopup(): void {
  const dialogRef = this.dialog.open(CreateComponent, {
    width: '450px',
    height: '500px',
    disableClose: true,
    data: { id: 2},
  });
}


}
