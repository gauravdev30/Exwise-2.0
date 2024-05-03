import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEmployeeComponent } from './client-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyResponseComponent } from './pages/survey-response/survey-response.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [{ path: '', component: ClientEmployeeComponent,children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'survey-response', component:SurveyResponseComponent},
  { path:'reminder',component:ReminderComponent },
  { path:'profile',component:ProfileComponent}
] },
{ path: 'clientemployee', loadChildren: () => import('./client-employee.module').then(m => m.ClientEmployeeModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmployeeRoutingModule { }
