import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ExwiseRoutingModule } from './exwise-routing.module';
import { ExwiseComponent } from './exwise/exwise.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatListModule} from '@angular/material/list';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ClientdashboardComponent } from './clientdashboard/clientdashboard.component';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
import { ProjectadminComponent } from './projectadmin/projectadmin.component';
import { SurveyComponent } from './survey/survey.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveylistbyclientComponent } from './surveylistbyclient/surveylistbyclient.component';
import { SurveylistbyclientPopupComponent } from './surveylistbyclient/surveylistbyclient-popup/surveylistbyclient-popup.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FormsModule } from '@angular/forms';
import { AssignQuestionToSurveyComponent } from './assign-question-to-survey/assign-question-to-survey.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ExwiseComponent, CreateProjectComponent, SidenavComponent, ClientdashboardComponent, TaskdashboardComponent, ProjectadminComponent, SurveyComponent, CreateSurveyComponent, SurveylistbyclientComponent, SurveylistbyclientPopupComponent, AddQuestionComponent, AssignQuestionToSurveyComponent],
  imports: [
    CommonModule,
    ExwiseRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    FormsModule,
    DragDropModule,
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
      "lazy": true})
  ],
})
export class ExwiseModule {}
