import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css',
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  showOtp: boolean = false;
  show = '';
  emailId: any;
  otp: any;
  displayMsg:any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   emailId: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });
  }

  submit() {
    this.showOtp = true;
    console.log('', this.loginForm.value);
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

  handeOtpChange(value: any): void {
    console.log(value);
  }

  handleFillEvent(value: any): void {
    console.log(value);
    this.otp = value;
  }
  isLoading: any;
  generate() {
    console.log(this.emailId);
this.displayMsg=''
    // this.state = showModel.isVerifiy;
    if (this.emailId != null || this.emailId != undefined) {
      let formData = new FormData();
      console.log(this.emailId);
      console.log(formData);

      formData.append('emailId', this.emailId);
      this.isLoading = true;
      this.apiService.generateOTP(this.emailId).subscribe((res: any) => {
        console.log(res);
        this.isLoading = false;
        if (res.message === 'send opt to User successfully.') {
          this.showOtp = true;
          
          this.toastr.success('Otp sent successfully', '', {
            timeOut: 1000,
          });
        } else if (res.message === 'Email not found!!') {
          this.toastr.error(
            'The email account that you tried to reach does not exist.',
            '',
            { timeOut: 3000 }
          );
          this.displayMsg="The email account that you tried to reach does not exist."
          console.log('err');
        } else {
          this.toastr.error(res.message);
          this.isLoading = false;
          this.displayMsg=''
        }
      });
    } else {
      // this.toastr.warning("Please enter email");
    }
  }
  goToReset() {
    this.displayMsg=''
    if (this.otp != null || this.otp != undefined) {
      let formData = new FormData();
      formData.append('emailId', this.emailId);
      formData.append('otp', this.otp);
      console.log(this.emailId);
      console.log(this.otp);
      this.isLoading = true;
      this.apiService
        .verifyOTP(this.emailId, this.otp)
        .subscribe((res: any) => {
          this.isLoading = false;
          console.log(res);

          if (res.message === 'User logged in successfully.') {
            sessionStorage.setItem(
              'currentLoggedInUserData',
              JSON.stringify(res.data)
            );
            const clientId = res.data.clientId;
            if (res.data.typeOfUser == 1) {
              this.router.navigate(['/cpoc', clientId]);
              sessionStorage.setItem('isCpoc', 'true');
            } else if (res.data.typeOfUser == 2) {
              this.router.navigate(['/clientEmployee']);
            }
            this.toastr.success('Congratulations,your account has been login successfully.!!');
          } else if(res.message==="enter correct otp."){
            this.toastr.error(
              'This is a incorrect otp. Please reenter the otp ',
              '',
              { timeOut: 3000 }
            );
            this.displayMsg="This is a incorrect otp. Please reenter the otp "
            console.log('err');
     
          }
        });
    }
  }
}
