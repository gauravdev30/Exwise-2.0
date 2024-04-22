import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgCircleProgressModule } from 'ng-circle-progress';
//Material
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { RecentComponent } from './pages/recent/recent.component';
import { PinnedComponent } from './pages/pinned/pinned.component';
import { OpenComponent } from './pages/open/open.component';
import { InfoComponent } from './pages/info/info.component';
import { AssignComponent } from './pages/assign/assign.component';
import { SupsurveyComponent } from './pages/supsurvey/supsurvey.component';
import { SupquestionListComponent } from './pages/supquestion-list/supquestion-list.component';
import { SupSurveylistComponent } from './pages/supsurvey/sup-surveylist/sup-surveylist.component';
import { SupSubphaseListComponent } from './pages/supsurvey/sup-subphase-list/sup-subphase-list.component';
import { SupStageListComponent } from './pages/supsurvey/sup-stage-list/sup-stage-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SuperadminComponent,
    HomeComponent,
    RecentComponent,
    PinnedComponent,
    OpenComponent,
    InfoComponent,
    AssignComponent,
    SupsurveyComponent,
    SupquestionListComponent,
    SupSurveylistComponent,
    SupSubphaseListComponent,
    SupStageListComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
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
  providers:[
    NgCircleProgressModule 
  ]
})
export class SuperadminModule { }
