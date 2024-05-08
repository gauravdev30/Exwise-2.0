import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TouchpointService } from '../../services/touchpoint.service';
import { CreatetouchpointComponent } from './createtouchpoint/createtouchpoint.component';
import { ShowalltouchpointComponent } from './showalltouchpoint/showalltouchpoint.component';

@Component({
  selector: 'app-touchpoint',
  templateUrl: './touchpoint.component.html',
  styleUrl: './touchpoint.component.css'
})
export class TouchpointComponent implements OnInit{
touchpointStages:any;

constructor(
  private dialog: MatDialog,
  private api: TouchpointService,
  private toastr: ToastrService,
  private router: Router
) {}

ngOnInit(): void {
  this.getAllTouchPoints();
}

getAllTouchPoints(){
  this.api.getAllTouchPointsStages().subscribe({next:(res)=>{
    this.touchpointStages=res.data;
  },error:(err)=>{console.log(err)},complete:()=>{}})
}

openPopup(): void {
  const dialogRef = this.dialog.open(CreatetouchpointComponent, {
    width: '450px',
    height: '450px',
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe(() => {
    // this.getSurveyList();
  });
}

openPopupForTouchpoint(){
  this.dialog.open(ShowalltouchpointComponent, {
    width: '1100px',
    height: '650px',
    disableClose: true,
  });
}

openAssignTouchPoints(stageId:any){

}

}
