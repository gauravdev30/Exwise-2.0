import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { EmployeeService } from './service/employee.service';
import { SearchuserService } from './service/searchuser.service';
import { MessageService } from '../message.service';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  title: string;
  body: string;
  image: string;
  time: string;
  unreadCount: number;
}
@Component({
  selector: 'app-client-employee',
  templateUrl: './client-employee.component.html',
  styleUrl: './client-employee.component.css'
})
export class ClientEmployeeComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  message:any;
  showNotifications = false;
  notifications: Notification[] = [];
  unreadNotificationsCount: number = 0;
 id:any;
  constructor(public dialog: MatDialog, private observer: BreakpointObserver,
    private searchservice:SearchuserService,
     private router:Router,private service:EmployeeService,private messagingService: MessageService) {}


  ngOnInit() {
    this.id=JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id
    console.log(this.id);
    
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.service.getNotifications(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe((res:any)=>{console.log(res);
      if (res.success) {
        this.notifications = res.data.map((notification:any) => ({
          title: notification.title,
          body: notification.message,
          image: 'assets\default_avatar.png', // Add a default image or fetch from notification data if available
          time: formatDistanceToNow(new Date(notification.dateAndTime), { addSuffix: true }),
          unreadCount: notification.isNotificationRead ? 0 : 1
        }));
        this.unreadNotificationsCount = this.notifications.reduce((count, notification) => count + notification.unreadCount, 0);
      }
    })
  

  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  expandNavBar() {
    console.log('open')
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  public isExpanded = false;

  searh(e: any) {
    const url = this.router.routerState.snapshot.url.replace('/', '');
    console.log(url);
    console.log(e);
    
    this.router.navigate([url]);
    if (url == 'clientEmployee') {
      console.log("target value",e);
      
      if (e.target.value.length > 0) {
        this.router.navigate(['clientEmployee']);

        // this.service.searchclientRecent(e.target.value).subscribe({
        //   next: (res: any) => {
        //     console.log(res);
            
        //     this.service.getResult(res);
        //   },
        // });
      } else {
        this.router.navigate(['clientEmployee']);
        // this.service.getResult([]);
      }
    }
     else if (url == 'clientEmployee/dashboard') {
      if (e.target.value.length > 0) {
        this.router.navigate(['clientEmployee/dashboard']);
        this.searchservice.searchres(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id,e.target.value).subscribe({
          next: (res: any) => {
            this.searchservice.getResult(res);
          },
        });
      } else {
        this.router.navigate(['clientEmployee/dashboard']);
        this.searchservice.getResult([]);
      }
    } 
  else if(url=='clientEmployee/reminder'){
    console.log(url);
    
      if (e.target.value.length > 0) {
        this.router.navigate(['clientEmployee/reminder']);
        this.searchservice.searchreminder(e.target.value, JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe({
          next: (res: any) => {
            this.searchservice.getResult(res);
            console.log(res);
            
          },
        });
      } else {
        this.router.navigate(['clientEmployee/reminder']);
        this.searchservice.getResult([]);
      }
  }
  else if(url == 'clientEmployee/faq'){
    if (e.target.value.length > 0) {
      this.router.navigate(['clientEmployee/faq']);
      this.searchservice.setSearchKeyword(e.target.value)
    } else {
      this.router.navigate(['clientEmployee/faq']);
      this.searchservice.setSearchKeyword([]);
    }
   
  }

  }

  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth/userlogin'])
  }
}
