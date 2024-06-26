import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchPasswordService } from './match-password.service';

enum showModel {
  isgenerate = 1,
  isVerifiy = 2,
  isReset = 3,
}
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  emailId: any;
  otp: any;
  resetForm!: FormGroup;
  displayMsg: any;

  isLoading: boolean = false;
  state: any;
  userId: any;
  submitted: boolean = false;
  fieldTextType: { password: boolean; passwordConfirmation: boolean } = {
    password: false,
    passwordConfirmation: false,
  };

  get f() {
    return this.resetForm.controls;
  }
  constructor(
    private router: Router,
    private accountService: ApiService,
    private toastr: ToastrService,
    private matchPassword: MatchPasswordService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.state = showModel.isgenerate;
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
          ],
        ],
        passwordConfirmation: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!(@)-_#$%^&+=]).*$/),
          ],
        ],
      },
      { validators: this.matchPassword.validate.bind(this.matchPassword) }
    );
  }

  toggleFieldTextType(field: 'password' | 'passwordConfirmation'): void {
    this.fieldTextType[field] = !this.fieldTextType[field];
  }

  generate() {
    this.displayMsg = '';
    console.log(this.emailId);

    if (this.emailId != null || this.emailId != undefined) {
      let formData = new FormData();
      formData.append('emailId', this.emailId);
      this.isLoading = true;
      console.log(formData);

      this.accountService.generateOTP(this.emailId).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'Email not found!!') {
          this.isLoading = false;
          this.displayMsg =
            'The email account that you tried to reach does not exist.';
          this.toastr.error('Please Enter Valid Email-ID');
        } else if (res.message === 'send opt to User successfully.') {
          this.state = showModel.isVerifiy;
          this.isLoading = false;
          this.toastr.success('Otp sent successfully');
        } else {
          this.toastr.warning('Something went wrong..!');
        }
      });
    } else {
      this.toastr.warning('Please enter email');
    }
  }

  backToGenerate() {
    this.state = showModel.isgenerate;
  }

  goToReset() {
    this.displayMsg = '';
    if (this.otp != null || this.otp != undefined) {
      this.isLoading = true;
      console.log(this.emailId, this.otp);

      this.accountService
        .verifyOTP(this.emailId, this.otp)
        .subscribe((res: any) => {
          console.log(res);

          this.isLoading = false;
          if (res.message === 'User logged in successfully.') {
            this.userId = res.data.id;
            this.state = showModel.isReset;
            this.toastr.success('Otp verified successfully');
          } else if (res.message === 'enter correct otp.') {
            this.toastr.error(
              'This is a incorrect otp. Please reenter the otp ',
              '',
              { timeOut: 3000 }
            );
            this.displayMsg =
              'This is a incorrect otp. Please reenter the otp ';
            console.log('err');
          } else {
            this.toastr.error(res.message, 'Error..!');
          }
        });
    }
  }

  resetPassword() {
    // this.submitted=true;
    // if (this.resetForm.valid) {
      if (this.resetForm.value) {
        let formData = new FormData();
        formData.append('id', this.userId);
        formData.append('password', this.resetForm.value.password);
        this.isLoading = true;
        this.accountService
          .resetPassword(this.userId, this.resetForm.value.password)
          .subscribe((res) => {
            this.isLoading = false;
            if (res.success) {
              this.resetForm.reset();
              this.toastr.success('Password reset sucessfully..!');
              this.router.navigate(['/auth']);
            } else {
              this.toastr.error(res.message, 'Error..!');
            }
          });
      } else {
        this.resetForm.reset();
        this.toastr.warning(
          'New Password and Confirm Password does not match',
          'Warning..!'
        );
      }
    // } else {
    //   // this.resetForm.markAllAsTouched()
    // }
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    this.isLoading = true;
    // Implement the actual password reset logic here
    setTimeout(() => {
      this.isLoading = false;
      this.displayMsg = 'Password successfully reset';
    }, 2000);
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
    this.otp = value;
  }
}
