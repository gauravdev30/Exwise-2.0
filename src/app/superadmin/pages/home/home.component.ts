import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  data: any;
  pinClients: any;
  isPopupOpen: boolean = false;
  pendingCount: any;
  newCount: any;
  allCount: any;
  closedCount: any;
  openCount: any;
  orderBy: any = 'asc';
  page: any = 0;
  size: any = 10;
  sortBy: any = 'id';
  status: string = '';
  activatedTab: string = 'recent';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private tosatr: ToastrService,
    private dialog: MatDialog
  ) {}

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  ngOnInit(): void {
    const splitCurrentRoute = this.router.url.split('/');
    this.status = splitCurrentRoute[splitCurrentRoute.length - 1];

    this.api.getCountOfClients().subscribe((res: any) => {
      if (res.success) {
        this.allCount = Object.values(res.data).reduce(
          (total: any, curr: any) => curr + total,
          0
        );
        this.pendingCount = res.data.pendingCount;
        this.newCount = res.data.newCount;
        this.closedCount = res.data.closedCount;
        this.openCount = res.data.openCount;
      }
    });

    this.api
      .getAllClient(this.orderBy, this.page, this.size, this.sortBy)
      .subscribe((res) => {
        if (res.success) {
          this.data = res.data;
        }
      });
  }

  relativePercentage(statusCount: any) {
    return (statusCount / this.allCount) * 100;
  }

  setClientId(event: MouseEvent, id: any) {
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    } else {
      // sessionStorage.setItem('clientId', id.toString());
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

  deleteClient(clientId: any) {
    this.api.deleteClient(clientId).subscribe((res: any) => {
      if (res.success) {
        this.tosatr.success(res.message);
        window.location.reload();
      }
    });
  }

  pinClient(clientId: number) {
    this.api.pinClinet(clientId).subscribe({
      next: (res: any) => {
        {
          if (res.success) {
            console.log(res.message);
            this.tosatr.success(res.message);
          }
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
    this.status = status;
    if ((this.activatedTab = 'recent')) {
      this.router.navigate(['./recent', status], {
        relativeTo: this.route,
      });
    }
  }
}
