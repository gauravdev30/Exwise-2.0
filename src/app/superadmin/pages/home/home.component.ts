import { Component } from '@angular/core';

import { Superadmin } from '../../services/superadmin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api:Superadmin){}
  data:any;
    ngOnInit(): void {
      console.log("test");
      
    this.api.getClient().subscribe((res)=>{
      console.log(res.data);
this.data=res.data
    })
  }
}
