import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from "ngx-otp-input";
import { ToastrModule } from 'ngx-toastr';
import { AngularFireMessagingModule, } from "@angular/fire/compat/messaging"
import {AngularFireAuthModule} from "@angular/fire/compat/auth"
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environment/environment';
import { MessageService } from '../message.service';


@NgModule({
  declarations: [
    AuthComponent,
    AdminloginComponent,
    ForgotpasswordComponent,
    UserloginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxOtpInputModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [  MessageService]
})
export class AuthModule { }
