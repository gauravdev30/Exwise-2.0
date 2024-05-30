import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TouchpointService } from '../../../../services/touchpoint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignrealitytouchpoint',
  templateUrl: './assignrealitytouchpoint.component.html',
  styleUrl: './assignrealitytouchpoint.component.css'
})
export class AssignrealitytouchpointComponent implements OnInit {
  whyThisIsImportant:any;
  selectedOption: string = '';
  allRealityToucpoint:any[]=[];
  realityTouchpointID:any;
  assignRealityTouchpointForm!: FormGroup;
  errorMessage: boolean = false;

  constructor(private dialogRef: MatDialogRef<AssignrealitytouchpointComponent>,private service:TouchpointService, private fb: FormBuilder,private tostr:ToastrService){}

  ngOnInit() {
    this.getAllTouchPointsStages();
    this.assignRealityTouchpointForm = this.fb.group({
  
      realityTouchpointStageId:['',Validators.required],

  
    });
  }

  getAllTouchPointsStages(){
    this.service.getAllTouchPointsStages().subscribe({next:(res)=>{
      this.allRealityToucpoint=res.data;
      console.log(this.allRealityToucpoint);
      
      console.log(res);
      
    },error:(err)=>{console.log(err)},complete:()=>{}})
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onChangeOfStage(event:any){
    this.realityTouchpointID=event.target.value;
    this.errorMessage=false;
    console.log(event.target.value);
    
  }

  assign(){
 
  const obj={
    active: true,
    clientId: sessionStorage.getItem("ClientId"),
    loggedUserId: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,
    realityTouchpointStageId: this.realityTouchpointID,
    startDate: new Date(),
    status: "active",
    
    whyThisIsImportant: this.whyThisIsImportant
  }

  console.log(obj);

    this.service.createRealityTouchpointStageAssignment(obj).subscribe({next:(res)=>{
      this.tostr.success(res.message);
      this.onClose();
      this.getAllTouchPointsStages()
    },error:(err)=>{console.log(err)},complete:()=>{}})


    }
}
