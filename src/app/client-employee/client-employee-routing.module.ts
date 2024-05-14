import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEmployeeComponent } from './client-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyResponseComponent } from './pages/survey-response/survey-response.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FaquserComponent } from './pages/faquser/faquser.component';

const routes: Routes = [{ path: '', component: ClientEmployeeComponent,children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'survey-response', component:SurveyResponseComponent},
  { path:'reminder',component:ReminderComponent },
  { path:'profile',component:ProfileComponent},
  { path: 'faq', component:FaquserComponent },
] },
{ path: 'clientemployee', loadChildren: () => import('./client-employee.module').then(m => m.ClientEmployeeModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmployeeRoutingModule { }
