import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientEmployeeRoutingModule } from './client-employee-routing.module';
import { ClientEmployeeComponent } from './client-employee.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ClientEmployeeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ClientEmployeeRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ]
})
export class ClientEmployeeModule { }
