import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { ApiService } from '../service/api.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
// export class ForgotpasswordComponent {
// handeOtpChange($event: string[]) {
// throw new Error('Method not implemented.');
// }
//   loginForm!: FormGroup<any>;
// showOtp: any;
//   otpInputConfig!: NgxOtpInputConfig;
// handleFillEvent($event: string) {
// throw new Error('Method not implemented.');
// }
// submit() {
// throw new Error('Method not implemented.');
// }

// }
export class ForgotpasswordComponent implements OnInit {
updatePassword() {
throw new Error('Method not implemented.');
}
  loginForm!: FormGroup;
  showPassword = false;
  getOtp=true;
  showOtp: boolean = false;
  show = '';
  apiService: any;

  constructor(
    private formBuilder: FormBuilder,
    // private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    this.getOtp=false
    this.showOtp = true;
    console.log('heated', this.loginForm.value);
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const obj = {
        emailId: form.emailId,
        password: form.password,
      };

      console.log(obj);

      this.apiService.authLogin(obj).subscribe({
        next: (res: any) => {
          console.log('Authentication response:', res);
        },
        error: (error: any) => {
          console.error('Authentication error:', error);
        },
      });
    }
  }
 
  changeTextToPassword(): void {
    this.showPassword = !this.showPassword;
    this.show = !this.showPassword ? 'text' : 'password';
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

resetPassword(){
  this.showOtp = false;
this.showPassword=true;
}

}
