import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { StarttouchpointComponent } from './employee-touchpoint/starttouchpoint/starttouchpoint.component'; 
import { InfochartComponent } from './infochart/infochart.component';
import { TouchpointService } from '../../../services/touchpoint.service';
import { AssignrealitytouchpointComponent } from './assignrealitytouchpoint/assignrealitytouchpoint.component';
import { DeleteComponent } from '../../../pages/delete/delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-touchpoint',
  templateUrl: './touchpoint.component.html',
  styleUrl: './touchpoint.component.css'
})
export class TouchpointComponent implements OnInit {
 isCpoc:boolean=false;
 allRealityTouchpoinStages:any;
 isLoading:boolean=false;

constructor(private dialog: MatDialog,private service:TouchpointService,private tostr:ToastrService) {}

ngOnInit(){
  this.isCpoc=sessionStorage.getItem("isCpoc")=='true';
  this.getAllAssignedStagesByClientId();
}

getAllAssignedStagesByClientId(){
  this.isLoading=true;
  this.service.getAllAssignedStagesForRealityTouchpointByCID( sessionStorage.getItem("ClientId")).subscribe({next:(res:any)=>{
if(res.message==="No RealityTouchpointAssignmnt found."){
this.isLoading=false;
}else{
  this.allRealityTouchpoinStages=res.data;
  this.isLoading=false;
}
   
  },error:(err)=>{console.log},complete:()=>{}})
}

openPopup(id:number){
  const dialogRef = this.dialog.open(InfochartComponent, {
    width: '1200px',
    height: '700px',
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe(() => {
  });
}

openPopup2(): void {
  const dialogRef = this.dialog.open(AssignrealitytouchpointComponent, {
    width: '500px',
    height: '350px',
    disableClose: true,
    data: { name: 'Survey List'},
  });
  dialogRef.afterClosed().subscribe(() => {
    this.getAllAssignedStagesByClientId();
  });
}

openEmpTouchpoint(touchPointAssignmtId:number): void {
  const dialogRef = this.dialog.open(StarttouchpointComponent, {
    width: '800px',
    height: '650px',
    disableClose: true,
    data:{touchPointAssignmtId:touchPointAssignmtId}
  });
  dialogRef.afterClosed().subscribe(() => {
  });
}

onDeleteRealityTouchpoint(item:any){
  const dialogRef = this.dialog.open(DeleteComponent, {
    data: {
      message: `Do you really want to delete the records for stage ${item.stage} ?`,
    },
    disableClose:true
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result.action == 'ok') {
      this.service.deleteAssignmentForRealityTouchpointByID(item.id).subscribe((res: any) => {
        if (res.success) {
          this.tostr.success(res.message);
          this.getAllAssignedStagesByClientId();
        }
      });
    }
  });
}
}
