import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component';
import { InfoComponent } from '../info/info.component';
import { AssignComponent } from '../assign/assign.component';
import { SearchService } from '../../services/search.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-recent2',
  templateUrl: './recent2.component.html',
  styleUrl: './recent2.component.css'
})
export class Recent2Component {
  data: any;
  pinClients: any;
  isLoading:boolean=false;
  isPopupOpen: boolean = false;
  pendingCount: any;
  newCount: any;
  closedCount: any;
  openCount: any;
  cardsCircle: any[] = [];
  orderBy:any = 'asc'; 
  page:any = 0;
  size:any = 10;
  sortBy:any = 'id';
  totalItems: number = 10;
    itemPerPage: number = 10;
  phases: any[] = ['Listen', 'Analyse', 'Share', 'Co-Create'];
  constructor(
    private api: ApiService,
    private router: Router, private route: ActivatedRoute,
    private tosatr: ToastrService,
    private dialog: MatDialog,
    public service:SearchService
  ) {}

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.api.getCountOfClients().subscribe((res: any) => {
      if (res.success) {
        this.isLoading=false
        this.cardsCircle = res.data;
        this.pendingCount = res.data.pendingCount;
        this.newCount = res.data.newCount;
        this.closedCount = res.data.closedCount;
        this.openCount = res.data.openCount;
        console.log(this.cardsCircle);
      }
    });

    this.service.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.isLoading=false
          this.getAllRecent();
        } else {
          if (res.success) {
            this.isLoading=false
            this.data = res.data;
          } else {
            this.data = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });
  }
  changeablePhases(phase: any): any {
    return this.phases.filter((val) => val != phase);
  }

  changePhase(item: any, phase: any) {
    const obj = {
      clientId: item.id,
      createdDate: null,
      description: null,
      doc: null,
      endDate: null,
      id: 0,
      loggedUserId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
      phaseName: phase,
      startDate: null,
    };
    this.api.createPhase(obj).subscribe({
      next: (val) => {
        if (val.success) {
          this.tosatr.success(val.message);
          const dataIndex = this.data.findIndex(
            (data:any) => data.id == val.data.clientId
          );
          this.data[dataIndex].consultinghaseName = val.data.phaseName;
        }
      },
      error: (err) => {
        this.tosatr.error(err);
      },
    });
  }
  openPopup(id:any): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '750px',
      height: '500px',
      disableClose: true,
      data: { name: 'Survey List',id:id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['superadmin/info'], {
        relativeTo: this.route,
      });
    });
  }
  openPopup2(id:any): void {
    const dialogRef = this.dialog.open(AssignComponent, {
      width: '750px',
      height: '500px',
      disableClose: true,
      data: { name: 'Survey List',id:id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['superadmin/assign'], {
        relativeTo: this.route,
      });
    });
  }
getAllRecent(){
  this.api.getAllClient(this.orderBy,this.page,this.size,this.sortBy).subscribe((res: any) => {
    if (res.success) {
      this.data = res.data;
      this.totalItems=res.totalItems;
    }
    console.log(res.data);
  });
}

pageChangeEvent(event: number) {
  this.page = event;
  this.getAllRecent();
}


  // pinnedClients() {
  //   console.log('pinned');
  //   this.api.getAllPinClients().subscribe((res: any) => {
  //     console.log(res.message);
  //     if (res.message) {
  //       this.pinClients = res.data;
  //     }
  //   });
  // }

  setClientId(event: MouseEvent, id: any) {
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    } else if (
      (<HTMLElement>event.target).classList.contains('ellipsis-button2')
    ) {
      event.stopPropagation();
    }else if((<HTMLElement>event.target).classList.contains('ellipsis-button3')) {
      event.stopPropagation(); 
    }else{
      this.router.navigate(['superadmin/project/', id]);
    }
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
  }

  editClient(clientId: any) {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '700px',
      height: '550px',
      disableClose: true,
      data: { name: 'create-project', clientId: clientId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  deleteClient(client: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        message: `Do you really want to delete the records for ${client.clientName} ?`,
      },
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'ok') {
        this.api.deleteClient(client.id).subscribe((res: any) => {
          if (res.success) {
            this.tosatr.success(res.message);
            this.getAllRecent();
          }
        });
      }
    });
  }

  pinClient(clientId: number) {
    this.api.pinClinet(clientId).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res.message);
          this.tosatr.success(res.message);
        }
      },
      (error) => {
        this.tosatr.error('Cliet Already Pinned');
      }
    );
  }

  unpinClient(clientId: number) {
    this.api.unPinClient(clientId).subscribe((res: any) => {
      if (res.success) {
        console.log(res.message);
      }
    });
  }

  getClientsByStatus(status: any) {
    this.api.getClientListByStatus(status).subscribe(
      (res: any) => {
        this.data = null;
        if (res.success) {
          this.data = res.data;
          console.log('Client by status=>' + res.data);
          console.log(res.message);
        } else {
          this.tosatr.error(res.message);
        }
      },
      (error: any) => {
        this.tosatr.error('Clients Not Found..!!');
      }
    );
  }
}
