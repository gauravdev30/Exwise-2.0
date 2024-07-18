import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addmorequestion',
  templateUrl: './addmorequestion.component.html',
  styleUrl: './addmorequestion.component.css'
})
export class AddmorequestionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddmorequestionComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
