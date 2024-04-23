import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { HomeComponent } from './pages/home/home.component';
import { RecentComponent } from './pages/recent/recent.component';
import { PinnedComponent } from './pages/pinned/pinned.component';
import { InfoComponent } from './pages/info/info.component';
import { AssignComponent } from './pages/assign/assign.component';
import { SupquestionListComponent } from './pages/supquestion-list/supquestion-list.component';
import { SupsurveyComponent } from './pages/supsurvey/supsurvey.component';
import { SupSubphaseListComponent } from './pages/supsurvey/sup-subphase-list/sup-subphase-list.component';
import { SupStageListComponent } from './pages/supsurvey/sup-stage-list/sup-stage-list.component';
import { SupSurveylistComponent } from './pages/supsurvey/sup-surveylist/sup-surveylist.component';
import { AssignQuestionToSurveyComponent } from './pages/supsurvey/assign-question-to-survey/assign-question-to-survey.component';

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
  {path:'open',component:OpenComponent},
  {path:'assign-question-to-survey',component:AssignQuestionToSurveyComponent},
  {path:'sup-question',component:SupquestionListComponent},
  {path:'sup-survey',component:SupsurveyComponent,children:[
    { path: '', redirectTo: 'sup-surveylist', pathMatch: 'full' }, 
    {path:'sup-surveylist',component:SupSurveylistComponent},
    {path:'sup-stage',component:SupStageListComponent},
    {path:'sup-subphase',component:SupSubphaseListComponent}
  ]}
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
