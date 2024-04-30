import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMatricsComponent } from './create-matrics/create-matrics.component';

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
  constructor( private service :ProjectService,private dialog:MatDialog,){ }
  pageChangeEvent(event: number) {
    this.page = event;
this.getAllMatrixData();
  }

ngOnInit(): void {
    this.getAllMatrixData();
}

  getAllMatrixData(){
    this.service.peoplemetrics().subscribe({next:(res:any)=>{console.log(res);
      this.data=res.data;
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
}
