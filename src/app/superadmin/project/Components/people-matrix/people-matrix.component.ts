import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMatricsComponent } from './create-matrics/create-matrics.component';
import { InfoMatrixComponent } from './info-matrix/info-matrix.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-people-matrix',
  templateUrl: './people-matrix.component.html',
  styleUrl: './people-matrix.component.css'
})
export class PeopleMatrixComponent implements OnInit {
  orderBy:any = 'desc'; 
  page:any = 1;
  size:any =10;
  sortBy:any = 'id';
  p: number = 1;
  itemPerPage: number = 9;
  totalItems:any=0;
  data:any=[];
  isLoading:boolean=false;
  displayMsg:any;
  isCpoc: boolean = false;
  constructor( private service :ProjectService,private dialog:MatDialog,private router:Router,private route:ActivatedRoute,   private toaster: ToastrService,private searchservice:SearchService){ }
  pageChangeEvent(event: number) {
    this.page = event;
this.getAllMatrixData();
  }
  onClick(){}
ngOnInit(): void {
  this.isCpoc = sessionStorage.getItem('isCpoc') == 'true';
  this.searchservice.sendResults().subscribe({
    next: (res: any) => {
      if (res.length == 0) {
        this.getAllMatrixData();
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

}

openPopup(id:any): void {
  const dialogRef = this.dialog.open(InfoMatrixComponent, {
    width: '750px',
    height: '500px',
    disableClose: true,
    data: { name: 'Matrix Info',id:id },
  });

  dialogRef.afterClosed().subscribe((result) => {
  
    this.router.navigate(['/people-matrix'], {
   
    });
  });
}
  getAllMatrixData(){
    this.isLoading=true;
    this.service.peoplemetricsByClientId(sessionStorage.getItem('ClientId')).subscribe({next:(res:any)=>{console.log(res);
      this.data=res.data;
  //     if(this.data){
  // this.displayMsg="metrics data not created yet"
  //     }
      this.isLoading=false;
      console.log(this.data);
      
    },error:()=>{},complete:()=>{}})
  }

  createMatrix(): void {
    const dialogRef = this.dialog.open(CreateMatricsComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllMatrixData();
    });
  }
  updateMatrix(id:number){
    console.log(id);
    
    const dialogRef = this.dialog.open(CreateMatricsComponent, {
      width: '650px',
      height: '650px',
      disableClose: true,
      data: { name: 'edit-Matrix',id:id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllMatrixData();
    });
  }

  deleteMatrix(id:any){
this.service.deleteMatrixById(id).subscribe((res:any)=>{console.log(res);
  if(res.message==="Metrics deleted successfully."){
    this.toaster.success(res.message, 'Success');
    this.getAllMatrixData();
  }
})
  }
}
