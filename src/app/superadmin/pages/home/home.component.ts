import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api:ApiService){}
  
  ngOnInit(): void {
    this.api.getAllClient().subscribe((res)=>{
      console.log(res.message)
    })
  }
}
