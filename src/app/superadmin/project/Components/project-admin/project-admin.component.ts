import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchService } from '../../services/search.service';
import { DeleteComponent } from '../../../pages/delete/delete.component';

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
  page: any = 1;
  size: any = 10;
  sortBy: any = 'name';
  orderBy:any = 'asc';
  itemPerPage: number = 10;
  totalItems: number = 0;
  isSelectedFileValid: boolean = false;
  checkDownloadExcelSpinner:boolean = false;

  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private service: ProjectService,
    private toaster: ToastrService,
    private searchservice:SearchService
  ) {}

  ngOnInit(): void {
    this.searchservice.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.getAllUsers();
        } else {
          if (res.success) {
            this.details = res.data;
          } else {
            this.details = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });

  }

  getAllUsers() {
    this.isLoading = true;
    this.service.getUserByClientIDWithPagination(sessionStorage.getItem('ClientId'),this.orderBy,this.page-1,this.size,this.sortBy).subscribe({next:(res)=>{
      this.isLoading = false;
          this.details = res.data;
          this.onclick(this.details[0].id);
          this.totalItems = res.totalItems;
    },error:(err)=>{console.log(err)},complete:()=>{}});
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllUsers();
  }

  onclick(id: any) {
    console.log(id);

    this.service.getByUserID(id).subscribe((res: any) => {
      // console.log(res);
      this.info = res;
      // console.log(this.info);
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

 
  deleteUser(user:any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to deactivate user ${user.name}?`,
      },
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.service.deleteUser(user.id).subscribe((res) => {
          if (res.success) {
            this.toaster.success('User deactivated successfully', 'Success');
            this.getAllUsers();
          }
        });
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
  console.log(formData);
  
    this.service.uploadUserfromExcel(sessionStorage.getItem('ClientId'),formData).subscribe({
      next: (res:any) => {
        console.log(res);
        if(res?.savedUsers?.length > 0){
           this.getAllUsers();
           this.toaster.success('Users registered suceessfully');
        }
        this.isSelectedFileValid=false;
        if (res?.errors?.length > 0) {
          const errorMessage = res.errors.join('\n');
          this.toaster.error(errorMessage);
        }
      
        if(res.message==="Some records were skipped due to validation errors."){
          this.toaster.error("Some records were skipped due to validation errors.");
          this.isSelectedFileValid=false;
        }else if(res.message==="File uploaded and user data saved successfully!"){
          this.toaster.success("File uploaded and user data saved successfully!");
          this.isSelectedFileValid=false;
          this.getAllUsers()
        }else{}
        // window.location.reload();
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

  downloadExcelFormat() {
    this.checkDownloadExcelSpinner=true;
    this.service.getExcelFile().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'userUploadFormat.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.checkDownloadExcelSpinner=false;
    }, error => {
      console.error('Download error:', error);
    });
  }
}
