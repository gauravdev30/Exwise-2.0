import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';

@Component({
  selector: 'app-projectadmin',
  templateUrl: './projectadmin.component.html',
  styleUrl: './projectadmin.component.css'
})
export class ProjectadminComponent {
  filterToggle: boolean = false;

  constructor(public dialog: MatDialog) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
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
