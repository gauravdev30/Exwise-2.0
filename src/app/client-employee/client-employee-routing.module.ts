import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEmployeeComponent } from './client-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: ClientEmployeeComponent,children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
] },
{ path: 'clientemployee', loadChildren: () => import('./client-employee.module').then(m => m.ClientEmployeeModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmployeeRoutingModule { }
