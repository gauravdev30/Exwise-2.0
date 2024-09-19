import { Component, OnInit } from '@angular/core';
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
  displayMsg:any;
  pushToken:any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private firemessage: AngularFireMessaging,
    public dialog: MatDialog
  ) {}

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
        console.warn("Eoor=========>",err);

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
      this.toastr.warning("Please enter email");
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

          if (res.message === 'User logged in successfully.' || res.message === 'User logged in successfully. Demographic information missing.') {
            sessionStorage.setItem(
              'currentLoggedInUserData',
              JSON.stringify(res.data)
            );
            const obj={deviceId:this.pushToken}
            this.apiService.updateUser(res.data.id,obj).subscribe((res:any)=>{console.log(res);
            })
            const clientId = res.data.clientId;
            if (res.data.typeOfUser == 1) {
              this.router.navigate(['/cpoc', clientId]);
              sessionStorage.setItem('isCpoc', 'true');
              this.toastr.success('Your login was successful!!');
              if(res.message==='User logged in successfully. Demographic information missing.'){
                this.openPopUp();
              }
            } else if (res.data.typeOfUser == 2) {
              this.router.navigate(['/clientEmployee/dashboard']);
              this.toastr.success('Your login was successful!!');
              if(res.message==='User logged in successfully. Demographic information missing.'){
                this.openPopUp();
              }
            } else{
            this.toastr.error(' Someting went wrong!');
            }
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

  openPopUp(){
      const dialogRef = this.dialog.open(CreateUserComponent, {
        width: '800px',
        height: '600px',
        disableClose: true,
        data: { name: 'edit-user', id: JSON.parse(sessionStorage.getItem("currentLoggedInUserData")!).id },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
      });
  }

  onBack(){
    this.showOtp=false;
  }
}
