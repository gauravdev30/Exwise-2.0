import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  items:any;
  isPopupOpen: boolean=false;
  surveyList:any;
  

  constructor(private dialogRef: MatDialogRef<CreateUserComponent>,@Inject(DIALOG_DATA) public data: {name: string,id:number}, private router:Router,private route: ActivatedRoute,private service:ProjectService){}

  onClose(): void {
    this.dialogRef.close();
  }


  next(){
    this.dialogRef.close();
  }
}
