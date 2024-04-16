import { Component } from '@angular/core';

import { Superadmin } from '../../services/superadmin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api:Superadmin,private router:Router){}
  data:any;
    ngOnInit(): void {
      console.log("test");
      
    this.api.getClient().subscribe((res)=>{
      console.log(res.data);
this.data=res.data
    })
  }

  getClientByID(id:any){
console.log(id);
this.api.getClientById(id).subscribe((res:any)=>{console.log(res);
  if(res.success){
this.router.navigate(['superadmin/project',id])
  }
})
  }

}
