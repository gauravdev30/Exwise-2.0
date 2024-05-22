import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMatricsComponent } from './create-matrics/create-matrics.component';
import { InfoMatrixComponent } from './info-matrix/info-matrix.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  constructor( private service :ProjectService,private dialog:MatDialog,private router:Router,private route:ActivatedRoute){ }
  pageChangeEvent(event: number) {
    this.page = event;
this.getAllMatrixData();
  }
  onClick(){}
ngOnInit(): void {
    this.getAllMatrixData();
}

openPopup(id:any): void {
  const dialogRef = this.dialog.open(InfoMatrixComponent, {
    width: '750px',
    height: '500px',
    disableClose: true,
    data: { name: 'Matrix Info',id:id },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The popup was closed');
    this.router.navigate(['/people-matrix'], {
   
    });
  });
}
  getAllMatrixData(){
    this.service.peoplemetricsByClientId(sessionStorage.getItem('ClientId')).subscribe({next:(res:any)=>{console.log(res);
      this.data=res.data;
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
})
  }
}
