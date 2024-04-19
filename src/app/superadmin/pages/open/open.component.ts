import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateclientComponent } from '../../createclient/createclient.component';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrl: './open.component.css'
})
export class OpenComponent {
  data:any;
  pinClients: any;

  constructor(private api:ApiService, private router:Router,private tosatr:ToastrService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.api.getAllClient().subscribe((res:any)=>{
      if(res.success){
        this.data=res.data;
      }
      console.log(res.data)
    })

    this.pinnedClients();
  }


  pinnedClients(){
    console.log('pinned')
    this.api.getAllPinClients().subscribe((res: any) => {
      console.log(res.message);
      if(res.message){
        this.pinClients = res.data;
      }
    });
  }

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
}
