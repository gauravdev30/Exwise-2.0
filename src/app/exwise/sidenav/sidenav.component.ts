import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../components/service/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  constructor(private api:ApiService){}
  
  ngOnInit(): void {
    this.api.getAllClient().subscribe((res)=>{
      console.log(res.message)
    })
  }
}
