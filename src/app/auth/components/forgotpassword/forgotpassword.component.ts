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
        '^(?=.[a-zA-Z])(?=.[0-9])(?=.[!(@)-_#$%^&+=]).$'
      )]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.[a-zA-Z])(?=.[0-9])(?=.[!(@)-_#$%^&+=]).$'
      ),]),

    },
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  generate() {
    console.log(this.emailId);

    if (this.emailId != null || this.emailId != undefined) {
      let formData = new FormData();
      formData.append('emailId', this.emailId);
      this.isLoading = true;
      console.log(formData);

      this.accountService.generateOTP(this.emailId).subscribe((res: any) => {
        console.log(res);
        if (res.message === "Failed to retrieve User") {
          this.toastr.warning("Please Enter Valid Email-ID");
        } else if (res.message === "send opt to User successfully.") {
          this.state = showModel.isVerifiy;
          this.isLoading = false;
          this.toastr.success('Otp sent successfully');
        } else {
          this.toastr.warning("Something went wrong..!");
        }
      })
    }
    else {
      this.toastr.warning("Please enter email");
    }
  }

  backToGenerate() {
    this.state = showModel.isgenerate;

  }

  goToReset() {
  
    if (this.otp != null || this.otp != undefined) {
      this.isLoading = true;
    console.log(this.emailId,this.otp);
    
      this.accountService.verifyOTP(this.emailId, this.otp).subscribe((res:any) => {console.log(res);
      
        this.isLoading = false;
        if (res.message==="User logged in successfully.") {
          this.state = showModel.isReset;
          this.toastr.success('Otp verified successfully');
        } else {
          this.toastr.error(res.message, "Error..!");
        }
      })
    }

  }

  resetPassword() {
    // if (this.resetForm.valid) {
    //   if (this.resetForm.value.newPassword == this.resetForm.value.confirmPassword) {
    //     let formData = new FormData();
    //     formData.append('emailId', this.emailId);
    //     formData.append('password', this.resetForm.value.newPassword);
    //     this.isLoading = true;
    //     this.accountService.resetPassword(this.resetForm.value.newPassword,id).subscribe(res => {
    //       this.isLoading = false;
    //       if (res.success) {
    //         this.toastr.success("Password reset sucessfully..!");
    //         this.router.navigate(['/login']);
    //       } else {
    //         this.toastr.error(res.message, "Error..!");
    //       }
    //     })

    //   } else {
    //     this.toastr.warning("New Password and Confirm Password does not match", 'Warning..!');
    //   }
    // }
  }
  myFunction() {
    this.fieldTextType = !this.fieldTextType;
  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 5,
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
    this.otp=value;
  }
}
