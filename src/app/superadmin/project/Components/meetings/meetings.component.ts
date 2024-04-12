import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  filterToggle: boolean = false;
  columnSelection: any = '';
  filterTable: any = '';
  dept: any[] = [];
  deptToFilter: any[] = [];
  dataId: any;
  deptDetails: any;
  emp: any;
  index: any;
  vissible: boolean = true;
  isVissible: boolean = false;
  submitted: boolean = false;
  departmentForm!: FormGroup;
  p: number = 1;
  a: number = 1;
  itemPerPage: number = 10;
  sortDir: any = 'asc';
  totalItems: number = 0;
  selected: Date | null | undefined;
  modelChangeFn(event: any) {

  }

  hideOffCanvas(){}
  cardsCircle:any[]=[
    { name: 'Schedule', count: '2' },
    { name: 'Reschedule', count: '2' },
    { name: 'Cancel', count: '2' },
    { name: 'Cancel', count: '2' },
  ]
  reminders:any[]=[
    { title: 'Schedule', count: '2' },
    { title: 'Reschedule', count: '2' },
    { title: 'Cancel', count: '2' },
    { title: 'Cancel', count: '2' },
  ]
}
