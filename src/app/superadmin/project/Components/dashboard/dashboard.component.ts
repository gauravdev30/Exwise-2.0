import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeIcon: string = 'add-circle-outline';
  cardsCircle:any[]=[
    { name: 'Attract', count: '5' },
    { name: 'Onboard', count: '5' },
    { name: 'Develop', count: '5' },
    { name: 'Retain', count: '5' },
    { name: 'Separate', count: '5' },
  ]
  constructor() { }

  change(iconName: string) {
    this.activeIcon = iconName;
  }
}
