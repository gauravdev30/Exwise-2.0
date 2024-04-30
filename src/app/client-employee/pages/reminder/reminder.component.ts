import { Component } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  total:any=0;
  upcoming:any=0;
  selected: Date | null | undefined;
  meetingDay: any;
  meetingMonth: any;
  meetingData = [
    {
      title: 'Meeting Title 1',
      email: 'example1@example.com',
      description: 'Meeting description 1',
      meeting_link: 'link1',
      status: 'Active'
    },
    {
      title: 'Meeting Title 2',
      email: 'example2@example.com',
      description: 'Meeting description 2',
      meeting_link: 'link2',
      status: 'Inactive'
    },
    {
      title: 'Meeting Title 3',
      email: 'example3@example.com',
      description: 'Meeting description 3',
      meeting_link: 'link3',
      status: 'Active'
    },
    {
      title: 'Meeting Title 4',
      email: 'example4@example.com',
      description: 'Meeting description 4',
      meeting_link: 'link4',
      status: 'Inactive'
    },
    {
      title: 'Meeting Title 5',
      email: 'example5@example.com',
      description: 'Meeting description 5',
      meeting_link: 'link5',
      status: 'Active'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.meetingDay = today.getDate().toString().padStart(2, '0');
    this.meetingMonth = this.getMonthName(today.getMonth());
  }

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }

  getRemindersByStatus(status:any){

  }

  openMeeting(link: string) {
    window.open(link, '_blank');
  }

  
}
