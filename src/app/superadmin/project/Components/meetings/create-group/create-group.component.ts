import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})

export class CreateGroupComponent implements OnInit {

  showContainer: number = 1;
  meetingForm!: FormGroup;
  vissible: boolean = true;
  selectedUserForInfo: any;
  isVissible: boolean = false;
  name: any;
  dataId: any;
  index: any;
  // users:any;
  users: any[] = ['Gaurav', 'soham', 'Gotu', 'Yogesh', 'Gaurav1', 'soham1', 'Gotu1', 'Yogesh1', 'Gaurav2', 'soham2', 'Gotu2', 'Yogesh2', 'Hari', 'Rohit', 'Virat', 'Vijay', 'Sai']
  clientId: any;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateGroupComponent>,
    private toaster: ToastrService,
    private service: ProjectService,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      title: ['', [Validators.required]],
      criteria: [''],
      description: [''],
      clientId: [''],
      loggedUserId: [''],
      id: ['']
    });
    if (this.data.edit === 'edit' && this.data.groupId !== null) {
      this.getFocuseGroupById(this.data.groupId);
    }

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
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
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllusersByClientId(sessionStorage.getItem("ClientId")).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.users = res.data.name;
        console.log(this.users);
        this.users = this.users.map((user: any) => {
          return {
            item_id: user.id,
            item_text: user.name
          };
        });
      }
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



  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  selectedUsers: string[] = [];

  toggleSelectedUser(user: string) {
    if (this.selectedUsers.includes(user)) {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    } else {
      this.selectedUsers.push(user);
    }
  }

  onBackToGroupInfo() {
    this.data.name === 'openGroup';
  }

  onNext() {
    this.showContainer = 2;
  }
  loadDataForSecondContainer() {
    this.selectedUserForInfo = ['User1', 'User2', 'User3'];
    this.selectedUserForInfo = this.selectedUsers;
  }

  onBack() {
    this.showContainer = 1;
    this.data.name = 'createGroup'
  }

  createGroup() {
    const form = this.meetingForm.value;
    const obj = {

      clientId: sessionStorage.getItem("ClientId"),
      createdDate: new Date(),
      criteria: form.criteria,
      description: form.description,

      loggedUserId: JSON.parse(sessionStorage.getItem('currentLoggedInUserData')!).id,
      title: form.title
    }
    this.service.createGroup(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.meetingForm.reset();
        document.getElementById('closeOffCanvas')?.click();
        this.toaster.success('Group Created Successfully');
      }, error: (err: any) => {
        console.log(err);
      }, complete: () => { }
    })
  }

  onUpdate(id: any) {
    this.index = id;
    this.vissible = false;
    this.isVissible = true;
    this.service.getMeetingByID(id).subscribe((res: any) => {
      this.dataId = res.data;
      const offcanvasElement = document.getElementById('offcanvasRight3');
      const offcanvas = new (window as any).bootstrap.Offcanvas(
        offcanvasElement
      );
      offcanvas.toggle();
      this.meetingForm.patchValue({
        active: true,
        name: this.dataId.name,
        employeeId: parseInt(this.dataId.employeeId),
        contact: this.dataId.contact,
      });
    });
  }


  updateMeeting() {
    if (this.meetingForm.valid) {
      const form = this.meetingForm.value;
      const obj = {
        active: true,
        clientId: 0,
        consultantId: 0,
        createdDate: new Date(),
        description: form.description,
        id: 0,
        location: "nashik",
        loggedUserId: 0,
        meetingDate: form.meetingDate,
        meeting_link: form.meeting_link,
        status: "active",
        timeDuration: form.timeDuration,
        title: form.title,
        userId: form.userId
      }
      const id = this.clientId
      this.service.updateMeeting(obj, id).subscribe({
        next: (res: any) => {
          console.log(res);
        }, error: () => { }, complete: () => { }
      })
    } else { }
  }


}
