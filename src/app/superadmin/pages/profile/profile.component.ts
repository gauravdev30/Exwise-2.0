import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateDialogComponent } from '../../../client-employee/pages/profile-update-dialog/profile-update-dialog.component';
import { DeleteComponent } from '../../../superadmin/pages/delete/delete.component';
import { EmployeeService } from '../../../client-employee/service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  constructor(private dialog: MatDialog,private api:EmployeeService,private tosatr:ToastrService,private router:Router,private location:Location) {}
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

  onDelete(){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to deactivate your profile ?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.api.deleteUserProfile(this.profileInfo.id).subscribe((res: any) => {
          if (res.message=="User updated successfully.") {
            this.tosatr.success("Profile successfully deactivated");
            window.location.reload();
            sessionStorage.clear();
            this.router.navigate(['/auth/userlogin']);
          }
        });
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
