import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateDialogComponent } from '../profile-update-dialog/profile-update-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.profileInfo = JSON.parse(
      sessionStorage.getItem('currentLoggedInUserData')!
    );
  }
  onEdit() {
    const dialogRef = this.dialog.open(ProfileUpdateDialogComponent, {
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.profileInfo = JSON.parse(
          sessionStorage.getItem('currentLoggedInUserData')!
        );
      }
    });
  }
}
