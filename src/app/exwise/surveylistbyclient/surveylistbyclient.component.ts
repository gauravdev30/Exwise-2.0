import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveylistbyclientPopupComponent } from './surveylistbyclient-popup/surveylistbyclient-popup.component';

@Component({
  selector: 'app-surveylistbyclient',
  templateUrl: './surveylistbyclient.component.html',
  styleUrl: './surveylistbyclient.component.css'
})
export class SurveylistbyclientComponent {
  items: any[] = [
    { surveyName: 'FUDS', surveyType:'FUDS', dateCreated: '2022-01-01', description: 'FUDS survey description', createdBy:'Kate',completionstatus:'Completed'},
    { surveyName: 'FUDS', surveyType:'FUDS', dateCreated: '2022-01-01', description: 'FUDS survey description', createdBy:'Kate',completionstatus:'Not completed'},
    { surveyName: 'FUDS', surveyType:'FUDS', dateCreated: '2022-01-01', description: 'FUDS survey description', createdBy:'Kate',completionstatus:'Completed'},
  ];

  constructor(public dialog: MatDialog) {}

  openPopup(name:any): void {
    const dialogRef = this.dialog.open(SurveylistbyclientPopupComponent, {
      width: '1200px',
      height: '600px',
      disableClose: true,
      data: { name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
  }
}

