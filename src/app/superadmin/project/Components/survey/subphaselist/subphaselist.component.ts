import { Component } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-subphaselist',
  templateUrl: './subphaselist.component.html',
  styleUrl: './subphaselist.component.css'
})
export class SubphaselistComponent {
subphaseList:any;

constructor(private dialog:MatDialog){}

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
    data: { id: 3},
  });
}


}
