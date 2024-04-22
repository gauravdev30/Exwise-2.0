import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { HomeComponent } from './pages/home/home.component';
import { RecentComponent } from './pages/recent/recent.component';
import { PinnedComponent } from './pages/pinned/pinned.component';
import { InfoComponent } from './pages/info/info.component';
import { AssignComponent } from './pages/assign/assign.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home/recent',
    pathMatch: 'full',
  },
  {path:'',component:SuperadminComponent,children:[
    {path:'recent',component:RecentComponent},
    {path:'pinned',component:PinnedComponent},
    {path:'info',component:InfoComponent},
    {path:'assign',component:AssignComponent},
      {path:'home',component:HomeComponent,children:[
    {path:'recent',component:RecentComponent},
    {path:'pinned',component:PinnedComponent},
  
  ]},
  ]},
 
  {
    path: 'project/:id',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminRoutingModule {}
