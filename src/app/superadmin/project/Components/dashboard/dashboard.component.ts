import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeIcon: string = 'add-circle-outline';

  constructor() { }

  change(iconName: string) {
    this.activeIcon = iconName;
  }
}
