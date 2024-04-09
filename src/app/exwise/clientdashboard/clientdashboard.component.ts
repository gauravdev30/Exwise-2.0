import { Component } from '@angular/core';
@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrl: './clientdashboard.component.css'
})
export class ClientdashboardComponent{

  activeIcon: string = 'add-circle-outline';

  constructor() { }

  change(iconName: string) {
    this.activeIcon = iconName;
  }

  
}
