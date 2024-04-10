import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: ProjectComponent ,children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
