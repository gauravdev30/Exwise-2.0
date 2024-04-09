import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { CreateSurveyComponent } from '../create-survey/create-survey.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    children: [
      { path: 'create', component: CreateSurveyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
