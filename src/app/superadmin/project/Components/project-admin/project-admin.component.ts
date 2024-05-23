import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrl: './project-admin.component.css',
})
export class ProjectAdminComponent implements OnInit {
  filterToggle: boolean = false;
  details: any;
  info: any;
  file: any;
  isSelectedFileValid: boolean = false;

  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private service: ProjectService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true;
    this.service
      .getUserByClientID(sessionStorage.getItem('ClientId'))
      .subscribe((res: any) => {
        console.log(res);
        this.isLoading = false;
        this.details = res.data;
        this.onclick(this.details[0].id);
      });
  }

  onclick(id: any) {
    console.log(id);

    this.service.getByUserID(id).subscribe((res: any) => {
      console.log(res);
      this.info = res;
      console.log(this.info);
    });
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: { name: 'Create User' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  editUser(userId: number) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: { name: 'edit-user', id: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  deleteUser(userId: number) {
    this.service.deleteUser(userId).subscribe((res) => {
      if (res.success) {
        this.toaster.success(res.message, 'Success');
        this.getAllUsers();
      }
    });
  }

  itemsCard: any[] = [];

  validateFile() {
    if (
      ![
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ].includes(this.file.type)
    ) {
      this.isSelectedFileValid = false;
    } else {
      this.isSelectedFileValid = true;
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file);
  
    this.service.uploadUserfromExcel(formData).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err) => {},
    });
  }

  onFileBrowse(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement?.files?.[0]; // Get the selected file
    if (this.file) {
      this.validateFile();
    }
  }
}
