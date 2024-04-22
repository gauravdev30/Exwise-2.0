import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeIcon: string = 'add-circle-outline';
  data:any;
  attract:any=20;
  onboard:any=20;
  develop:any=20;
  retain:any=20;
  seperate:any=20;

  constructor(private api:ProjectService,private tosatr:ToastrService,) { }
  getClientsByStatus(status:any){
    this.api.getClientListByStatus(status).subscribe((res:any)=>{
      this.data=null;
      if(res.success){
        this.data=res.data;
        console.log('Client by status=>'+res.data)
        console.log(res.message);
      }
      else{
        this.tosatr.error(res.message);
      }
    },(error)=>{
      this.tosatr.error('Clients Not Found..!!');
    })
  }
  change(iconName: string) {
    this.activeIcon = iconName;
  }
}
