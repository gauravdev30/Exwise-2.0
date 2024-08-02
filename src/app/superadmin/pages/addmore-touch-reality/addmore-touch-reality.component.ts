import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-addmore-touch-reality',
  templateUrl: './addmore-touch-reality.component.html',
  styleUrl: './addmore-touch-reality.component.css'
})
export class AddmoreTouchRealityComponent implements OnInit {
  selectedSubphase: any;
  tabName: any;
  fetchedTouchpoints:any;
  fetchedRealityComponents:any;

  constructor(
    public dialogRef: MatDialogRef<AddmoreTouchRealityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selectedSubphase = data.subphase;
    this.tabName = data.tabName;
  }


  ngOnInit(): void {
    
  }

  searchTouchPoint(event:any){

  }

  toggleTouchpointSelection(touchpoint:any){

  }

  onSubmitTouchpoint(){

  }

  searchRealityComponnt(event:any){

  }

  toggleRealityComponentSelection(touchpoint:any){

  }

  onSubmitRealityComponent(){

  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  

}
