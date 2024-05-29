import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './services/project.service';
import { SearchService } from './services/search.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  isCpoc: boolean = false;
  clientData: any;
  getId: any;
  constructor(
    public dialog: MatDialog,
    private observer: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProjectService,
    public servicesearch: SearchService
  ) { }

  ngOnInit() {
    // if (JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).typeOfUser==='1'){
    //   console.log(this.isCpoc,"dataaaaaaaaaaaaaaa");

    //   this.isCpoc=false;
    // }
    this.isCpoc = sessionStorage.getItem('isCpoc') == 'true';
    console.log(typeof this.isCpoc);

    console.log(this.isCpoc);

    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getId = params['id'];
      console.log(id);
      sessionStorage.setItem('ClientId', id);
      this.service.clientByID(id).subscribe((res: any) => {
        console.log(res);
        this.clientData = res.data;
        sessionStorage.setItem('ClientData', JSON.stringify(this.clientData));
      });
    });
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  expandNavBar() {
    console.log('open');
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
      // console.log('open')
    }
  }

  searh(e: any) {
    const url = this.router.routerState.snapshot.url.replace('/', '');
    console.log(url);
    console.log(e);
    if (
      url.includes("people-matrix")
    ) {
      if (e.target.value.length > 0) {
        this.servicesearch
          .searchpeoplemetrics(this.getId, e.target.value)
          .subscribe({
            next: (res: any) => {
              console.log(res);

              this.servicesearch.getResult(res);
            },
          });
      } else {
        this.router.navigate([url]);
        this.servicesearch.getResult([]);
      }
    }
    else if (
      url.includes("project-admin")
    ) {
      console.log(url);

      console.log('target value', e);
      if (e.target.value.length > 0) {
        this.router.navigate([url]);
        this.servicesearch.searchUsers(this.getId, e.target.value).subscribe({
          next: (res: any) => {
            console.log(res);

            this.servicesearch.getResult(res);
          },
        });
      } else {
        this.router.navigate([url]);
        this.servicesearch.getResult([]);
      }
    } 
    else if (
      url.includes("surveyInfo")
    ) {
      console.log(url);

      console.log('target value', e);
      if (e.target.value.length > 0) {
        this.router.navigate([url]);
        this.servicesearch.searchSurvey(this.getId, e.target.value).subscribe({
          next: (res: any) => {
            console.log(res);

            this.servicesearch.getResult(res);
          },
        });
      } else {
        this.router.navigate([url]);
        this.servicesearch.getResult([]);
      }
    }
    else if (
      url.includes("focus-group")
    ) {
      console.log(url);

      console.log('target value', e);
      if (e.target.value.length > 0) {
        this.router.navigate([url]);
        this.servicesearch.searchFocusgroup(this.getId, e.target.value).subscribe({
          next: (res: any) => {
            console.log(res);

            this.servicesearch.getResult(res);
          },
        });
      } else {
        this.router.navigate([url]);
        this.servicesearch.getResult([]);
      }
    }
    else if (
      url.includes("meetings/interview")
    ) {
      console.log(url);

      console.log('target value', e);
      if (e.target.value.length > 0) {
        this.router.navigate([url]);
        this.servicesearch.searchevents(e.target.value,this.getId).subscribe({
          next: (res: any) => {
            console.log(res);

            this.servicesearch.getResult(res);
          },
        });
      } else {
        this.router.navigate([url]);
        this.servicesearch.getResult([]);
      }
    }
    else {
      console.log("test");

    }
   
    // else if (url == 'superadmin/home/recent') {
    //   if (e.target.value.length > 0) {
    //     this.router.navigate(['superadmin/home/recent']);
    //     this.service.searchclientOpen(e.target.value).subscribe({
    //       next: (res: any) => {
    //         this.service.getResult(res);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['superadmin/home/recent']);
    //     this.service.getResult([]);
    //   }
    // }
    // else if (url == 'superadmin/home/pinned') {
    //   if (e.target.value.length > 0) {
    //     this.router.navigate(['superadmin/home/pinned']);
    //     this.service.searchclientOpen(e.target.value).subscribe({
    //       next: (res: any) => {
    //         this.service.getResult(res);
    //       },
    //     });
    //   } else {
    //     this.router.navigate(['superadmin/home/pinned']);
    //     this.service.getResult([]);
    //   }
    // }
  }

  OnLogout() {
    sessionStorage.clear();
    this.router.navigate(['/auth/userlogin']);
  }
  public isExpanded = false;
}
