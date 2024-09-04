import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CreateclientComponent } from './createclient/createclient.component';
import { SearchService } from './services/search.service';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { MessageService } from '../message.service';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
isNotificationRead: any;
  title: string;
  body: string;
  image: string;
  time: string;
  unreadCount: number;
}
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.css'
})
export class SuperadminComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  message:any;
  showNotifications = false;
  notifications: Notification[] = [];
  unreadNotificationsCount: number = 0;
  isNotificationRead: any; 
  constructor(public dialog: MatDialog, private observer: BreakpointObserver, private router:Router,public service:SearchService,private messagingService: MessageService) {}


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.service.getNotifications(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.notifications = res.data.notifications.map((notification: any) => ({
          title: notification.title,
          body: notification.message,
          image: 'assets/default_avatar.png', // Add a default image or fetch from notification data if available
          time: formatDistanceToNow(new Date(notification.dateAndTime), { addSuffix: true }),
          isNotificationRead: notification.isNotificationRead 
        }));
        this.unreadNotificationsCount = res.data.count;
      }
    });
  }
  onreadNotification(){
    this.service.readNotifications(JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id).subscribe((res:any)=>{console.log(res);
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

  openProfilePopUp(){
    const dialogRef = this.dialog.open(AdminProfileComponent, {
      width: '1200px',
      height: '650px',
      disableClose: true,
    });
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '700px',
      height: '650px',
      disableClose: true,
      data: { name: 'create-project'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
  }

  public isExpanded = false;

  searh(e: any) {
    const url = this.router.routerState.snapshot.url.replace('/', '');
    console.log(url);
    console.log(e);
    
    this.router.navigate([url]);
    if (url == 'superadmin/recent') {
      console.log("target value",e);
      
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/recent']);

        this.service.searchclientRecent(e.target.value).subscribe({
          next: (res: any) => {
            console.log(res);
            
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/recent']);
        this.service.getResult([]);
      }
    }
     else if (url == 'superadmin/open') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/open']);
        this.service.searchclientOpen(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/open']);
        this.service.getResult([]);
      }
    } 
    else if (url == 'superadmin/home/recent/all') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/home/recent/all']);
        this.service.searchclientOpen(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/home/recent/all']);
        this.service.getResult([]);
      }
    } 
    else if (url == 'superadmin/home/pinned') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/home/pinned']);
        this.service.searchclientOpen(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/home/pinned']);
        this.service.getResult([]);
      }
    } 
    else if (url == 'superadmin/sup-question') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/sup-question']);
        this.service.searchquestion(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/sup-question']);
        this.service.getResult([]);
      }
    } 
    else if( url.includes("assign-question-to-survey")){
      if (e.target.value.length > 0) {
        this.router.navigate([url]);
        this.service.searchquestion(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate([url]);
        this.service.getResult([]);
      }
    }
    else if (url == 'superadmin/sup-survey/sup-surveylist') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/sup-survey/sup-surveylist']);
        this.service.searchsurvey(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/sup-survey/sup-surveylist']);
        this.service.getResult([]);
      }
    } 
    else if (url == 'superadmin/events') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/events']);
       console.log('superadmin event search executed');
       
        this.service.searchinterviews(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/events']);
        this.service.getResult([]);
      }
    } 
    else if(url == 'superadmin/faq'){
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/faq']);
        this.service.setSearchKeyword(e.target.value)
      } else {
        this.router.navigate(['superadmin/faq']);
        this.service.setSearchKeyword([]);
      }
     
    }else if(url.includes('superadmin/details')){
      if(e.target.value.length > 0) {
        this.router.navigate([url])
        this.service.searchQuestions(JSON.parse(sessionStorage.getItem("isStaticSurvey")!),e.target.value,JSON.parse(sessionStorage.getItem("subphaseId")!)).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
        
      }
      else {
        this.router.navigate([url])
        console.log(url);
        
        this.service.getResult([]);
      }
    }
    // else if (url == 'superadmin/details/:id/:status') {
    //   if (e.target.value.length > 0) {
    //     this.router.navigate(['superadmin/events']);
    //     this.service.searchinterviews(e.target.value).subscribe({
    //       next: (res: any) => {
    //         this.service.getResult(res);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['superadmin/events']);
    //     this.service.getResult([]);
    //   }
    // } 
  }

  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth'])
  }

  isDashboardActive(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/superadmin' || currentRoute.startsWith('/superadmin/home');
  }
}
