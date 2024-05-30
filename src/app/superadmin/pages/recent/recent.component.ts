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
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css',
})
export class RecentComponent {
  data: any[] = [];
  pinClients: any;
  isPopupOpen: boolean = false;
  page: any = 1;
  size: any = 10;
  sortBy: any = 'id';
  isLoading:boolean=false;
  itemPerPage: number = 10;
  status: string = '';
  phases: any[] = ['Listen', 'Analyse', 'Share', 'Co-Create'];
  statusArray: any[] = ['new', 'open', 'closed', 'pending'];
  totalItems: number = 10;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private tosatr: ToastrService,
    private dialog: MatDialog,
    public service: SearchService
  ) {}

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }
  pageChangeEvent(event: number) {
    this.page = event;
    this.getAllRecent();
  }
  ngOnInit(): void {
    this.isLoading=true
    this.route.params.subscribe((params: any) => {
      this.status = params.status;
      // this.status = this.status ? this.status : params.status;
      if (params.status == 'all') {
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
      } else {
        this.api.getClientListByStatus(this.status).subscribe({
          next: (res: any) => {
            this.data = [];
            if (res.success) {
              this.tosatr.success(res.message);
              this.data = res.data;
            } else {
              this.tosatr.error(res.message);
            }
          },
          error: (error: any) => {
            this.data = [];
            console.log(error);
          },
        });
      }
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
            (data) => data.id == val.data.clientId
          );
          this.data[dataIndex].consultinghaseName = val.data.phaseName;
        }
      },
      error: (err) => {
        this.tosatr.error(err);
      },
    });
  }

  changeableStatus(status: any): any {
    return this.statusArray.filter((val) => val != status);
  }

  changeStatus(item: any, status: any) {
    console.log(item,status);
    
    const obj = {
  
   id:item,
      loggedUserId: JSON.parse(
        sessionStorage.getItem('currentLoggedInUserData')!
      ).id,
    status:status,
    
    };
    console.log(obj);
    
    this.api.updateClientById(item,obj).subscribe({
      next: (val) => {
        console.log(val);
        
        if (val.success) {
          this.tosatr.success(val.message);
  
        }
      },
      error: (err) => {
        this.tosatr.error(err);
      },
    });
  }
  openPopup(id: any): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '750px',
      height: '500px',
      disableClose: true,
      data: { name: 'Survey List', id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
      this.router.navigate(['superadmin/info'], {
        relativeTo: this.route,
      });
    });
  }

  getAllRecent() {
    this.api
      .getAllClient('desc', this.page - 1, this.size, this.sortBy)
      .subscribe((res: any) => {
        if (res.success) {
          this.isLoading=false
          this.data = res.data;
          this.totalItems=res.totalItems;
        }
      });
  }

  setClientId(event: MouseEvent, id: any) {
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    } else if (
      (<HTMLElement>event.target).classList.contains('ellipsis-button2')
    ) {
      event.stopPropagation();
    } else if (
      (<HTMLElement>event.target).classList.contains('ellipsis-button3')
    ) {
      event.stopPropagation();
    } else {
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
      disableClose: true,
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
    this.api.pinClinet(clientId).subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log(res.message);
          this.tosatr.success(res.message);
        }
      },
      error: (error: any) => {
        this.tosatr.error('Cliet Already Pinned');
      },
    });
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
        this.data = [];
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
        this.data = [];
        console.log(error);
      }
    );
  }
}
