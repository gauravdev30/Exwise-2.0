import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent {
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
}
