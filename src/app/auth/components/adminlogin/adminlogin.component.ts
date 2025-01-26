import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})

export class AdminloginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  show = '';
  displayMsg: any;
  userId: number = 1;
  fieldTextType: any;
  pushToken: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private messageService:MessageService,
    private firemessage: AngularFireMessaging
  ) { }
  myFunction() {
    this.fieldTextType = !this.fieldTextType;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: ['', [Validators.required, this.trimmedEmailValidator()]],
      password: ['', [Validators.required]],
    });

    this.generateToken()


    // this.firemessage.messages.subscribe({
    //   next: (res: any) => {


    //     console.log(res);
    //     this.messageService.getter(res)
    //   }, error: (err: any) => {
    //     console.log(err);
    //   }
    // }

    // )

    // this.messageService.setter().subscribe({
    //   next: (res: any) => {
    //     console.log(res);

    //   }
    // })

    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    this.messageService.requestPermission();
  }

  trimmedEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const trimmedValue = control.value.trim();
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
        // Validate trimmed email
        if (!emailPattern.test(trimmedValue)) {
          return { invalidEmail: true }; // Invalid email
        }
      }
      return null; // Valid email
    };
  }

  generateToken() {
    this.firemessage.requestToken.subscribe({
      next: (res: any) => {
        console.log("Token===========>", res);

        this.pushToken = res;
      }, error: (err: any) => {
        console.warn("Eoor=========>",err);

      }
    });
  }
  submit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const email = form.email.trim();
      const password = form.password;
      this.apiService.authLoginwithoutJwt(email, password).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'Current logged in Employee') {
            const obj={deviceId:this.pushToken}
            this.apiService.updateUser(res.data.id,obj).subscribe((res:any)=>{})
            sessionStorage.setItem('currentLoggedInUserData', JSON.stringify(res.data));
            const clientId = res.data.clientId;
            if (res.data.typeOfUser === 0) {
              this.router.navigate(['/superadmin']);
              this.toastr.success('Your login was successful!!');
              sessionStorage.setItem('isCpoc', 'false');
            }

          }
          else if (res.message === "Password wrong!!") {
            this.toastr.error('Sorry, your password is incorrect. Please double-check your password.');
            this.displayMsg = 'Sorry, your password is incorrect. Please double-check your password.';
          }
          else if (res.message === "Email not found!!") {
            this.toastr.error('The email account that you tried to reach does not exist.');
            this.displayMsg = 'The email account that you tried to reach does not exist.';
          }
          else if (res.message === "User account is deactivated. Please contact support.") {
            this.toastr.error('User account is deactivated. Please contact support.');
            this.displayMsg = 'User account is deactivated. Please contact support.';
          }
        },
        error: (error: any) => {
          console.error('Authentication error:', error);
        },
      });
    }
    else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please enter email and password')
    }
  }


  changeTextToPassword(): void {
    this.showPassword = !this.showPassword;
    this.show = !this.showPassword ? 'text' : 'password';
  }
}
