import { Component, OnInit } from '@angular/core';
import { CreateclientComponent } from '../../../createclient/createclient.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrl: './project-admin.component.css'
})
export class ProjectAdminComponent implements OnInit {
  filterToggle: boolean = false;
details:any;
info:any;
  constructor(public dialog: MatDialog,private service:ProjectService) {}

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
  itemsCard:any[]=[
    { name: 'Priyanka', email: 'priya@yopmail.com',number:'98745965847',Date:'22/02/2024',Status:'complete' },
    { name: 'Riya', email: 'riya@yopmail.com',number:'8745965847',Date:'22/02/2024',Status:'complete' },
    { name: 'Priyak', email: 'priyank@yopmail.com',number:'745965847',Date:'22/02/2024',Status:'complete' },
    { name: 'ankita', email: 'ankita@yopmail.com',number:'845965847',Date:'22/02/2024',Status:'complete' }, 
    { name: 'kaveri', email: 'kaveri@yopmail.com',number:'875965847',Date:'22/02/2024',Status:'complete' }
  ]
}
