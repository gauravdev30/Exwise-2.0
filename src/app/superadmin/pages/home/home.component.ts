import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data:any;
  pinClients:any;
  isPopupOpen: boolean = false;
  pendingCount:any;
  newCount:any;
  closedCount:any;
  openCount:any;
  cardsCircle:any[]=[];
  orderBy:any = 'asc'; 
  page:any = 0;
  size:any = 10;
  sortBy:any = 'id';

  constructor(private api:ApiService, private router:Router,private tosatr:ToastrService, private dialog:MatDialog){}
  
  togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
  }

  ngOnInit(): void {
    this.api.getCountOfClients().subscribe((res:any)=>{
      if(res.success){
        this.cardsCircle=res.data;
        this.pendingCount=res.data.pendingCount;
        this.newCount=res.data.newCount;
        this.closedCount=res.data.closedCount;
        this.openCount=res.data.openCount;
        console.log(this.cardsCircle);
      }
    })


    this.api.getAllClient(this.orderBy,this.page,this.size,this.sortBy).subscribe((res)=>{
      if(res.success){
        this.data=res.data;
      }
      console.log(res.data)
    })

    // this.pinnedClients();
  }


  // pinnedClients(){
  //   console.log('pinned')
  //   this.api.getAllPinClients().subscribe((res: any) => {
  //     console.log(res.message);
  //     if(res.message){
  //       this.pinClients = res.data;
  //     }
  //   });
  // }

  setClientId(event: MouseEvent, id: any) {
    
    if ((<HTMLElement>event.target).classList.contains('ellipsis-button')) {
      event.stopPropagation();
    } else {
      // sessionStorage.setItem('clientId', id.toString());
      this.router.navigate(['superadmin/project/',id]);
    }
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

deleteClient(clientId:any) {
  this.api.deleteClient(clientId).subscribe((res:any)=>{
    if(res.success){
      this.tosatr.success(res.message);
      window.location.reload();
    }
  })
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

getClientsByStatus(status:any){
  this.api.getClientListByStatus(status).subscribe((res:any)=>{
    this.data=null;
    if(res.success){
      this.tosatr.success(res.message);
      this.data=res.data;
      console.log('Client by status=>'+res.data)
      console.log(res.message);
    }
    else{
      this.tosatr.error(res.message);
    }
  },(error)=>{
    console.log(error);
  })
}

}
