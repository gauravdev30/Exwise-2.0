import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TaskdashboardComponent } from './Components/taskdashboard/taskdashboard.component';
import { ProjectAdminComponent } from './Components/project-admin/project-admin.component';
import { SurveyComponent } from './Components/survey/survey.component';
import { CreateSurveyComponent } from './Components/create-survey/create-survey.component';
import { SurveyListByClientComponent } from './Components/survey-list-by-client/survey-list-by-client.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { AssignQuestionToSurveyComponent } from './Components/assign-question-to-survey/assign-question-to-survey.component';

const routes: Routes = [{ path: '', component: ProjectComponent ,children:[
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component:DashboardComponent },
  {path:'task-dashboard',component:TaskdashboardComponent},
  {path:'project-admin',component:ProjectAdminComponent},
  {path:'survey',component:SurveyComponent},
  {path:'create-survey',component:CreateSurveyComponent},
  {path:'surveylistby-client',component:SurveyListByClientComponent},
  {path:'add-question',component:AddQuestionComponent},
  {path:'assign-question-to-survey',component:AssignQuestionToSurveyComponent},
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
