import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrl: './pinned.component.css',
})
export class PinnedComponent {
  data: any[] = [];
  pinClients: any[] = [];
  isPopupOpen: boolean = false;
  page: any = 1;
  size: any = 10;
  sortBy: any = 'id';
  p: number = 1;
  itemPerPage: number = 9;
  status: string = '';
  phases: any[] = ['Listen', 'Analyse', 'Share', 'Co-Create'];
  totalItems: number = 10;

  constructor(
    private api: ApiService,
    private router: Router,
    private tosatr: ToastrService,
    private dialog: MatDialog
  ) {}

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }
  pageChangeEvent(event: number) {
    this.page = event;
    this.getPinnedClients();
  }
  ngOnInit(): void {
    this.getPinnedClients();
  }

  getPinnedClients() {
    this.api.getAllPinClients().subscribe((res: any) => {
      console.log(res.message);
      if (res.message) {
        this.pinClients = res.data;
      }
    });
  }

  setClientId(event: MouseEvent, id: any) {
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
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
            this.getPinnedClients();
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
        this.getPinnedClients();
      }
    });
  }

  getClientsByStatus(status: any) {
    this.api.getClientListByStatus(status).subscribe(
      (res: any) => {
        this.pinClients = [];
        if (res.success) {
          this.pinClients = res.data;
          console.log('Client by status=>' + res.data);
          console.log(res.message);
        } else {
          this.tosatr.error(res.message);
        }
      },
      (error) => {
        this.tosatr.error('Clients Not Found..!!');
      }
    );
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
          const dataIndex = this.pinClients.findIndex(
            (data) => data.id == val.data.clientId
          );
          this.pinClients[dataIndex].consultinghaseName = val.data.phaseName;
        }
      },
      error: (err) => {
        this.tosatr.error(err);
      },
    });
  }
}
