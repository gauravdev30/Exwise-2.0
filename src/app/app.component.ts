import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { BackgroundProcessService } from './superadmin/project/Components/dashboard/background-process.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'exwise';
  message:any;
  showBackgroundMessage = false;


  constructor(private messagingService: MessageService,private backgroundProcessService: BackgroundProcessService) {}

  notificationTitle: any;
  notificationBody: any;
  notificationSubTitle: any;



  ngOnInit() {
    this.backgroundProcessService.backgroundProcess$.subscribe(
      (show) => (this.showBackgroundMessage = show)
    );
    // this.messagingService.requestPermission();
    // this.messagingService.receiveMessage();
    // this.messagingService.currentMessage.subscribe((message:any) => {
    //   if (message) {
    //     this.message = message;
    //     console.log("Foreground message received:", message);
       
    //   }
    // });
  }

}



// http://localhost:4200/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYXVyYXZkYWdkdUB5b3BtYWlsLmNvbSIsImV4cCI6MTcwOTg2NDQyNywiaWF0IjoxNzA5ODI4NDI3fQ.GVrz-pFzblbOjqqfmJK5GYArxItjA78W_-4Y3mBU9A4