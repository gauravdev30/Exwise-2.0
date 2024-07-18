import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminComponent } from './superadmin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { DragDropModule ,CdkDropListGroup, CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';
import { NgCircleProgressModule } from 'ng-circle-progress';
//Material
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
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
import { Recent2Component } from './pages/recent2/recent2.component';
import { ExMeetingsComponent } from './pages/ex-meetings/ex-meetings.component';
import { TouchpointComponent } from './pages/touchpoint/touchpoint.component';
import { CreatetouchpointComponent } from './pages/touchpoint/createtouchpoint/createtouchpoint.component';
import { RealityComponent } from './pages/reality/reality.component';
import { ShowalltouchpointComponent } from './pages/touchpoint/showalltouchpoint/showalltouchpoint.component';
import { RealityComponentComponent } from './pages/reality-component/reality-component.component';
import { RealityQualityComponent } from './pages/reality-quality/reality-quality.component';
import { ShowallcomponentsComponent } from './pages/touchpoint/showallcomponents/showallcomponents.component';
import { AssignpopupComponent } from './pages/touchpoint/assignpopup/assignpopup.component';
import { AssignComponentComponent } from './pages/touchpoint/assign-component/assign-component.component';
import { AssignTouchpointComponent } from './pages/touchpoint/assign-touchpoint/assign-touchpoint.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FaqComponent } from './pages/faq/faq.component';
import { SurveyIndetailsComponent } from './pages/survey-indetails/survey-indetails.component';
import { AddmorequestionComponent } from './pages/addmorequestion/addmorequestion.component';

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
    SupStageListComponent,
    Recent2Component,
    ExMeetingsComponent,
    TouchpointComponent,
    CreatetouchpointComponent,
    RealityComponent,
    ShowalltouchpointComponent,
    RealityComponentComponent,
    RealityQualityComponent,
    ShowallcomponentsComponent,
    AssignpopupComponent,
    AssignComponentComponent,
    AssignTouchpointComponent,
    ChartsComponent,
    AdminProfileComponent,
    DeleteComponent,
    FaqComponent,
    SurveyIndetailsComponent,
    AddmorequestionComponent
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
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatTooltipModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    BaseChartDirective,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBadgeModule,
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
    NgCircleProgressModule ,
    provideCharts(withDefaultRegisterables())
  ]
})
export class SuperadminModule { }
