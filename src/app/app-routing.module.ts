import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './exwise/survey/survey.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'dashboard', loadChildren: () => import('./exwise/exwise.module').then(m => m.ExwiseModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
