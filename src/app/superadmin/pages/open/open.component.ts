import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component';
import { SearchService } from '../../services/search.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrl: './open.component.css'
})
export class OpenComponent {
  data:any[]=[];
  pinClients: any;
  orderBy:any = 'asc'; 
  page:any = 1;
  size:any = 10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 9;
  totalItems: number = 10;

  constructor(private api:ApiService, private router:Router,private tosatr:ToastrService,private dialog:MatDialog,private service:SearchService){}

  ngOnInit(): void {
  
    this.service.sendResults().subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.openClients();
        } else {
          if (res.success) {
            this.data = res.data;
          } else {
            this.data = [];
          }
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });

    // this.pinnedClients();
  }


  openClients(){
    this.api.getAllOpenClient(this.orderBy, this.page - 1, this.size, this.sortBy).subscribe((res:any)=>{
      if(res.success){
        this.data=res.data;
        this.totalItems=res.totalItems;
      }
      console.log(res.data)
    })
  }

  setClientId(event: MouseEvent, id: any) {
    
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    } else {
      // sessionStorage.setItem('clientId', id.toString());
      this.router.navigate(['superadmin/project/',id]);
    }
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.openClients();
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation(); 
}

editClient(clientId:any) {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '700px',
      height: '550px',
      disableClose: true,
      data: { name: 'create-project',clientId:clientId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
}

// deleteClient(clientId:any) {
//   this.api.deleteClient(clientId).subscribe((res:any)=>{
//     if(res.success){
//       this.tosatr.success(res.message);
//       window.location.reload();
//     }
//   })
// }
deleteClient(client: any) {
  const dialogRef = this.dialog.open(DeleteComponent, {
    data: {
      message: `Do you really want to delete the records for ${client.clientName} ?`,
    },
    disableClose:true
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result.action == 'ok') {
      this.api.deleteClient(client.id).subscribe((res:any)=>{
        if(res.success){
          this.tosatr.success(res.message);
          window.location.reload();
        }
      })
    }
  });
}

pinClient(clientId:number) {
  this.api.pinClinet(clientId).subscribe((res:any)=>{
    if(res.success){
      console.log(res.message);
      this.tosatr.success(res.message);
    }
  },(error)=>{
    this.tosatr.error('Cliet Already Pinned')
  })
}


unpinClient(clientId:number){
  this.api.unPinClient(clientId).subscribe((res:any)=>{
    if(res.success){
      console.log(res.message);
    }
  })
}
}
