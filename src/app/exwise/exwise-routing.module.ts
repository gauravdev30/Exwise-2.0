import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExwiseComponent } from './exwise/exwise.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ClientdashboardComponent } from './clientdashboard/clientdashboard.component';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
import { ProjectadminComponent } from './projectadmin/projectadmin.component';
import { SurveyComponent } from './survey/survey.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveylistbyclientComponent } from './surveylistbyclient/surveylistbyclient.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AssignQuestionToSurveyComponent } from './assign-question-to-survey/assign-question-to-survey.component';


const routes: Routes = [{ path: '', component: ExwiseComponent, children:[
  // {path:'createProject', component: CreateProjectComponent},
  // {path:'', component: SidenavComponent},
  // {path:'client-dashboard',component:ClientdashboardComponent},
  // {path:'task-dashboard',component:TaskdashboardComponent},
  // {path:'project-admin',component:ProjectadminComponent},
  // {path:'survey',component:SurveyComponent},
  // {path:'create-survey',component:CreateSurveyComponent},
  // {path:'surveylistby-client',component:SurveylistbyclientComponent},
  // {path:'add-question',component:AddQuestionComponent},
  // {path:'assign-question-to-survey',component:AssignQuestionToSurveyComponent},
] }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExwiseRoutingModule {}
