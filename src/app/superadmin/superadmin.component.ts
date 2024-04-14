import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CreateclientComponent } from './createclient/createclient.component';

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

 
  constructor(public dialog: MatDialog, private observer: BreakpointObserver, private router:Router) {}


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

  openPopup(): void {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      data: { name: 'create-project'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
  }

  public isExpanded = false;


  OnLogout() {
    this.router.navigate(['/auth'])
  }
}
