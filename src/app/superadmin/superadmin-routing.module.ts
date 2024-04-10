import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [{ path: '', component: SuperadminComponent ,
children:[
  { path: '', component: HomeComponent },
  { path: 'home', component:HomeComponent },
]
},
{ path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
