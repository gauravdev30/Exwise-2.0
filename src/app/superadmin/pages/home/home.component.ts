import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cardsCircle:any[]=[
    { name: 'New', count: '2' },
    { name: 'Open', count: '2' },
    { name: 'Closed', count: '2' },
    { name: 'Pending', count: '2' },
  ]
  constructor(private api:ApiService){}
  
  ngOnInit(): void {
    this.api.getAllClient().subscribe((res)=>{
      console.log(res.message);
    })
  }
}
