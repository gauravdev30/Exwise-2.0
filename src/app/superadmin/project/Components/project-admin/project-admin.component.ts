import { Component } from '@angular/core';
import { CreateclientComponent } from '../createclient/createclient.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrl: './project-admin.component.css'
})
export class ProjectAdminComponent {
  filterToggle: boolean = false;

  constructor(public dialog: MatDialog) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '500px',
      height: '600px',
      disableClose: true,
      data: { name: 'create-user'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
  }
}
