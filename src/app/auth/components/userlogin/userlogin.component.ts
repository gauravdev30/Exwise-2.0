import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../authservice/api.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { CreateUserComponent } from '../../../superadmin/project/Components/project-admin/create-user/create-user.component';
import { MatDialog } from '@angular/material/dialog';
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
  displayMsg: any;
  pushToken: any;
  @Input("config") config: any = {
    type: 1,
    length: 6,
    cssClass: "custom",
    back: {
      stroke: "#2F9688",
      solid: "#f2efd2",
    },
    font: {
      color: "#000000",
      size: "35px",
    },
  };
  // @Input("config") config: any;
  @Output() captchaCode = new EventEmitter();

  captch_input: any = null;
  code: any = null;
  resultCode: any = null;
  checkCaptchaValue: boolean = false;
  submitted:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private firemessage: AngularFireMessaging,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   emailId: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });
    this.generateToken();
  }
  generateToken() {
    this.firemessage.requestToken.subscribe({
      next: (res: any) => {
        console.log("Token===========>", res);

        this.pushToken = res;
      }, error: (err: any) => {
        console.warn("Eoor=========>", err);

      }
    });
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
    this.displayMsg = ''
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
          this.createCaptcha();
          this.toastr.success('Otp sent successfully', '', {
            timeOut: 1000,
          });
        } else if (res.message === 'Email not found!!') {
          this.toastr.error(
            'The email account that you tried to reach does not exist.',
            '',
            { timeOut: 3000 }
          );
          this.displayMsg = "The email account that you tried to reach does not exist."
          console.log('err');
        } else {
          this.toastr.error(res.message);
          this.isLoading = false;
          this.displayMsg = ''
        }
      });
    } else {
      this.toastr.warning("Please enter email");
    }
  }
  goToReset() {
    this.displayMsg = ''
    if (this.otp != null || this.otp != undefined) {

      if (this.captch_input !== this.resultCode) {
        this.showError();
        this.captch_input = "";
        this.reloadCaptcha();
      }else{
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

          if (res.message === 'User logged in successfully.' || res.message === 'User logged in successfully. Demographic information missing.') {
            sessionStorage.setItem(
              'currentLoggedInUserData',
              JSON.stringify(res.data)
            );
            const obj = { deviceId: this.pushToken }
            this.apiService.updateUser(res.data.id, obj).subscribe((res: any) => {
              console.log(res);
            })
            const clientId = res.data.clientId;
            if (res.data.typeOfUser == 1) {
              this.router.navigate(['/cpoc', clientId]);
              sessionStorage.setItem('isCpoc', 'true');
              this.toastr.success('Your login was successful!!');
              if (res.message === 'User logged in successfully. Demographic information missing.') {
                this.openPopUp();
              }
            } else if (res.data.typeOfUser == 2) {
              this.router.navigate(['/clientEmployee/dashboard']);
              this.toastr.success('Your login was successful!!');
              if (res.message === 'User logged in successfully. Demographic information missing.') {
                this.openPopUp();
              }
            } else {
              this.toastr.error(' Someting went wrong!');
            }
          } else if (res.message === "enter correct otp.") {
            this.toastr.error(
              'This is a incorrect otp. Please reenter the otp ',
              '',
              { timeOut: 3000 }
            );
            this.displayMsg = "This is a incorrect otp. Please reenter the otp "
            console.log('err');

          }
        });
      }
    } else {
      this.toastr.error('Please enter OTP')
    }
  }

  onSubmit() {
    // Validate captcha input
    if (this.captch_input !== this.resultCode) {
      this.showError();
      this.captch_input = "";
      this.reloadCaptcha();
    } else {
      console.log(this.captch_input, this.resultCode)
      // Proceed with form submission
      // ...
    }
  }

  showError() {
    if(this.captch_input?.length>0){
      this.toastr.error('Invalid captcha code');
    }else{
      this.toastr.error('Please enter captcha code');
      this.submitted=true;
    }
  }

  // Function to check if captcha input is correct
  checkCaptcha() {
    if (this.captch_input === this.resultCode) {
      //console.log('resultCode',this.resultCode);
      //console.log('same value');
      this.checkCaptchaValue = true;
      return true;
    } else {
      this.checkCaptchaValue = false;
      //console.log('different value');
      return false;
    }
    // return true;
    // Implement captcha validation logic
  }

  // Function to create a new captcha
  createCaptcha() {
    switch (this.config.type) {
      case 1: // only alpha numaric degits to type
        let char =
          Math.random()
            .toString(24)
            .substring(2, this.config.length) +
          Math.random().toString(24).substring(2, 4);
        this.code = this.resultCode = char.toUpperCase();
        break;
      case 2: // solve the calculation
      // let num1 = Math.floor(Math.random() * 99);
      // let num2 = Math.floor(Math.random() * 9);
      // let operators = ['+','-'];
      // let operator = operators[(Math.floor(Math.random() * operators.length))];
      // //this.code =  num1+operator+num2+'=?';
      // //this.resultCode = (operator == '+')? (num1+num2):(num1-num2);
      // break;
    }
    setTimeout(() => {
      let captcahCanvas: any = document.getElementById("captcahCanvas");
      var ctx = captcahCanvas?.getContext("2d");
      ctx.fillStyle = this.config.back.solid;
      ctx.fillRect(0, 0, captcahCanvas.width, captcahCanvas.height);

      ctx.beginPath();

      captcahCanvas.style.letterSpacing = 15 + "px";
      ctx.font = this.config.font.size + " " + this.config.font.family;
      ctx.fillStyle = this.config.font.color;
      ctx.textBaseline = "middle";
      ctx.fillText(this.code, 40, 50);
      if (this.config.back.stroke) {
        ctx.strokeStyle = this.config.back.stroke;
        for (var i = 0; i < 150; i++) {
          ctx.moveTo(Math.random() * 300, Math.random() * 300);
          ctx.lineTo(Math.random() * 300, Math.random() * 300);
        }
        ctx.stroke();
      }

      // this.captchaCode.emit(char);
    }, 100);
    // Generate captcha code and render it on canvas
  }

  reloadCaptcha(): void {
    this.createCaptcha();
    // Reload captcha by generating a new code
  }

  openPopUp() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: { name: 'edit-user', id: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  onBack() {
    this.showOtp = false;
  }
}
