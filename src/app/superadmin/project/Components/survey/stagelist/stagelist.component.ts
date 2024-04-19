import { Component } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-stagelist',
  templateUrl: './stagelist.component.html',
  styleUrl: './stagelist.component.css'
})
export class StagelistComponent {
stageList:any;

constructor(private dialog:MatDialog){}

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
    data: { id: 2},
  })
}
  
}
