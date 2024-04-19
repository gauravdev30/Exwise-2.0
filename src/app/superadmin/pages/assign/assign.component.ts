import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrl: './assign.component.css'
})
export class AssignComponent implements OnInit{
  items:any;

  constructor(private dialogRef: MatDialogRef<AssignComponent>,@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute,private service:ProjectService){}

  onClose(): void {
    this.dialogRef.close();
  }


  next(){
    this.dialogRef.close();
  }

ngOnInit(): void {
console.log(this.data.id);
  this.service.getSurveyByID(this.data.id).subscribe({
    next: (res: any) => {
      this.items = res.data;
      console.log(res);
      
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {},
  });
}
}
