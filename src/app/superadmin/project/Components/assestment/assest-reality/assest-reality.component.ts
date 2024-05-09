import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { CreateRealityAssestComponent } from './create-reality-assest/create-reality-assest.component';
import { StatRealityComponent } from './stat-reality/stat-reality.component';

@Component({
  selector: 'app-assest-reality',
  templateUrl: './assest-reality.component.html',
  styleUrl: './assest-reality.component.css'
})
export class AssestRealityComponent {
  data: any;
  pinClients: any;
  isPopupOpen: boolean = false;
  pendingCount: any;
  newCount: any;
  closedCount: any;
  openCount: any;
  cardsCircle: any[] = [];
  orderBy:any = 'desc'; 
  page:any = 1;
  size:any =10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 9;

  totalItems: number = 10;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private tosatr: ToastrService,
private router:Router
  ) {}

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }
  pageChangeEvent(event: number) {
    this.page = event;

  }
  ngOnInit(): void {
    this.api.getAllRealityComponent().subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
    console.log(this.data);
    
      }
    });

  }

  openPopup(): void {
    const dialogRef = this.dialog.open(CreateRealityAssestComponent, {
      width: '450px',
      height: '450px',
      disableClose: true,
    });
   dialogRef.afterClosed().subscribe(() => {
      // this.router.navigate(['superadmin/component']);
    });
  }
  edit(surveyId: number) {
    // const dialogRef = this.dialog.open(RealityComponent, {
    //   width: '800px',
    //   height: '530px',
    //   disableClose: true,
    //   data: { surveyId: surveyId },
    // });
    // dialogRef.afterClosed().subscribe(() => {
 
    // });
  }
  openPopupReality(){
    const dialogRef = this.dialog.open(StatRealityComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
    });
   dialogRef.afterClosed().subscribe(() => {
      // this.router.navigate(['superadmin/component']);
    });
  }
  delete(surveyId: number) {
    this.api.deleteCompoent(surveyId).subscribe((res:any) => {
      console.log(res);
      window.location.reload();
      if (
        res.message ===
        'ComponentForReality deleted successfully.'
      ) {
        this.tosatr.success(
          'Survey type and associated stages deleted successfully.'
        );
        window.location.reload();
      }
    });
  }
}
