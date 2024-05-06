import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-focusgroup-edit',
  templateUrl: './focusgroup-edit.component.html',
  styleUrl: './focusgroup-edit.component.css'
})
export class FocusgroupEditComponent implements OnInit {

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  meetingForm!:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<FocusgroupEditComponent>,
  private service:ProjectService,
  private fb:FormBuilder,
  private toaster:ToastrService){}

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      title: ['', [Validators.required]],
      criteria: [''],
      description: [''],
      clientId: [''],
      loggedUserId: [''],
      id: ['']
    });
    this.getAllUsers();
    this.getFocuseGroupById(this.data.groupId);

     this.dropdownList = [
      ];
      this.selectedItems = [
        // { item_id: 3, item_text: 'Pune' },
        // { item_id: 4, item_text: 'Navsari' }
      ];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
  }


  getAllUsers() {
    this.service.getAllusersByClientId(sessionStorage.getItem("ClientId")).subscribe((res: any) => {
      console.log(res);
      this.dropdownList = [res.id,res.name]
      // if (res.success) {
      //   this.users = res;
      //   this.dropdownList = this.users.map((user: any) => {
      //     console.log(res.id,.user.name)
      //     return {
      //       item_id:user.id,
      //       item_text: user.name
      //     };
      //   });
      // }
    })
  }

  getFocuseGroupById(groupId: number) {
    this.service.getFocuseGroupById(groupId).subscribe((res => {
      if (res.success) {
        const form = res.data;
        this.meetingForm.patchValue({
          title: form.title,
          criteria: form.criteria,
          description: form.description
        });
      }
    }));
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  updateFocusGroup() {
    console.log('its called')
    if (this.meetingForm.valid) {
      const form = this.meetingForm.value;
      const obj = {
        title: form.title,
        criteria: form.criteria,
        description: form.description,
        clientId: sessionStorage.getItem('clientId'),
        loggedUserId: 1,
        // id: ['']
      }
      this.service.updateFocusGroup(obj, this.data.groupId).subscribe((res) => {
        if (res.success) {
          this.toaster.success(res.message);
          this.onClose();
        }
      })
    }
  }
}
