import { Component, OnInit } from '@angular/core';
import { CreateclientComponent } from '../../../createclient/createclient.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionListComponent } from '../question-list/question-list.component';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrl: './project-admin.component.css'
})
export class ProjectAdminComponent implements OnInit {
  filterToggle: boolean = false;
details:any;
info:any;
  constructor(public dialog: MatDialog,private service:ProjectService, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
      this.service.getUserByClientID(sessionStorage.getItem("ClientId")).subscribe((res:any)=>{console.log(res);
        this.details=res.data
        this.onclick(this.details[0].id)
      })
  }
  onclick(id:any){
    console.log(id);
    
    this.service.getByUserID(id).subscribe((res:any)=>{console.log(res);
      this.info=res;
      console.log(this.info);
      
    })
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '750px',
      height: '500px',
      disableClose: true,
      data: { name: 'create-user' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['project-admin'], {
        relativeTo: this.route,
      });
    });
  }

  openUpdate(id:any): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '750px',
      height: '600px',
      disableClose: true,
      data: { name: 'update-user',id:id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['project-admin'], {
        relativeTo: this.route,
      });
    });
  }
}
