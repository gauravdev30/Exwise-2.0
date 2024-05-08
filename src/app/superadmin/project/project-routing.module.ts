import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TaskdashboardComponent } from './Components/taskdashboard/taskdashboard.component';
import { ProjectAdminComponent } from './Components/project-admin/project-admin.component';
import { SurveyComponent } from './Components/survey/survey.component';
import { CreateSurveyComponent } from '../pages/supsurvey/sup-surveylist/create-survey/create-survey.component';
import { SurveyListByClientComponent } from './Components/survey-list-by-client/survey-list-by-client.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { MeetingsComponent } from './Components/meetings/meetings.component';
import { InterviewComponent } from './Components/meetings/interview/interview.component';
import { FocusgroupComponent } from './Components/meetings/focusgroup/focusgroup.component';
import { RecentComponent } from './Components/dashboard/recent/recent.component';
import { PinnedComponent } from './Components/dashboard/pinned/pinned.component';
import { PeopleComponent } from './Components/people/people.component';
import { QuestionListComponent } from './Components/question-list/question-list.component';
import { StagelistComponent } from './Components/survey/stagelist/stagelist.component';
import { SubphaselistComponent } from './Components/survey/subphaselist/subphaselist.component';
import { SurveyListComponent } from './Components/survey/survey-list/survey-list.component';
import { PhaseoneComponent } from './Components/dashboard/phaseone/phaseone.component';
import { PhasetwoComponent } from './Components/dashboard/phasetwo/phasetwo.component';
import { PeopleMatrixComponent } from './Components/people-matrix/people-matrix.component';
import { SurveyInfoComponent } from './Components/survey-info/survey-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'surveyInfo',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ProjectComponent,
    children: [
      { path: 'surveyInfo', component: SurveyInfoComponent },
      {
        path: 'dashboard/:id',
        component: DashboardComponent,
        children: [
          { path: 'recent', component: RecentComponent },
          { path: 'pinned', component: PinnedComponent },
          { path: 'phase-one', component: PhaseoneComponent },
          { path: 'phase-two', component: PhasetwoComponent },
        ],
      },
      { path: 'task-dashboard', component: TaskdashboardComponent },
      { path: 'project-admin', component: ProjectAdminComponent },
      { path: 'people-matrix', component: PeopleMatrixComponent },
      { path: 'people', component: PeopleComponent },
      {
        path: 'survey',
        component: SurveyComponent,
        children: [
          { path: '', redirectTo: 'surveylist', pathMatch: 'full' },
          { path: 'surveylist', component: SurveyListComponent },
          { path: 'stage', component: StagelistComponent },
          { path: 'subphase', component: SubphaselistComponent },
        ],
      },
      { path: 'create-survey', component: CreateSurveyComponent },
      { path: 'surveylistby-client', component: SurveyListByClientComponent },

      { path: 'question-list', component: QuestionListComponent },

      {
        path: 'meetings',
        component: InterviewComponent,
        children: [
          { path: 'interview', component: MeetingsComponent },
          { path: 'focusgroup', component: FocusgroupComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
