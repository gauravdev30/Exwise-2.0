import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

enum showModel {
  isgenerate = 1,
  isVerifiy = 2,
  isReset = 3,
}
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  // loginForm!: FormGroup;
  // showPassword = false;
  // showOtp:boolean=false;
  // show = '';

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private apiService: ApiService
  // ) {}

  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     emailId: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(8)]],
  //   });
  // }

  // submit() {
  //   this.showOtp=true;
  //   console.log('heated', this.loginForm.value);
  //   if (this.loginForm.valid) {
  //     const form = this.loginForm.value;
  //     const obj = {
  //       emailId: form.emailId,
  //       password: form.password,
  //     };

  //     console.log(obj);

  //     this.apiService.authLogin(obj).subscribe({
  //       next: (res: any) => {
  //         console.log('Authentication response:', res);
  //       },
  //       error: (error: any) => {
  //         console.error('Authentication error:', error);
  //       },
  //     });
  //   }
  // }

  // changeTextToPassword(): void {
  //   this.showPassword = !this.showPassword;
  //   this.show = !this.showPassword ? 'text' : 'password';
  // }

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
  emailId: any;
  otp: any;
  resetForm!: FormGroup;

  fieldTextType: boolean = false;
  isLoading: boolean = false;
  state: any;

  constructor(private router: Router,
    private accountService: ApiService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.state = showModel.isgenerate
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!(@)-_#$%^&+=]).*$'
      )]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!(@)-_#$%^&+=]).*$'
      ),]),

    },
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  generate() {
    this.state = showModel.isVerifiy;
    // this.state = showModel.isVerifiy;
    if (this.emailId != null || this.emailId != undefined) {
      let formData = new FormData();
      formData.append('emailId', this.emailId);
      // this.isLoading = true;
      this.state = showModel.isVerifiy;
      // this.accountService.generateOTP(formData).subscribe((res:any) => {
      //   this.isLoading = false
      //   if (res.success) {
      //     this.state = showModel.isVerifiy;
      //     this.toastr.success('Otp sent successfully');
      //   } else {
      //     this.toastr.error(res.message);
      //     this.isLoading = false;

      //   }
      // })
    } else {
      this.toastr.warning("Please enter email");
    }
  }
  backToGenerate() {
    this.state = showModel.isgenerate;

  }
  goToReset() {
    this.state = showModel.isReset;
    // if (this.otp != null || this.otp != undefined) {
    //   let formData = new FormData();
    //   formData.append('emailId', this.emailId);
    //   formData.append('otp', this.otp);
    //   this.isLoading = true;
    //   this.state = showModel.isReset;
    //   this.accountService.verifyOTP(formData).subscribe(res => {
    //     this.isLoading = false;
    //     if (res.success) {
    //       this.state = showModel.isReset;
    //       this.toastr.success('Otp verified successfully');
    //     } else {
    //       this.toastr.error(res.message, "Error..!");
    //     }
    //   })
    // }

  }

  resetPassword() {
    if (this.resetForm.valid) {
      if (this.resetForm.value.newPassword == this.resetForm.value.confirmPassword) {
        let formData = new FormData();
        formData.append('emailId', this.emailId);
        formData.append('password', this.resetForm.value.newPassword);
        this.isLoading = true;
        // this.accountService.resetPassword(formData).subscribe(res => {
        //   this.isLoading = false;
        //   if (res.success) {
        //     this.toastr.success("Password reset sucessfully..!");
        //     this.router.navigate(['/login']);
        //   } else {
        //     this.toastr.error(res.message, "Error..!");
        //   }
        // })

      } else {
        this.toastr.warning("New Password and Confirm Password does not match", 'Warning..!');
      }
    }
  }
  myFunction() {
    this.fieldTextType = !this.fieldTextType;
  }
}
