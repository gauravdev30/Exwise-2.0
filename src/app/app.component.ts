import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'exwise';
//   constructor(private messagingService:MessageService ){}
// ngOnInit(): void {
//   this.messagingService.requestPermission();
//   this.messagingService.receiveMessage().subscribe(
//     (message) => {
//       console.log(message);
//     });
// }
}



// http://localhost:4200/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYXVyYXZkYWdkdUB5b3BtYWlsLmNvbSIsImV4cCI6MTcwOTg2NDQyNywiaWF0IjoxNzA5ODI4NDI3fQ.GVrz-pFzblbOjqqfmJK5GYArxItjA78W_-4Y3mBU9A4