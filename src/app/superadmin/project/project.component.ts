import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import {ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

 
  constructor(public dialog: MatDialog, private observer: BreakpointObserver,private activatedRoute:ActivatedRoute,private router:Router) {}


  ngOnInit() {
   this.activatedRoute.params.subscribe(params=>{
    const id= params['id']
    console.log(id);
    sessionStorage.setItem("ClientId",id)
   })
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
      // console.log('open')
    }
  }


  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth'])
  }
  public isExpanded = false;
}
