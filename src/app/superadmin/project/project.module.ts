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
import { AssignQuestionToSurveyComponent } from './Components/assign-question-to-survey/assign-question-to-survey.component';
import { CreateSurveyComponent } from './Components/create-survey/create-survey.component';
import { SurveyComponent } from './Components/survey/survey.component';
import { SurveyListByClientComponent } from './Components/survey-list-by-client/survey-list-by-client.component';
import { SurveyFlagPopupComponent } from './Components/survey-list-by-client/survey-flag-popup/survey-flag-popup.component'; 
import { TaskdashboardComponent } from './Components/taskdashboard/taskdashboard.component';
import { QuestionpopupComponent } from './Components/add-question/questionpopup/questionpopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MeetingsComponent } from './Components/meetings/meetings.component';

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
    
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatCardModule,
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
