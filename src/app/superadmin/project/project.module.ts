import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgCircleProgressModule } from 'ng-circle-progress';

//Material
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { ProjectAdminComponent } from './Components/project-admin/project-admin.component';
import { CreateclientComponent } from '../createclient/createclient.component';
import { AssignQuestionToSurveyComponent } from '../pages/supsurvey/assign-question-to-survey/assign-question-to-survey.component';
import { CreateSurveyComponent } from '../pages/supsurvey/sup-surveylist/create-survey/create-survey.component';
import { SurveyComponent } from './Components/survey/survey.component';
import { SurveyListByClientComponent } from './Components/survey-list-by-client/survey-list-by-client.component';
import { SurveyFlagPopupComponent } from './Components/survey-list-by-client/survey-flag-popup/survey-flag-popup.component'; 
import { TaskdashboardComponent } from './Components/taskdashboard/taskdashboard.component';
import { QuestionpopupComponent } from './Components/add-question/questionpopup/questionpopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { CreateComponent } from './Components/survey/create/create.component';
import { SurveyCreateComponent } from './Components/survey/survey-list/survey-create/survey-create.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PhaseoneComponent } from './Components/dashboard/phaseone/phaseone.component';
import { PhasetwoComponent } from './Components/dashboard/phasetwo/phasetwo.component';
import { CreateUserComponent } from './Components/project-admin/create-user/create-user.component';
import { CreateGroupComponent } from './Components/meetings/create-group/create-group.component';
import { PeopleMatrixComponent } from './Components/people-matrix/people-matrix.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateMatricsComponent } from './Components/people-matrix/create-matrics/create-matrics.component';
import { ScheduleComponent } from './Components/meetings/schedule/schedule.component';
import { SurveyDetailsComponent } from './Components/dashboard/survey-details/survey-details.component';
import { SurveyInfoComponent } from './Components/survey-info/survey-info.component';
import { FocusgroupEditComponent } from './Components/meetings/focusgroup-edit/focusgroup-edit.component';
import { InfoMatrixComponent } from './Components/people-matrix/info-matrix/info-matrix.component';
import { AssestmentComponent } from './Components/assestment/assestment.component';
import { AssestRealityComponent } from './Components/assestment/assest-reality/assest-reality.component';
import { AssestQualityComponent } from './Components/assestment/assest-quality/assest-quality.component';
import { CreateRealityAssestComponent } from './Components/assestment/assest-reality/create-reality-assest/create-reality-assest.component';
import { StatRealityComponent } from './Components/assestment/assest-reality/stat-reality/stat-reality.component';

@NgModule({
  declarations: [
    ProjectComponent,
    DashboardComponent,
    AddQuestionComponent,
    CreateclientComponent,
    AssignQuestionToSurveyComponent,
    CreateSurveyComponent,
    SurveyComponent,
    SurveyListByClientComponent,
    SurveyFlagPopupComponent,
    TaskdashboardComponent,
    QuestionpopupComponent,
    MeetingsComponent,
    ProjectAdminComponent,
    InterviewComponent,
    FocusgroupComponent,
    RecentComponent,
    PinnedComponent,
    PeopleComponent,
    QuestionListComponent,
    StagelistComponent,
    SubphaselistComponent,
    SurveyListComponent,
    CreateComponent,
    SurveyCreateComponent,
    PhaseoneComponent,
    PhasetwoComponent,
    CreateUserComponent,
    CreateGroupComponent,
    PeopleMatrixComponent,
    CreateMatricsComponent,
    ScheduleComponent,
    SurveyDetailsComponent,
    SurveyInfoComponent,
    FocusgroupEditComponent,
    InfoMatrixComponent,
    AssestmentComponent,
    AssestRealityComponent,
    AssestQualityComponent,
    CreateRealityAssestComponent,
    StatRealityComponent,
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,

    MatDatepickerModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#2155a3",
      "outerStrokeGradientStopColor": "#2155a3",
      "innerStrokeColor": "#069DE0",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true}),
    DragDropModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class ProjectModule { }
