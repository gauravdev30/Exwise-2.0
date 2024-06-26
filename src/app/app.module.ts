import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './components/service/api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';  
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { NgxOtpInputModule } from "ngx-otp-input";
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AngularFireMessagingModule, } from "@angular/fire/compat/messaging"
import {AngularFireAuthModule} from "@angular/fire/compat/auth"
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    CoverPageComponent,
    LoginComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    NgxOtpInputModule,
     MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [  MessageService,ApiService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
