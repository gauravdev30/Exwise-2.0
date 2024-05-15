import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CreateclientComponent } from './createclient/createclient.component';
import { SearchService } from './services/search.service';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';

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

 
  constructor(public dialog: MatDialog, private observer: BreakpointObserver, private router:Router,public service:SearchService) {}


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
    } else if (url == 'superadmin/open') {
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
    else if (url == 'superadmin/home/recent') {
      if (e.target.value.length > 0) {
        this.router.navigate(['superadmin/home/recent']);
        this.service.searchclientOpen(e.target.value).subscribe({
          next: (res: any) => {
            this.service.getResult(res);
          },
        });
      } else {
        this.router.navigate(['superadmin/home/recent']);
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
  }
  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth'])
  }
}
