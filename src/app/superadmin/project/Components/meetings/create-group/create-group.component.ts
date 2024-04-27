import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit {
  users:any[]=['Gaurav','soham','Gotu','Yogesh']
  constructor(private dialogRef: MatDialogRef<CreateGroupComponent>){}

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

  selectedUsers: string[] = []; // Array to store selected users

  toggleSelectedUser(user: string) {
    if (this.selectedUsers.includes(user)) {
      // If user is already selected, remove it
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    } else {
      // If user is not selected, add it
      this.selectedUsers.push(user);
    }
  }

}
