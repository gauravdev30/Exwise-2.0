import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrl: './project-admin.component.css'
})
export class ProjectAdminComponent implements OnInit {
  filterToggle: boolean = false;
  details: any;
  info: any;
  constructor(public dialog: MatDialog, private service: ProjectService, private toaster:ToastrService) { }

  ngOnInit(): void {
   this.getAllUsers();
  }

  getAllUsers(){
    this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe((res: any) => {
      console.log(res);
      this.details = res.data
      this.onclick(this.details[0].id)
    });
  }

  onclick(id: any) {
    console.log(id);

    this.service.getByUserID(id).subscribe((res: any) => {
      console.log(res);
      this.info = res;
      console.log(this.info);

    })
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  editUser(userId:number){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: { name: 'edit-user',id:userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  deleteUser(userId:number){
    this.service.deleteUser(userId).subscribe((res)=>{
      if(res.success){
        this.toaster.success(res.message,'Success');  
        this.getAllUsers();
      }
    })
  }

  itemsCard: any[] = [
    { name: 'Priyanka', email: 'priya@yopmail.com', number: '98745965847', Date: '22/02/2024', Status: 'complete' },
    { name: 'Riya', email: 'riya@yopmail.com', number: '8745965847', Date: '22/02/2024', Status: 'complete' },
    { name: 'Priyak', email: 'priyank@yopmail.com', number: '745965847', Date: '22/02/2024', Status: 'complete' },
    { name: 'ankita', email: 'ankita@yopmail.com', number: '845965847', Date: '22/02/2024', Status: 'complete' },
    { name: 'kaveri', email: 'kaveri@yopmail.com', number: '875965847', Date: '22/02/2024', Status: 'complete' }
  ]
}
