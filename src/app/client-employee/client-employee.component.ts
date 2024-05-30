import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { EmployeeService } from './service/employee.service';

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

 
  constructor(public dialog: MatDialog, private observer: BreakpointObserver, private router:Router,private service:EmployeeService) {}


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
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
      // if (e.target.value.length > 0) {
      //   this.router.navigate(['clientEmployee/dashboard']);
      //   this.service.searchclientOpen(e.target.value).subscribe({
      //     next: (res: any) => {
      //       this.service.getResult(res);
      //     },
      //   });
      // } else {
      //   this.router.navigate(['clientEmployee/dashboard']);
      //   this.service.getResult([]);
      // }
    } 
  

  }

  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth/userlogin'])
  }
}
